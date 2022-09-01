import { GeneralBotData } from "@common/types/interfaces";
import {
  Button,
  Collapse,
  Modal,
  NumberInput,
  Select,
  Switch,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useBotStore } from "data/bot_store";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import Flex from "stiches/components/flex/flex";
import { useDocument } from "swr-firestore-v9";
import { TradeBot } from "./sub_components/trade_bot";

interface BotSettingsProps {
  closeButton?: boolean;
}

export const BotSettings: React.FC<BotSettingsProps> = ({ closeButton }) => {
  const [opened, setOpened] = useState(true);
  const [toggled, setToggled] = useState<string[]>([]);
  const router = useRouter();
  const auth = getAuth();
  const [userUID, setUserUID] = useState("");
  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user?.uid) setUserUID(user.uid);
      else return router.push("signup_login");
    });
  });
  const { data, update, set } = useDocument(`users_bot/${userUID}`, {
    listen: true,
  });

  const store = useBotStore((s) => s);
  const general = store.general;

  const handleToggle = (string: string) =>
    toggled.includes(string)
      ? setToggled(toggled.filter((item) => item !== string))
      : setToggled([...toggled, string]);

  const form = useForm<GeneralBotData>({
    initialValues: general
      ? general
      : {
          tradeBot: {
            enabled: false,
            buyPreferences: {
              best: 0,
              better: 0,
              good: 0,
            },
            sellPreferences: {
              best: 0,
              better: 0,
              good: 0,
            },
          },
          stakingBot: {
            enabled: false,
            percentageToNotStake: 100,
          },
        },
    //should set check on type and not falsey value
  });

  const savePreferences = () => {
    if (data?.exists) update({ general: { ...form.values } });
    else set({ general: { ...form.values } });
  };

  return (
    <Modal
      opened={opened}
      onClose={() => {
        setOpened(false);
      }}
      withCloseButton={closeButton}
      size={900}
    >
      <Flex direction={"column"} justify={"center"}>
        <Flex direction={"column"} gap={2}>
          <Title align="center">Bot Settings 🤖</Title>
          {/* <Title order={4} align="center">
            Please decide on your preferences!
          </Title> */}
        </Flex>
        <Flex
          className={"mt-5"}
          align={"center"}
          fullWidth
          justify={"space-around"}
        >
          <Switch label={"Enable automatic Staking/Saving bot"} />
          <Switch label={"Enable automatic Buying/Selling(trading) bot."} />
        </Flex>
        <Title
          order={2}
          align="center"
          className="!mt-5"
          onClick={() => handleToggle("trading")}
        >
          Trading Bot ⇧
        </Title>
        <Collapse in={toggled.includes("trading")}>
          <TradeBot form={form} />
        </Collapse>

        <Button
          onClick={savePreferences}
          style={{ marginLeft: "35%", marginRight: "35%", marginTop: 40 }}
        >
          Save Preferences
        </Button>
      </Flex>
    </Modal>
  );
};
