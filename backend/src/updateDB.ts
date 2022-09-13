import initFireStore from "./initFireBase";

import type {
  Coin,
  ExchangeRates,
  General,
} from "../../common/types/interfaces";
import { getDBData } from "./data/dataDB";
import { getAvgPrice, getBinanceData } from "./data/dataBinance";

import checkAndUpdateCardHistory from "./functions/checkUpdateCardHistory";
import processTrades from "./functions/processTrades";
import processSpot from "./functions/processSpot";
import processAccountHistory from "./functions/processAccountHistory";
import updatePriceValues from "./functions/updatePriceValues";
import type { DocumentData } from "firebase-admin/firestore";
import processStaking from "./functions/processStaking";
import sizeof from "object-sizeof";
import updateStakingPositions from "./functions/updateStakingPositions";
import logToFile from "./utils/log";

import moment from "moment";

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

interface runUpdate {
  test?: boolean;
}

const runUpdate = async ({ test }: runUpdate) => {
  await logToFile("general", "--START--");
  const { db, fireStore } = await initFireStore();
  let data = await getDBData({ fireStore, db, test });

  data["binance"] = await getBinanceData({
    passedFirstRun: data["general"].passedFirstRun,
  });

  if (data["general"].currency) {
    exchangeRatesUSDT["currency"] = parseFloat(
      await getAvgPrice(data["general"].currency + "USDT")
    );
  }

  data["general"] = resetData(data["general"]);

  await checkAndUpdateCardHistory();

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
  await logToFile(
    "general",
    `size of Meta: ${sizeof(data["meta"])}, size Of general and coins: ${sizeof(
      data["general"] + sizeof(JSON.stringify(data["coins"]))
    )} `
  );

  await db.ref("users_meta/VafhUIU2Z4Mt1HoNQnNr11pEZ4z1").set(data["meta"]);
  await fireStore
    .collection("users")
    .doc("VafhUIU2Z4Mt1HoNQnNr11pEZ4z1")
    .set({
      general: { ...data["general"] },
      coins: JSON.stringify(data["coins"]),
    })
    .then(async () => {
      await logToFile("general", "--END--");
      return;
    });
};

export default runUpdate;
