import type { MarginCoins } from "../../../common/types/interfaces";
import buySellMargins from "../calc/user/margin/buySellMargins";
import processMarginData from "../calc/user/margin/processMarginData";
import { defaultMarginStats } from "../data/default/defaultValues";
import { getAvgPrices } from "../foreign_api/dataBinance";
import { getDBData, updateMarginStats } from "../foreign_api/dataDB";
import initFirebase from "../initFireBase";
import type { IMarginPositions } from "../interfaces";
import { data } from "@serverless/cloud";
const user = "VafhUIU2Z4Mt1HoNQnNr11pEZ4z1";
const updateMargins = async () => {
  console.time();
  const { db } = await initFirebase();
  let coins: MarginCoins;
  const checkForChange = await getDBData({
    db,
    path: "users_margin/" + user + "/hasChanged",
  });
  if (checkForChange) {
    coins = await getDBData({
      db,
      path: "users_margin/" + user + "/coins",
    });
    db.ref("users_margin/" + user + "/hasChanged").set(false);
  } else coins = await data.get("userData");
  if (!coins) return;
  const marginPositions: IMarginPositions = await data.get("marginPositions");
  const prices: { [key: string]: number } = await getAvgPrices(coins);
  const preMargins = processMarginData({ prices, marginPositions });
  const postMargins = await buySellMargins(preMargins);

  await data.set("userData", coins);
  await data.set("marginPositions", postMargins);

  if (defaultMarginStats.profitLoss)
    await updateMarginStats({ db: db, data: defaultMarginStats, userID: user });

  console.timeEnd();
};
export default updateMargins;

