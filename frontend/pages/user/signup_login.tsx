import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import styles from "../../styles/Home.module.css";
import GoogleSignIn from "assets/signIn/google_sign_in.png";

export default function Home() {
  const router = useRouter();

  const provider = new GoogleAuthProvider();
  const signInUserGoogle = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then(
        () => router.push("/user/portfolio")
        // ...
      )
      .catch((error) => {
        console.log(error);
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Crypto Portfolio</title>
        <meta
          name="description"
          content="The best Crypto Portfolio. Only 4.99$ a month. First month free!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <p className="bg-gray-900 text-4xl font-bold text-gray-200 text-center pt-5">
        Binance Crypto Porfolio
      </p>

      <div className="bg-gray-900 h-screen flex justify-center items-center">
        <div
          onClick={signInUserGoogle}
          className="flex flex-col justify-center cursor-pointer"
        >
          <Image src={GoogleSignIn} width={191} height={46} />
        </div>
      </div>

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </div>
  );
}
