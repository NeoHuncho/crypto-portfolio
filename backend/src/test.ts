import { Spot } from "@binance/connector";

// import moment from "moment";
// let date = moment("2021-10-01");

const run = async () => {
  const apiKey =
    "x9RZvrvBwhmTHY3a0rPedtXgLHSwixu2QKk2YnaUk56adK5q1Z9gPHs6t4yTerfs";
  const apiSecret =
    "XIw5VDBOHv38p6fyFFmoKxj9s9yuWXvu5jr1PHxvYrWoqemSqKEothKlFl5AktlD";
  // console.log(apiKey, apiSecret);
  let client = new Spot(apiKey, apiSecret);
  console.log(await client.savingsCustomizedPosition('BCH'));
};
run();
