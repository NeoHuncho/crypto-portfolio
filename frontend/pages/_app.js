import "../styles/globals.css";
import "firebase/firestore";
import { initializeApp } from "firebase/app";
import "firebase/app";
import "firebase/auth";
import { Fuego, FuegoProvider } from "swr-firestore-v9";

const firebaseConfig = {
  apiKey: "AIzaSyCwEypdaCAvyqV34SRILd3_2Njnnely8wY",
  authDomain: "crypto-portfolio-df8df.firebaseapp.com",
  projectId: "crypto-portfolio-df8df",
  storageBucket: "crypto-portfolio-df8df.appspot.com",
  messagingSenderId: "551415102280",
  appId: "1:551415102280:web:b1f39f5406302bb385117d",
  measurementId: "G-MJE4FP5F3T",
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
