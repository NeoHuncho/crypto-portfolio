import { Input, Checkbox, Button, Loader } from "@mantine/core";
import Head from "next/head";
import Image from "next/image";
import { useDocument } from "swr-firestore-v9";
import { getAuth } from "firebase/auth";
import { sortDataDesc } from "../utils/sortDataCrypto";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDisclosure } from "@mantine/hooks";
import { defaultButtonProps } from "config/mantine";
import { BotSettings } from "components/bot/settings/bot_settings";
import { BotData } from "@common/types/interfaces";
import { useBotStore } from "data/bot_store";
import CenteredLoader from "components/loader/centered";

export default function Bot() {
  const router = useRouter();
  const auth = getAuth();
  const [userUID, setUserUID] = useState("");
  const [showSettings, handlers] = useDisclosure(false);
  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user?.uid) setUserUID(user.uid);
      else return router.push("signup_login");
    });
  });

  const { data, update, error } = useDocument<BotData>(`users_bot/${userUID}`, {
    listen: true,
  });
  useEffect(() => {
    if (!data?.exists) return;
    useBotStore.setState({
      general: data.general,
    });
  }, [data]);

  if (!data) return <CenteredLoader />;
  if (!data.exists || !data?.general) return <BotSettings />;
  return (
    <>
      <div className="bg-gray-900">
        <Button onClick={handlers.open} {...defaultButtonProps}>
          Settings
        </Button>
      </div>
      {showSettings && <BotSettings closeButton={true} />}
    </>
  );
  //       <Head>
  //         <title>Crypto Portfolio</title>
  //         <meta
  //           name="description"
  //           content="The best Crypto Portfolio. Only 4.99$ a month. First month free!"
  //         />
  //         <link rel="icon" href="/favicon.ico" />
  //       </Head>

  //       <header>
  //         <div className="bg-background pt-5 mb-10 flex flex-row justify-center items-start">
  //           <h1 className="text-gray-200 text-3xl font-bold">BOT setup</h1>
  //         </div>
  //       </header>
  //       <main>
  //         <div className="bg-gray-800 rounded-md mx-5 mt-10 p-5 mb-10  justify-center items-start">
  //           <h1 className="text-gray-200 text-2xl font-bold text-center">
  //             Main settings
  //           </h1>
  //           <div className="grid grid-cols-3 pt-5">
  //             <div className="flex align-center justify-center flex-col px-10">
  //               <h3 className="text-gray-200 text-center">
  //                 Maximum spending
  //                 <br /> per day
  //               </h3>
  //               <div className="max-w-input self-center py-4">
  //                 <Input size="sm" rightSection={<p>$</p>} />
  //               </div>
  //             </div>
  //             <div className="flex align-center justify-center flex-col px-10">
  //               <h3 className="text-gray-200 text-center">
  //                 Maximum selling <br /> per day
  //               </h3>
  //               <div className="max-w-input self-center py-4">
  //                 <Input size="sm" rightSection={<p>$</p>} />
  //               </div>
  //             </div>
  //             <div className="flex align-center justify-center flex-col px-10">
  //               <h3 className="text-gray-200 text-center">
  //                 Amount of coin holding
  //                 <br /> to stack
  //               </h3>
  //               <div className="max-w-input self-center py-4">
  //                 <Input size="sm" rightSection={<p>%</p>} />
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //         <Listheader />

  //         {Object.entries(data.coins)
  //           .sort(sortDataDesc)
  //           .map(([coin, index]) => (
  //             <div key={index} className="   ml-2 mt-8 grid grid-cols-6 ">
  //               <div className="flex flex-row items-center ">
  //                 <Image
  //                   src={`https://raw.githubusercontent.com/jsupa/crypto-icons/main/icons/${coin.toLowerCase()}.png`}
  //                   width={35}
  //                   height={35}
  //                 />
  //                 <h1 className="mx-5 text-gray-200 text-xl text-center self-center font-semibold">
  //                   {coin}
  //                 </h1>
  //               </div>
  //               <div className="flex flex-row justify-center">
  //                 <div className="flex flex-col items-center ">
  //                   <Checkbox defaultChecked />

  //                   <h2 className="text-gray-200">Buy</h2>
  //                 </div>
  //                 <div className="flex flex-col items-center px-3">
  //                   <Checkbox defaultChecked />
  //                   <h2 className="text-gray-200">Sell</h2>
  //                 </div>
  //               </div>
  //               <div className="flex flex-row justify-center items-center">
  //                 <p className="text-gray-200">Once every</p>
  //                 <div className="max-w-input ml-3">
  //                   <Input
  //                     size="sm"
  //                     type="number"
  //                     min={1}
  //                     defaultValue={1}
  //                     rightSection={<p className="mr-3 text-xs">cycles</p>}
  //                   />
  //                 </div>
  //               </div>
  //               <div className="self-center place-self-center max-w-input ">
  //                 <Input
  //                   size="sm"
  //                   type="number"
  //                   min={10}
  //                   defaultValue={10}
  //                   rightSection={<p className="text-xs">$</p>}
  //                 />
  //               </div>
  //               <div className="self-center place-self-center max-w-input">
  //                 <Input
  //                   size="sm"
  //                   type="number"
  //                   min={0}
  //                   defaultValue={25}
  //                   max={100}
  //                   rightSection={<p className="text-xs">%</p>}
  //                 />
  //               </div>
  //               <div className="self-center place-self-center max-w-input">
  //                 <Input
  //                   size="sm"
  //                   type="number"
  //                   min={0}
  //                   defaultValue={40}
  //                   max={100}
  //                   rightSection={<p className="text-xs">%</p>}
  //                 />
  //               </div>
  //             </div>
  //           ))}
  //       </main>
  //     </div>
  //   );
}

// const Listheader = () => {
//   return (
//     <div className="grid grid-cols-6">
//       <div></div>
//       <h1 className="text-gray-200 text-l place-self-center font-semibold">
//         Buy/Sell
//       </h1>
//       <h1 className="text-gray-200 text-l place-self-center font-semibold">
//         How often?
//       </h1>
//       <h1 className="text-gray-200 text-l place-self-center font-semibold">
//         How much?
//       </h1>
//       <h1 className="text-gray-200 text-l place-self-center font-semibold">
//         Sell percentage?
//       </h1>
//       <h1 className="text-gray-200 text-l place-self-center font-semibold">
//         Sell at what profit?
//       </h1>
//     </div>
//   );
// };
