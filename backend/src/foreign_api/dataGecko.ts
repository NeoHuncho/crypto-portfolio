import type { Database } from "@firebase/database-types";
import axios from "axios";
import moment from "moment";

type Props = {
  db: Database;
  coin: string;
  inputDate: string;
};

const getHistoricPriceUSD = async ({ db, coin, inputDate }: Props) => {
  const geckoID = await (await db.ref("gecko_ids/" + coin).get()).val();
  if (!geckoID) return;
  const regex = /(\d+)-(\d+)-(\d+)/g.exec(
    moment(inputDate).toDate().toISOString().substring(0, 10)
  );

  const date = regex && `${regex[3]}-${regex[2]}-${regex[1]}`;

  const price = parseFloat(
    (
      await axios.get(
        `https://api.coingecko.com/api/v3/coins/${geckoID}/history?date=${date}`
      )
    ).data.market_data.current_price.usd
  );

  return price;
};

const getGeneralCoinData = async (geckoID: string) => {
  const res = await axios
    .get("https://api.coingecko.com/api/v3/coins/" + geckoID)
    .catch(() => {
      console.log("error getting gecko data for coin: ", geckoID);
      return;
    });
  if (!res || !res.data) {
    console.log("error getting gecko data for coin: ", geckoID);
    return;
  }

  return res.data;
};
const getCoinList = async () => {
  const list = (await axios.get("https://api.coingecko.com/api/v3/coins/list"))
    .data;
  return list;
};

// const getCoinsPrices = async (coins: MarginCoins) => {
//   const promises = Object.entries(coins).map(
//     ([key, value]) =>
//       new Promise(async (resolve, reject) => {
//         const res = await axios
//           .get(
//             `https://api.coingecko.com/api/v3/simple/price?ids=${value.geckoID}&vs_currencies=usd`
//           )
//           .catch(() => {
//             console.log("error getting gecko data for coin: ", key);
//             reject();
//           });
//         if (!res || !res.data) {
//           console.log("error getting gecko data for coin: ", key);
//           reject();
//         }
//         const price = Object.values(res?.data).map((val: any) => val?.usd)[0];
//         resolve({ [key]: price });
//       })
//   );

//   const promiseArray = await Promise.all(promises);
//   return Object.assign({}, ...promiseArray);
// };

export { getHistoricPriceUSD, getGeneralCoinData, getCoinList };
