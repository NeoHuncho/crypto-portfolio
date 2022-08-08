import CoinGecko from "coingecko-api";

import initFirebase from "./initFireBase.js";

const client = new CoinGecko();
const run = async () => {
  const { db } = await initFirebase();
  for (let index = 1; index <= 5; index++) {
    const data = (await client.coins.all({ per_page: 250, page: index })).data;
    for (const index in data) {
      if (!/[.#$\[\]]/g.test(data[index].symbol)) {
        const dbValue = await (
          await db.ref("gecko_ids/" + data[index].symbol).get()
        ).val();
        if (!dbValue) {
          await db.ref("gecko_ids/" + data[index].symbol).set(data[index].id);
        }
      }
    }
  }
};

run();