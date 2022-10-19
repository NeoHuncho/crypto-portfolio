import "../styles/globals.css";
import "firebase/firestore";
import dynamic from "next/dynamic";
import "firebase/app";
import "firebase/auth";
import { AppShell, createEmotionCache, MantineProvider } from "@mantine/core";
import { Header } from "components/app_shell/header/Header";
import { firebaseConfig } from "data/firebase";
import useUserStore from "data/user_store";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { useRouter } from "next/router";
function MyApp({ Component, pageProps }) {
  const myCache = createEmotionCache({ key: "mantine", prepend: false });
  const userStore = useUserStore();
  const router = useRouter();
  const auth = getAuth();
  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user?.uid) {
        if (user.isAnonymous)
          userStore.setUserUID("VafhUIU2Z4Mt1HoNQnNr11pEZ4z1");
        else userStore.setUserUID(user.uid);
      } else return router.push("signup_login");
      return;
    });
  }, []);
  return (
    <MantineProvider
      theme={{ colorScheme: "dark" }}
      withGlobalStyles
      withNormalizeCSS
      emotionCache={myCache}
    >
      <AppShell unstyled header={<Header />}>
        <Component {...pageProps} />
      </AppShell>
    </MantineProvider>
  );
}
export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false,
});
