import processGeneralCoinData from "../calc/user/generalCoin/processGeneralCoinData";
import { getGeneralCoinDBData, updateGeneralCoinDBData } from "../data/dataDB";
import { getGeneralCoinData } from "../data/dataGecko";
import initFirebase from "../initFireBase";

const updateGeneralCoinData = async () => {
  console.log("timeLog_updateGeneralCoin", "--START--");
  //todo if we have users we must loop over more than one user
  const { db, fireStore } = await initFirebase();
  const data = await getGeneralCoinDBData({
    db,
    fireStore,
    userID: "VafhUIU2Z4Mt1HoNQnNr11pEZ4z1",
  });

  for (let coinKey of data.coinKeys) {
    const geckoKey =
      data.geckoKeys[coinKey === "IOTA" ? "miota" : coinKey.toLowerCase()];
    if (!geckoKey) {
      console.log("could not find geckoKey for coinKey: ", coinKey);
      continue;
    }
    const coinData = await getGeneralCoinData(geckoKey);
    if (!coinData) {
      console.log("could not get data data for coinKey" + coinKey);
      continue;
    }
    const processedData = processGeneralCoinData(coinData);

    if (!processedData) {
      console.log("could not process data for " + coinKey);
      continue;
    }
    await updateGeneralCoinDBData({
      db: db,
      data: processedData,
      key: coinKey,
    });
  }
  console.log("timeLog_updateGeneralCoin", "--END--");
  return "done";
};
export default updateGeneralCoinData;
