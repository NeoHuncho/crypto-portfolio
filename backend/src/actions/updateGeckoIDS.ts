import { getCoinList } from "../data/dataGecko";
import initFireStore from "../initFireBase";

const updateGeckoIDs = async () => {
  console.log("timeLog_UpdateGeckoIDS", "--START--");
  const { db } = await initFireStore();
  const data = await getCoinList();
  const processedData = {};
  for (const index in data) {
    if (!data[index].symbol) continue;
    if (!/[.#$\[\]]/g.test(data[index].symbol))
      processedData["/" + data[index].symbol] = data[index].id;
  }

  db.ref("gecko_ids").update(processedData);
  console.log("timeLog_UpdateGeckoIDS", "--END--");
  return "done";
};

export default updateGeckoIDs;
