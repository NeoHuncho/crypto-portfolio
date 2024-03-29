import { api, events, schedule } from "@serverless/cloud";
import updateGeneralCoinData from "./src/cron/updateGeneralCoinData";
import updateMargins from "./src/cron/margins";
import updateGeckoIDs from "./src/cron/updateGeckoIDS";
import updateDB from "./src/cron/updateDB";
import modifyUserSpent from "./src/api/ModifyUserSpent";
import cors from "cors";
api.use(cors());
//add to prod
// schedule.every("1 day", { timeout: 300000 }, async () => {
//   await updateDB({ userID: "VafhUIU2Z4Mt1HoNQnNr11pEZ4z1" });
//   console.log("done");
//   return;
// });

schedule.every("3 minutes", { timeout: 300000 }, async () => {
  console.time();
  try {
    await updateMargins();
  } catch (error) {
    console.log('error while updating margins', error)
  }
  console.timeEnd();
  return;
});
// schedule.every("50 minutes", { timeout: 300000 }, async () => {
//   await updateGeneralCoinData();

//   return;
// });
// schedule.cron("0 0 ? * FRI *", { timeout: 300000 }, async () => {
//   await updateGeckoIDs();

//   return;
// });

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
  const result = await modifyUserSpent(req);

  return res.send({
    status: 200,
    success: result.success,
    message: result.message,
  });
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
