import updateDB from "./src/actions/updateDB";
import { api, events, schedule } from "@serverless/cloud";

// schedule.every("30 minutes", { timeout: 300000 }, async () => {
//   await updateDB({ userID: "VafhUIU2Z4Mt1HoNQnNr11pEZ4z1" });

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
