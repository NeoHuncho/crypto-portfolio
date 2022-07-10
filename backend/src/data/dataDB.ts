import type { FirebaseData } from "../types/interfaces";
import { defaultData } from "./defaultValues";

const getDBData = async ({ fireStore, db, test }: FirebaseData) => {
  if (test) return defaultData;
  let data: any = await (
    await fireStore
      .collection("users")
      .doc("VafhUIU2Z4Mt1HoNQnNr11pEZ4z1")
      .get()
  ).data();
  if (!data) return defaultData;
  data["coins"] = JSON.parse(data["coins"]);
  data["meta"] = await (
    await db.ref("users_meta/VafhUIU2Z4Mt1HoNQnNr11pEZ4z1").get()
  ).val();

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
