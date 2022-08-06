import Head from "next/head";
import Image from "next/image";
import { useDocument, getFuego } from "swr-firestore-v9";
import { getAuth } from "firebase/auth";
import { sortDataDesc } from "../../utils/sortDataCrypto";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Data } from "@common/types/interfaces";
import { AppShell } from "@mantine/core";

import { usePortfolioStore } from "data/portfolio_store";
import PortfolioHeader from "components/portfolio/header";
import PortfolioCoin from "components/portfolio/coin";

export default function Home() {
  const router = useRouter();
  const data: Data = usePortfolioStore();
  const auth = getAuth();
  const [userUID, setUserUID] = useState("");
  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user?.uid) setUserUID(user.uid);
      else return router.push("/user/signup_login");
    });
  });

  const {
    data: firebaseData,
    update,
    error,
  } = useDocument<Data>(`users/${userUID}`, {
    listen: true,
  });

  useEffect(() => {
    if (!firebaseData || typeof firebaseData?.coins !== "string") return;
    firebaseData.coins = JSON.parse(firebaseData.coins);
    console.log("dkd");
    usePortfolioStore.setState({
      coins: firebaseData.coins,
      general: firebaseData.general,
      meta: firebaseData.meta,
    });
  }, [firebaseData]);

  if (
    !firebaseData?.general ||
    typeof firebaseData.coins === "string" ||
    !data.general ||
    !data.coins
  )
    return <p>Loading....</p>;
  return (
    <div className="bg-gray-900">
      <Head>
        <title>Crypto Portfolio</title>
        <meta
          name="description"
          content="The best Crypto Portfolio. Only 4.99$ a month. First month free!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PortfolioHeader />

      <main>
        {Object.entries(data.coins)
          .sort(sortDataDesc)
          .map(([coin, values]) => {
            return <PortfolioCoin key={coin} coin={coin} values={values} />;
          })}
      </main>
    </div>
  );
}
