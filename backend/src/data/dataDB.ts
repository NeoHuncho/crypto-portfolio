import type { Database } from "firebase-admin/database";
import type { Data, GeneralCoinsData } from "../../../common/types/interfaces";
import type { FirebaseData } from "../interfaces";
import { defaultData } from "./defaultValues";

const getUserDBData = async ({
  fireStore,
  db,
  reset,
  userID,
}: FirebaseData) => {
  if (reset) return defaultData;
  let data: any = (
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
  const newData: Data = data;
  return newData;
};
const updateUserDBData = async ({
  fireStore,
  db,
  data,
  userID,
}: FirebaseData) => {
  if (!data) throw "Did not find data";
  try {
    await db.ref("users_meta/" + userID).set(data["meta"]);
    await fireStore
      .collection("users")
      .doc(userID)
      .set({
        general: { ...data["general"] },
        coins: JSON.stringify(data["coins"]),
      })
      .then(async () => {
        console.log("timeLog_updateUserDB", "--END--");

        return {
          statusCode: 200,
          body: JSON.stringify({ message: "Hello World" }),
        };
      });
  } catch (error) {
    console.log(error);
    throw "Error updating data";
  }
};

const getGeneralCoinDBData = async ({
  fireStore,
  db,
  userID,
}: FirebaseData) => {
  const data: GeneralCoinsData = {
    generalCoins: {},
    coinKeys: [],
    geckoKeys: [],
  };
  const generalCoins = await (await db.ref("general_coins").get()).val();
  data["generalCoins"] = generalCoins ? generalCoins : {};
  data["geckoKeys"] = await (await db.ref("gecko_ids").get()).val();
  const userData = (
    await fireStore.collection("users").doc(userID).get()
  ).data();
  const userCoins = JSON.parse(userData["coins"]);
  data["coinKeys"] = Object.keys(userCoins);
  return data;
};

interface IUpdateGeneralCoinDBData {
  db: Database;
  data: GeneralCoinsData;
  key: string;
}
const updateGeneralCoinDBData = async ({
  db,
  data,
  key,
}: IUpdateGeneralCoinDBData) => {
  await db.ref("general_coins/" + key).set(data);
};

export {
  getUserDBData,
  updateUserDBData,
  getGeneralCoinDBData,
  updateGeneralCoinDBData,
};
