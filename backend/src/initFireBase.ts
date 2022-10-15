import admin from "firebase-admin";
import { getDatabase } from "firebase-admin/database";
import { getFirestore } from "firebase-admin/firestore";
import { params } from "@serverless/cloud";
const initFirebase = async () => {
  const private_key = params["FIREBASE_PRIVATE_KEY"] || "";
  const { privateKey } = JSON.parse(private_key);
  const service_account: any = {
    projectId: params["FIREBASE_PROJECT_ID"],
    privateKey: privateKey,
    clientEmail:
      "firebase-adminsdk-sidut@crypto-portfolio-df8df.iam.gserviceaccount.com",
  };
  let app = null;
  if (!admin.apps.length) {
    app = admin.initializeApp({
      credential: admin.credential.cert(service_account),
      databaseURL:
        "https://crypto-portfolio-df8df-default-rtdb.europe-west1.firebasedatabase.app/",
    });
  } else app = admin.app()

  const fireStore = await getFirestore();
  const db = await getDatabase(app);
  db.goOnline();
  fireStore.settings({ ignoreUndefinedProperties: true });
  return { app, db, fireStore };
};

export default initFirebase;
