import "../styles/globals.css";
import "firebase/firestore";
import { initializeApp } from "firebase/app";
import "firebase/app";
import "firebase/auth";
import { Fuego, FuegoProvider } from "swr-firestore-v9";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "crypto-portfolio-df8df.firebaseapp.com",
  projectId: "crypto-portfolio-df8df",
  storageBucket: "crypto-portfolio-df8df.appspot.com",
  messagingSenderId: process.env.FIREBASE_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

const fuego = new Fuego(firebaseConfig);
initializeApp(firebaseConfig);

function MyApp({ Component, pageProps }) {
  return (
    <FuegoProvider fuego={fuego}>
      <Component {...pageProps} />
    </FuegoProvider>
  );
}

export default MyApp;
