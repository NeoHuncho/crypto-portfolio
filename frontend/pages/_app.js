import "../styles/globals.css";
import "firebase/firestore";

import "firebase/app";
import "firebase/auth";
import { AppShell, createEmotionCache, MantineProvider } from "@mantine/core";
import { Header } from "components/app_shell/header/Header";
import { firebaseConfig } from "data/firebase";
function MyApp({ Component, pageProps }) {
  const myCache = createEmotionCache({ key: "mantine", prepend: false });
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

export default MyApp;
