import Head from "next/head";
import Image from "next/image";
import { useDocument, getFuego } from "swr-firestore-v9";
import { getAuth } from "firebase/auth";
import { sortDataDesc } from "../../utils/sortDataCrypto";

import euroLogo from "../../assets/cryptoLogos/euro.png";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Data } from "@common/types/interfaces";

export default function Home() {
  const router = useRouter();
  const auth = getAuth();
  const [userUID, setUserUID] = useState("");
  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user?.uid) setUserUID(user.uid);
      else return router.push("/user/signup_login");
    });
  });

  const { data, update, error } = useDocument<Data>(`users/${userUID}`, {
    listen: true,
  });

  useEffect(() => {
    if (!data) return;
    if (typeof data.coins === "string") data.coins = JSON.parse(data.coins);
  }, [data?.coins]);

  if (!data?.general || typeof data.coins === "string")
    return <p>Loading....</p>;

  const profitLoss = parseFloat(
    (data.general.coinsData.value - data.general.coinsData.spend).toFixed(2)
  );
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

      <header>
        <div className="bg-background pt-5 mb-10 flex flex-row justify-center items-start">
          <div className="flex justify-center items-center flex-col mx-10">
            <p className="text-gray-200 text-xl font-bold">Current Value</p>
            <p className="text-gray-200 text-3xl font-bold">
              {data.general.coinsData.value.toFixed(2) +
                data.general.currencySymbol}
            </p>
          </div>
          <div className="flex justify-center items-center flex-col mx-10">
            <p className=" text-xl font-bold text-gray-200  ">
              Total {profitLoss > 0 ? "Profit" : "Loss"}
            </p>
            <p
              className={
                " text-3xl font-bold " +
                (profitLoss > 0 ? "text-green-600" : "text-red-600")
              }
            >
              {profitLoss + data.general.currencySymbol}
            </p>
          </div>
          <div className="flex justify-center items-center flex-col mx-10">
            <p className="text-gray-200 text-xl font-bold">Total Spend</p>
            <p className="text-gray-200 text-3xl font-bold">
              {data.general.coinsData.spend.toFixed(2) +
                data.general.currencySymbol}
            </p>
            <p className="text-gray-200 text-xs">
              (Including Taxes:
              {data.general.coinsData.taxes.toFixed(2) +
                data.general.currencySymbol}
              )
            </p>
          </div>
          <div></div>
        </div>
      </header>

      <main>
        {Object.entries(data.coins)
          .sort(sortDataDesc)
          .map(([coin, values]) => {
            return (
              <div key={coin} className="grid-cols-7 gap-5 grid flex-row h-20">
                <div className="flex flex-row items-center ml-2 ">
                  <Image
                    src={
                      coin === "EUR"
                        ? euroLogo
                        : `https://raw.githubusercontent.com/jsupa/crypto-icons/main/icons/${coin.toLowerCase()}.png`
                    }
                    width={30}
                    height={30}
                  />
                  <h1 className="mx-5  text-xl text-gray-200 text-center self-center font-semibold">
                    {coin}
                  </h1>
                </div>

                <div className="flex col-span-2 flex-row items-center">
                  <div className="flex flex-col items-center  w-full">
                    <h1 className="mx-5 text-gray-200 text-xs item-start">
                      Total:
                    </h1>
                    <h1 className="  text-center text-gray-200 text-l justify-self-end w-full">
                      {values.amountValue.value?.toFixed(2)}€
                    </h1>
                  </div>
                  <div className="flex flex-col items-center  w-full">
                    <h1 className="mx-5 text-gray-200 text-xs item-start">
                      Spot/Savings:
                    </h1>
                    <h1 className="mx-5  text-l text-gray-200 text-center">
                      {values.spot.value?.toFixed(2)}€
                    </h1>
                  </div>

                  <div className="flex flex-col items-center   w-full">
                    <h1 className="mx-5 text-gray-200 text-xs item-end">
                      Staking:
                    </h1>
                    <h1 className="mx-5 text-gray-200 text-l">
                      {values.staked.value
                        ? values.staked.value.toFixed(2) + "€"
                        : "--"}
                    </h1>
                  </div>
                </div>
                <div className=" col-span-2 flex flex-row items-center">
                  <div className="flex flex-col items-center justify-center">
                    {values.currentCoinValue && (
                      <>
                        <h1 className="mx-5  text-xs text-gray-200 text-center self-center">
                          Current Value:
                        </h1>
                        <div className="flex flex-row items-center ">
                          <h1 className="mr-1 text-gray-200 text-l">
                            {values.currentCoinValue.toFixed(2)}€
                          </h1>
                          {values.currentValueDiff && (
                            <h1
                              className={
                                " text-sm " +
                                (values.currentValueDiff > 1
                                  ? "text-green-600"
                                  : "text-red-600")
                              }
                            >
                              (
                              {values.currentValueDiff > 1
                                ? "+" + values.currentValueDiff.toFixed(2)
                                : values.currentValueDiff.toFixed(2)}
                              %)
                            </h1>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                  <div className="flex flex-row items-center">
                    <div className="flex flex-col items-center">
                      <h1 className=" text-gray-200 text-xs">Avg Buy Price:</h1>
                      <h1 className=" text-gray-200 text-l">
                        {values.avgBuyPrice
                          ? values.avgBuyPrice?.toFixed(2) + "€"
                          : "--"}
                      </h1>
                    </div>

                    <div className="flex flex-col items-center ml-4">
                      <h1 className="text-gray-200 text-xs">Avg Sell Price:</h1>
                      <h1 className="text-gray-200 text-l">
                        {values.allTimeSellPrice
                          ? values.allTimeSellPrice?.toFixed(2) + "€"
                          : "--"}
                      </h1>
                    </div>
                  </div>
                </div>
                {values.staked.amount ? (
                  <div className="col-span-2 flex flex-row items-center">
                    {values.remainingStakingAmount && (
                      <div className="flex flex-col items-center mr-5">
                        <h1 className=" text-gray-200 text-xs">
                          Remaining Amount
                        </h1>
                        <h1 className=" text-gray-200 text-xs">
                          to be Stacked :
                        </h1>
                        <h1 className=" text-gray-200 text-l">
                          {values.remainingStakingAmount.toFixed(2)}
                        </h1>
                      </div>
                    )}
                    <div className="flex flex-col items-center">
                      <h1 className=" text-gray-200 text-xs">Total interest</h1>
                      <h1 className=" text-gray-200 text-xs">
                        at expiration :
                      </h1>
                      <h1 className=" text-gray-200 text-l">
                        {values.interest.value?.toFixed(2)}€
                      </h1>
                    </div>
                    <div className="flex flex-col items-center">
                      <h1 className=" text-gray-200 text-xs">days to</h1>
                      <h1 className=" text-gray-200 text-xs">
                        next/last expiration:
                      </h1>

                      <div className="flex flex-row">
                        <h1 className=" text-green-600 text-l">
                          {values.daysToStaking.next}d/
                        </h1>
                        <h1 className=" text-red-600 text-l">
                          {values.daysToStaking.last}d
                        </h1>
                      </div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            );
          })}
      </main>
    </div>
  );
}
