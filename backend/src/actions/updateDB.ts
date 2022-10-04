import initFireStore from "../initFireBase";
import type { ExchangeRates } from "../../../common/types/interfaces";
import { getUserDBData, updateUserDBData } from "../data/dataDB";
import { getAvgPrice, getBinanceData } from "../data/dataBinance";

// import checkAndUpdateCardHistory from "../calc/user/checkUpdateCardHistory";
import processTrades from "../calc/user/processTrades";
import processSpot from "../calc/user/processSpot";
import processAccountHistory from "../calc/user/processAccountHistory";
import updatePriceValues from "../calc/user/updatePriceValues";
import processStaking from "../calc/user/processStaking";
import sizeof from "object-sizeof";
import updateStakingPositions from "../calc/user/updateStakingPositions";

import moment from "moment";
import * as dotenv from "dotenv";
import calculateSyncData from "../calc/user/calculateSyncData";
import resetData from "../utils/resetData";
dotenv.config();
const exchangeRatesUSDT: ExchangeRates = {};

interface IUpdateDB {
  userID: string;
  reset?: boolean;
}

const updateDB = async ({ userID, reset = false }: IUpdateDB) => {
  console.log("timeLog_updateUserDB", "--START--");
  const { db, fireStore } = await initFireStore();
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

  // await checkAndUpdateCardHistory();

  data["coins"] = await processSpot(data);
  data = await processTrades(data);

  data = await processAccountHistory(data, db);
  data = await processStaking(data);
  data = await updatePriceValues(data, exchangeRatesUSDT);
  data.coins = await calculateSyncData(data);
  data["coins"] = data["general"].passedFirstRun
    ? await updateStakingPositions(data)
    : data["coins"];

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

export default updateDB;
