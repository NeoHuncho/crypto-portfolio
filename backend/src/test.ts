import { Spot } from "@binance/connector";

import moment from "moment";
let date = moment("2021-10-01");
const apiKey = process.env["BINANCE_API_KEY"];
const apiSecret = process.env["BINANCE_API_SECRET"];
const client = new Spot(apiKey, apiSecret);

const run = async () => {
  console.log((await client.depositWithdrawalHistory(0)).data.data);
};
run();
