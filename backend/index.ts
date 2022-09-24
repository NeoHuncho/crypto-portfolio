import updateDB from "./src/actions/updateDB";
import { events, schedule } from "@serverless/cloud";

schedule.every("30 minutes", { timeout: 300000 }, async () => {
  await updateDB();
  return;
});
