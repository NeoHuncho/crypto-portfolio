import initFireStore from "../initFireBase";
import type {
  Coin,
  ExchangeRates,
  General,
} from "../../../common/types/interfaces";
import { getDBData } from "../data/dataDB";
import { getAvgPrice, getBinanceData } from "../data/dataBinance";

import checkAndUpdateCardHistory from "../calc/checkUpdateCardHistory";
import processTrades from "../calc/processTrades";
import processSpot from "../calc/processSpot";
import processAccountHistory from "../calc/processAccountHistory";
import updatePriceValues from "../calc/updatePriceValues";
import type { DocumentData } from "firebase-admin/firestore";
import processStaking from "../calc/processStaking";
import sizeof from "object-sizeof";
import updateStakingPositions from "../calc/updateStakingPositions";

import moment from "moment";
import * as dotenv from "dotenv";
dotenv.config();
const exchangeRatesUSDT: ExchangeRates = {};

const resetData = (general: General) => {
  if (general.coinsData.value) {
    general.coinsData.value = 0;
    general.coinsData.spotValue = 0;
    general.coinsData.spotValue = 0;
    general.coinsData.interestHistoryValue = 0;
  }
  return general;
};

const calculateSyncData = (data: DocumentData) => {
  for (const key in data["coins"]) {
    const coin: Coin = data["coins"][key];
    if (!coin) continue;
    if (!data["general"].coinsData.percentageToNotStake) continue;
    if (!coin.amountValue.amount) continue;
    if (coin.staked.amount) {
      coin.remainingStakingAmount =
        (coin.staked.amount + coin.spot.amount) *
          (1 - data["general"].coinsData.percentageToNotStake / 100) -
        coin.staked.amount;
    } else if (coin.spot.amount)
      coin.remainingStakingAmount =
        coin.spot.amount *
        (1 - data["general"].coinsData.percentageToNotStake / 100);
  }
  return data["coins"];
};

interface IUpdateDB {
  userID: string;
  reset?: boolean;
}

const updateDB = async ({ userID, reset = false }: IUpdateDB) => {
  console.log("general", "--START--");
  const { db, fireStore } = await initFireStore();
  let data = await getDBData({ fireStore, db, reset, userID });

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

  await db.ref("users_meta/" + userID).set(data["meta"]);
  await fireStore
    .collection("users")
    .doc(userID)
    .set({
      general: { ...data["general"] },
      coins: JSON.stringify(data["coins"]),
    })
    .then(async () => {
      console.log("general", "--END--");
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Hello World" }),
      };
    });
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World" }),
  };
};

export default updateDB;