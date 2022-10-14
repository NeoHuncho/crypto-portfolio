import type { Request } from "@serverless/cloud";

const ModifyUserSpent = (req: Request) => {
  const { userID, metaID, type, amount, isRemoved } = req.body;
  console.log(userID, metaID, amount, type, isRemoved);
};
export default ModifyUserSpent;
