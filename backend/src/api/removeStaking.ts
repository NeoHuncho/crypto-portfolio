import { Spot } from "@binance/connector";
import { writeFile } from "fs/promises";

// import moment from "moment";
// let date = moment("2021-10-01");


let client = new Spot(apiKey, apiSecret);
const getStakingPositions = async (type: string) => {
  let current: number | boolean = 1;
  let data = [];
  while (current) {
    console.log(current);
    const res = (
      await client.stakingProductPosition(type, { size: 100, current: current })
    ).data;

    if (!res?.length) current = false;
    else {
      data.push(...res);
      current++;
    }
  }
  return data;
};
const run = async () => {
  // console.log(apiKey, apiSecret);
  let count = 0;
  try {
    const positions = await getStakingPositions("STAKING");
    await writeFile("positions.json", JSON.stringify(positions));
    for (const position of positions) {
      if (!position.canRedeemEarly) continue;
      count++;
      console.log(count);
      await client
        .stakingRedeemProduct("STAKING", position.productId, {
          positionId: position.positionId,
        })
        .then(async () => {
          await new Promise((r) => setTimeout(r, 1000));
          console.log("ok");
        })
        .catch(async (err:any) => {
          await new Promise((r) => setTimeout(r, 2000));
          console.log(err.response.data);
          // console.log(err.config);
        });
    }

    // console.log(await getStakingPositions('STAKING'));
  } catch (error) {
    console.log(error);
  }

  // const res = await axios
  //   .get(`https://api.coingecko.com/api/v3/coins/${"bitcoin"}`)
  //   .catch((err) => {
  //     console.log("error getting gecko data for coin: ", "bitcoin");
  //     return;
  //   });
  // if (!res) {
  //   console.log("error getting gecko data for coin: ", "bitcoin");
  //   return;
  // }
  // return res;
};
run();
