import admin from "firebase-admin";
import { getDatabase } from "firebase-admin/database";
import { getFirestore } from "firebase-admin/firestore";
import { params } from "@serverless/cloud";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

let app: any = null;
let db: any = null;
let fireStore: any = null;
const initFirebase = async () => {
  const private_key =
    params["FIREBASE_PRIVATE_KEY"] || process.env["FIREBASE_PRIVATE_KEY"];
  const { privateKey } = JSON.parse(private_key);
  const service_account: any = {
    projectId:
      params["FIREBASE_PROJECT_ID"] || process.env["FIREBASE_PROJECT_ID"],
    privateKey: privateKey,
    clientEmail:
      "firebase-adminsdk-sidut@crypto-portfolio-df8df.iam.gserviceaccount.com",
  };

  if (!app)
    app = admin.initializeApp({
      credential: admin.credential.cert(service_account),
      databaseURL:
        "https://crypto-portfolio-df8df-default-rtdb.europe-west1.firebasedatabase.app/",
    });
  if (!fireStore) {
    fireStore = await getFirestore();
    fireStore.settings({ ignoreUndefinedProperties: true });
  }
  if (!db) {
    db = await getDatabase(app);
    db.goOnline();
  }

  return { app, db, fireStore };
};

export default initFirebase;
