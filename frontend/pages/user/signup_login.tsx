import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInAnonymously,
} from "firebase/auth";
import GoogleSignIn from "assets/signIn/google_sign_in.png";
import { Button, Divider } from "@mantine/core";
import { AiFillEye, AiOutlineGoogle } from "react-icons/ai";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean | string>(false);
  const provider = new GoogleAuthProvider();
  const signInUserGoogle = () => {
    setLoading("google");
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then(
        () => router.push("/user/portfolio")
        // ...
      )
      .catch((error) => {
        setLoading(false);
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
  const signInAnon = async () => {
    setLoading("anon");
    const auth = getAuth();
    await signInAnonymously(auth);
    router.push("/user/portfolio");
  };

  return (
    <>
      <Head>
        <title>Crypto Portfolio</title>
        <meta
          name="description"
          content="The best Crypto Portfolio. Only 4.99$ a month. First month free!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        style={{ height: "calc(100vh - 52px)" }}
        className=" bg-gray-900  flex flex-col align-center justify-center gap-4"
      >
        <div className="flex flex-col justify-center items-center">
          <div
            onClick={signInUserGoogle}
            className="flex flex-col justify-center cursor-pointer"
          >
            <Button
              loading={loading === "google"}
              size="lg"
              leftIcon={<AiOutlineGoogle />}
              styles={{
                root: { width: 251 },
              }}
            >
              Log in with Google
            </Button>
          </div>
        </div>
        <Divider my="lg" style={{ width: 251, alignSelf: "center" }} />
        <Button
          loading={loading === "anon"}
          onClick={async () => await signInAnon()}
          leftIcon={<AiFillEye />}
          styles={{
            root: { width: 251, alignSelf: "center" },
          }}
        >
          Visit
        </Button>
      </div>
    </>
  );
}
