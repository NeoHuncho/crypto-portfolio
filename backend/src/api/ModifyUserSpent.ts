import type { Request } from "@serverless/cloud";
import initFirebase from "../initFireBase";

const ModifyUserSpent = async(req: Request) => {
  const { db} = await initFirebase();
  

  const { userID, metaID, type, amount, isRemoved } = req.body;
  console.log(userID, metaID, amount, type, isRemoved);
};
export default ModifyUserSpent;
