import initFirebase from "../initFireBase";
import type { ExchangeRates } from "../../../common/types/interfaces";
import { getUserDBData, updateUserDBData } from "../foreign_api/dataDB";
import { getAvgPrice, getBinanceData } from "../foreign_api/dataBinance";

// import checkAndUpdateCardHistory from "../calc/user/portfolio/checkUpdateCardHistory";
import processTrades from "../calc/user/portfolio/processTrades";
import processSpot from "../calc/user/portfolio/processSpot";
import processAccountHistory from "../calc/user/portfolio/processAccountHistory";
import updatePriceValues from "../calc/user/portfolio/updatePriceValues";
import processStaking from "../calc/user/portfolio/processStaking";
import sizeof from "object-sizeof";
import moment from "moment";
import calculateSyncData from "../calc/user/portfolio/calculateSyncData";
import resetData from "../utils/resetData";

const exchangeRatesUSDT: ExchangeRates = {};

interface IUpdateDB {
  userID: string;
  reset?: boolean;
}

const updateDB = async ({ userID, reset = false }: IUpdateDB) => {
  console.log("timeLog_updateUserDB", "--START--");
  const { db, fireStore } = await initFirebase();
  let data: any = await getUserDBData({ fireStore, db, reset, userID });

  data["binance"] = await getBinanceData({
    passedFirstRun: data["general"].passedFirstRun,
  });

  if (data["general"].currency) {
    exchangeRatesUSDT["currency"] = parseFloat(
      await getAvgPrice(data["general"].currency + "USDT")
    );
  }

  data["general"] = resetData(data["general"]);

  // // await checkAndUpdateCardHistory();

  data["coins"] = await processSpot(data);
  data = await processTrades(data);

  data = await processAccountHistory(data, db);
  data = processStaking(data);

  data = await updatePriceValues(data, exchangeRatesUSDT);
  data.coins = await calculateSyncData(data);
  // data["coins"] = data["general"].passedFirstRun
  //   ? await updateStakingPositions(data)
  //   : data["coins"];

  if (!data["general"].passedFirstRun) data["general"].passedFirstRun = true;
  data["general"].lastRunTime = moment().unix();
  console.log(
    "general",
    `size of Meta: ${sizeof(data["meta"])}, size Of general and coins: ${sizeof(
      data["general"] + sizeof(JSON.stringify(data["coins"]))
    )} `
  );

  updateUserDBData({ fireStore, db, data, userID });
  console.log("timeLog_updateUserDB", "--END--");

  return "done";
};
//! REMOVE FROM PROD
// updateDB({ userID: "VafhUIU2Z4Mt1HoNQnNr11pEZ4z1" });
export default updateDB;
