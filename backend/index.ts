import { api, events, schedule } from "@serverless/cloud";
import updateGeneralCoinData from "./src/actions/updateGeneralCoinData";
import updateGeckoIDs from "./src/actions/updateGeckoIDS";
import updateDB from "./src/actions/updateDB";
import modifyUserSpent from "./src/api/ModifyUserSpent";
import cors from "cors";
api.use(cors());
//add to prod
schedule.every("50 minutes", { timeout: 300000 }, async () => {
  await updateDB({ userID: "VafhUIU2Z4Mt1HoNQnNr11pEZ4z1" });
  console.log("done");
  return;
});

schedule.every("60 minutes", { timeout: 300000 }, async () => {
  await updateGeneralCoinData();
  console.log("done");
  return;
});
schedule.cron("0 0 ? * FRI *", { timeout: 300000 }, async () => {
  await updateGeckoIDs();
  console.log("done");
  return;
});

api.post("/user/updateDB", async (req, res) => {
  events.publish("updateDB", {
    userID: req.body.userID,
  });
  return res.send({ status: 200, message: "updateDB event published" });
});

events.on("updateDB", { timeout: 300000 }, async ({ body }) => {
  await updateDB({ userID: body.userID });
});

api.post("/user/modifyUserSpent", async (req, res) => {
  try {
    await modifyUserSpent(req);
  } catch (error) {
    return res.send({ status: 500, success: false, message: error });
  }
  return res.send({ status: 200, success: true, message: "ok" });
});

//remove from prod
// api.get("/updateGeneralCoinData", async (req, res) => {
//   events.publish("updateGeneralCoinData", {});
//   return res.send({
//     status: 200,
//     message: "updateGeneralCoinData event published",
//   });
// });
// events.on("updateGeneralCoinData", { timeout: 200000 }, async () => {
//   await updateGeneralCoinData();
// });
// api.get("/updateGeckoIDs", async (req, res) => {
//   events.publish("updateGeckoIDs", {});
//   return res.send({
//     status: 200,
//     message: "updateGeckoIDs event published",
//   });
// });
// events.on("updateGeckoIDs", { timeout: 200000, }, async () => {
//   updateGeckoIDs();
// });
