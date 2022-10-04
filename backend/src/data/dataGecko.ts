import type { Database } from "@firebase/database-types";
import axios from "axios";
import moment from "moment";
type Props = {
  db: Database;
  coin: string;
  inputDate: string;
};

const CoinGecko = require("coingecko-api");

const CoinGeckoClient = new CoinGecko();
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
  await new Promise((r) => setTimeout(r, 2000));

  const res = await CoinGeckoClient.coins.fetch(geckoID, {}).catch(() => {
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

export { getHistoricPriceUSD, getGeneralCoinData, getCoinList };
