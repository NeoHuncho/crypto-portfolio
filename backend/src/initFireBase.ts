import admin from "firebase-admin";
import { getDatabase } from "firebase-admin/database";
import { getFirestore } from "firebase-admin/firestore";
import * as dotenv from "dotenv";
dotenv.config();
const initFirebase = async () => {
  const app = admin.initializeApp({
    credential: admin.credential.cert(service_account),
    databaseURL:
      "https://crypto-portfolio-df8df-default-rtdb.europe-west1.firebasedatabase.app/",
  });
  const fireStore = await getFirestore();
  const db = await getDatabase(app);
  db.goOnline();
  fireStore.settings({ ignoreUndefinedProperties: true });
  return { app, db, fireStore };
};

const private_key = process.env["FIREBASE_PRIVATE_KEY"] || "";
console.log(1, private_key)
const { privateKey } = JSON.parse(private_key);

const service_account: any = {
  projectId: process.env["FIREBASE_PROJECT_ID"],
  privateKey: privateKey,
  clientEmail:
    "firebase-adminsdk-sidut@crypto-portfolio-df8df.iam.gserviceaccount.com",
};
export default initFirebase;
