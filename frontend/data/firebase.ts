import { getDatabase, ref } from "firebase/database";
import { initializeApp } from "firebase/app";
import { Config } from "firebase/auth";
import { doc, getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "crypto-portfolio-df8df.firebaseapp.com",
  projectId: "crypto-portfolio-df8df",
  storageBucket: "crypto-portfolio-df8df.appspot.com",
  messagingSenderId: process.env.FIREBASE_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  databaseURL:
    "https://crypto-portfolio-df8df-default-rtdb.europe-west1.firebasedatabase.app",
};
initializeApp(firebaseConfig);
const database = getDatabase();
const firestore = getFirestore();
const generalCoinsRef = ref(database, "general_coins");
const getUserDataRef = (userID: string) => doc(firestore, "users", userID);
export { firebaseConfig, database, firestore, generalCoinsRef, getUserDataRef };