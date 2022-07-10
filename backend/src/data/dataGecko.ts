import type { Database } from "@firebase/database-types";
import axios from "axios";
import moment from "moment";
type Props={
    db:Database,
    coin:string,
    inputDate:string
}
const getHistoricPriceUSD = async ({db, coin, inputDate}:Props) => {
    const geckoID = await (await db.ref("gecko_ids/" + coin).get()).val();
    if (!geckoID) return;
    const regex = /(\d+)-(\d+)-(\d+)/g.exec(
      moment(inputDate).toDate().toISOString().substring(0, 10)
    );
    
    const date = regex &&`${regex[3]}-${regex[2]}-${regex[1]}`;
  
    const price = parseFloat(
      (
        await axios.get(
          `https://api.coingecko.com/api/v3/coins/${geckoID}/history?date=${date}`
        )
      ).data.market_data.current_price.usd
    );
  
    return price;
  };

export {getHistoricPriceUSD}