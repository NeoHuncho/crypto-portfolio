import Head from "next/head";
import Image from "next/image";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { sortDataDesc } from "../utils/sortDataCrypto";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Data } from "@common/types/interfaces";
import { AppShell } from "@mantine/core";

import { usePortfolioStore } from "data/portfolio_store";
import PortfolioHeader from "components/portfolio/header";
import PortfolioCoin from "components/portfolio/coin";
import CenteredLoader from "components/loader/centered";
import {
  database,
  firestore,
  generalCoinsRef,
  getUserDataRef,
} from "data/firebase";
import { get, onValue, ref } from "firebase/database";
import filterGeneralCoins from "utils/filterGeneralCoins";
import { useUIStore } from "data/ui_store";
import useUserStore from "data/user_store";
import { AnonModal } from "components/modals/general/anonModal";

export default function Portfolio() {
  const data: Data = usePortfolioStore();
  const uiStore = useUIStore();
  const { userUID } = useUserStore();
  const [formattedData, setFormattedData] = useState<any>(null);
  const [showAnonModal, setShowAnonModal] = useState<boolean>(
    uiStore.modals.showAnonModal
  );

  useEffect(() => {
    if (!userUID) return;
    onSnapshot(getUserDataRef(userUID ? userUID : "no"), (doc) => {
      if (doc.exists())
        usePortfolioStore.setState({
          coins: JSON.parse(doc.data().coins),
          general: doc.data().general,
        });
    });
    getDoc(getUserDataRef(userUID)).then((doc) => {
      if (doc.exists()) {
        const data = doc.data();
        if (!data) return;
        const coins = JSON.parse(data.coins);
        usePortfolioStore.setState({
          coins: coins,
          general: doc.data().general,
        });
        get(generalCoinsRef).then((snapshot) => {
          const dbData = snapshot.val();
          usePortfolioStore.setState({
            generalCoins: filterGeneralCoins(dbData, Object.keys(coins)),
          });
        });
      }
    });
  }, [userUID]);
  useEffect(() => {
    onValue(generalCoinsRef, (snapshot) => {
      const dbData = snapshot.val();
      data.coins &&
        usePortfolioStore.setState({
          generalCoins: filterGeneralCoins(dbData, Object.keys(data.coins)),
        });
    });
  }, [data.coins]);
  useEffect(() => {
    if (!data.coins) return;
    setFormattedData(
      Object.entries(data.coins)
        .sort(sortDataDesc)
        .filter(([coin, values]) => {
          if (uiStore.filters.hide0Balance)
            return values.amountValue.value > 0.2;
          else return true;
        })
    );
  }, [data.coins, uiStore.filters.hide0Balance]);

  if (!formattedData) return <CenteredLoader />;

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
        {formattedData.map(([coin, values]: any) => {
          return <PortfolioCoin key={coin} coin={coin} values={values} />;
        })}
      </main>
      <AnonModal
        opened={showAnonModal}
        onClose={() => {
          uiStore.actions.toggleShowAnonModal();
          setShowAnonModal(false);
        }}
      />
    </div>
  );
}
