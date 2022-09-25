import type { FirebaseData } from "../../../common/types/interfaces";
import { defaultData } from "./defaultValues";

const getDBData = async ({ fireStore, db, reset, userID }: FirebaseData) => {
  console.log(2, userID);
  if (reset) return defaultData;
  let data: any = await (
    await fireStore.collection("users").doc(userID).get()
  ).data();
  if (!data) return defaultData;
  data["coins"] = JSON.parse(data["coins"]);
  data["meta"] = await (await db.ref("users_meta/" + userID).get()).val();

  const checkObject = (data: any) => {
    (Object.keys(defaultData) as (keyof typeof defaultData)[]).map((key) => {
      if (!data[key]) {
        data[key] = defaultData[key];
      } else {
        const defaultValue: any = defaultData[key];
        if (!defaultValue) return;
        (Object.keys(defaultValue) as (keyof typeof defaultData.coins)[]).map(
          (subKey) => {
            if (!data[key][subKey] && !defaultValue[subKey]) {
              data[key][subKey] = defaultValue[subKey];
            }
          }
        );
      }
    });
  };

  checkObject(data);
  return data;
};

export { getDBData };
getDBData;
