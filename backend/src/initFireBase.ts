import admin from "firebase-admin";
import { getDatabase } from "firebase-admin/database";
import { getFirestore } from "firebase-admin/firestore";
import { params } from "@serverless/cloud";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

let app: any = null;

const initFirebase = async () => {
  // const t =
  //   "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC7nfWUaMguyWlE\nrWIaywW61Z0SNV/9cEANxBXbYvsMuuGiW2fnzLPVViV38Dm4od2KARVXeIxmPRN8\nzsn5AY5oOfNr8sz7Ek6hszGTtXOWxB479Dgqw2sN7d5LRFGjAv5x+DbQE4c9bhIo\nrJD4Z43lI2F1146rJpAzedrZBR6bUwrMuEAI8c4OKSw2B9wxhFqRbEZRQVwsfzul\nea3e/OWnhmiqXuv4a6lQVBrBIgnOXCyUhQVhycwt0vkrAgOFoyWpazSn+akaSIrL\nj8fyaKMVolCDvaJnKOBEkQRNArKOCe2ScC1usi2X8nmvqXRKJqrvwYN0hhoAI51S\nNXaFSkspAgMBAAECggEACt2J7njHV8RPfcwfwXGkCORcRsTDZMlL1bBB3B/Q7mAN\nTKqIAN80mU82TMpOAXYS/y4dtwrdcKyqqgCiJvL9imY0Gs/n1JuEZRjHBH5OmHrj\nowZl+/4Ev2dY8hlzCTfVa11xXole/JeuYrTPEX+9HTnNvWDI26XDAKQsNdjLeLm+\noZqA6rkXfPVK+6C1vh9AGUeOWHN+eyMRDXNS9m5PlyhM1h1haAT3yyVi+pYuImPT\nx/18dubpUcHyIt5BXcTHBB77bJMcK2bVs7OA92j4ne6UAVUlS1LrfNmmJC+kIoXP\n/v11vFQyClPwkOlTdd5LsD2NXVLcx9lRLU1MFDvP/QKBgQDiP8DhWA8D9edrc/bx\nyI2pEb1NExHFjR8eU6n15DsgVg0h0cVE20yEQoGVQrvYNsgrkXe4opyoPSFperP3\ngm7jGD6N8KlMSBFPXGICQaLqOfUX9lLmFGvu7MFcfORJ9MNisTYK2JjLNXkU4NXE\n7+2JtJKRJ1v1cJ0hvKBAHRLyBQKBgQDUSbt0zJiO1jXOnPSoRo2xYPMeF61hk2IO\ny1Mq0tvZk+tNDqWFxD+J83/JL+B+TNz9a9nSYjGmdJLg+PvTolYplXO03v6btL7a\n/WwP4T09xNCbsVczS5/hBND0WfpyjDpCfzydkp/gclwmdHw2FNylj0EpfrVBrdfQ\nbwgMVU3J1QKBgFdCN2WxzLi+Um7C3u8JZnlaeiQLwsLqVqIfqmFHkPY7ufzdJrQT\n0EMCU2/5uPD+z9zd0crIDJtmWEiSJm7DQ3kalKWxt9nPwb1V6AbuwaKMj9aaDgbm\nwWn4req50GIloGWj6y/rsaJOEVDYFhpKXtbJae3JvFHBCRlF4phXnkLxAoGAVaay\nFXv/CZJv/z7gj4x32tts+/U9pSLb63ApzBtrTKwbwelo60G1CSnPoxLIFu1YNH9x\nUSsBMVHTeSW8JTVYYkrEdnOKcrRIVP7uvLF6DhP8vvScZDvc8+MHk69CFzlwwCeq\nA0GHc/1wJKvW+dMM+1eDSQSwiSFk89n4e1Fno0kCgYB2b3QDKZKsr/BVaPQlaeaH\nbYzjDrvzlSEA1LUJ/5ISMGKWuUXDW9xVUPZydlFt5whdWk+XasSV0EiYmWsJC0Cp\nKNtqp28VRgg40KZHjgSvi6sZMINedzH8m/irM4SBm5lTDctyb0up1ZPG0SHdi3GN\nxwWps/qhaKl4jNG/9sYhYA==\n-----END PRIVATE KEY-----\n";
  // const e = "crypto - portfolio - df8df";
  const private_key =
    params["FIREBASE_PRIVATE_KEY"] || process.env["FIREBASE_PRIVATE_KEY"];
  const { privateKey } = private_key ? JSON.parse(private_key) : "";
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
  const fireStore = await getFireStore();
  const db = await getDb(app);

  return { app, db, fireStore };
};

const getDb = async (app: any) => {
  const db = await getDatabase(app);
  db.goOnline();
  return db;
};

const getFireStore = async () => {
  const fireStore = await getFirestore();
  return fireStore;
};

export default initFirebase;
