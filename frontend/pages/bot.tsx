import { useEffect, useState } from "react";
import { useBotStore } from "data/bot_store";
import CenteredLoader from "components/loader/centered";
import useUserStore from "data/user_store";
import { onValue } from "firebase/database";
import { userBotRef } from "data/firebase";
import { Settings } from "components/bot/settings";

export default function Bot() {
  const [firstTime, setFirstTime] = useState<boolean>(false);
  const { userUID } = useUserStore();
  const data = useBotStore();
  useEffect(() => {
    onValue(userBotRef(userUID), (snapshot) => {
      if (snapshot.exists())
        useBotStore.setState({
          settings: snapshot.val().settings,
          coins: snapshot.val().coins,
        });
      else setFirstTime(true);
    });
  }, [userUID]);

  if (!data && firstTime)
    return (
      <>
        <Settings />
      </>
    );
  if (!data) return <CenteredLoader />;
  return (
    <>
      <Settings />
    </>
  );
}
