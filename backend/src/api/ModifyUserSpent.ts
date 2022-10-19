import type { Request } from "@serverless/cloud";
import initFirebase from "../initFireBase";

const modifyUserSpent = async (req: Request) => {
  const { userID, metaID, type, amount, isRemoved } = req.body;
  const { db, fireStore } = await initFirebase();
  const general = (await fireStore.doc("users/" + userID).get()).data()?.[
    "general"
  ];
  if (!general)
    return { success: false, message: "did not find general user data" };

  const user = (await db.ref("users_meta/" + req.body.userID).get()).val();
  if (!user) return { success: false, message: "did not find user meta" };
  const items = user[type];

  if (!items) return { success: false, message: "did not find items" };
  const Newmetas = items.map((item: any) => {
    if (item.id === metaID) return { ...item, isRemoved: isRemoved };
    return item;
  });
  // console.log(general["coinsData"]);
  try {
    db.ref("users_meta/" + userID + "/" + type).set(Newmetas);

    fireStore
      .doc("users/" + userID)
      .update(
        "general.coinsData.spend",
        general["coinsData"]["spend"] + (isRemoved ? -amount : amount)
      );
  } catch (error) {
    return { success: false, message: error };
  }
  return { success: true, message: "success" };
};
export default modifyUserSpent;
