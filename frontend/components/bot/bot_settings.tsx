import { GeneralBotData } from "@common/types/interfaces";
import { Button, Modal, NumberInput, Select, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useBotStore } from "data/bot_store";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import Flex from "stiches/components/flex/flex";
import { useDocument } from "swr-firestore-v9";

interface BotSettingsProps {}
interface SelectProps {
  defaultValue: string;
}

const SignNumberSelect = ({ defaultValue }: SelectProps) => {
  return (
    <Select
      defaultValue={defaultValue}
      style={{ width: 86 }}
      data={[
        { value: "-", label: "-" },
        { value: "+", label: "+" },
      ]}
    />
  );
};

export const BotSettings: React.FC<BotSettingsProps> = ({}) => {
  const router = useRouter();
  const auth = getAuth();
  const [userUID, setUserUID] = useState("");
  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user?.uid) setUserUID(user.uid);
      else return router.push("signup_login");
    });
  });
  const { update, set } = useDocument(`users_bot/${userUID}`, {
    listen: true,
  });
  const general = useBotStore((s) => s.general);
  const form = useForm<GeneralBotData>({
    initialValues: general
      ? general
      : {
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
    //should set check on type and not falsey value
    validate: {
      buyPreferences: (values) =>
        !values.best || !values.better || !values.good
          ? "Please fill in all fields"
          : null,
      sellPreferences: (values) =>
        !values.best || !values.better || !values.good
          ? "Please fill in all fields"
          : null,
    },
  });

  const savePreferences = () => {
    if (general) update({ ...general, ...form.values });
    else set({ ...form.values });
  };

  return (
    <Modal opened={true} onClose={() => {}} withCloseButton={false} size={900}>
      <Flex direction={"column"} justify={"center"}>
        <Flex direction={"column"} gap={2}>
          <Title align="center">Welcome to your personalized bot 🤖</Title>
          <Title order={4} align="center">
            Please decide on your preferences!
          </Title>
        </Flex>
        <Flex direction={!isMobile ? "row" : "column"} gap={!isMobile ? 8 : 5}>
          <Flex direction={"column"} gap={5} style={{ marginTop: 40 }}>
            <Title order={3} align="center">
              Buy
            </Title>
            <Flex gap={2}>
              <SignNumberSelect defaultValue="-" />
              <NumberInput
                value={form.values.buyPreferences.best}
                onChange={(value) =>
                  value &&
                  form.setFieldValue("buyPreferences", {
                    ...form.values.buyPreferences,
                    best: value,
                  })
                }
              />
              <Title order={6}>
                Discount on avg buy price you would love 😁
              </Title>
            </Flex>
            <Flex gap={2}>
              <SignNumberSelect defaultValue="-" />
              <NumberInput
                value={form.values.buyPreferences.better}
                onChange={(value) =>
                  value &&
                  form.setFieldValue("buyPreferences", {
                    ...form.values.buyPreferences,
                    better: value,
                  })
                }
              />{" "}
              <Title order={6}>
                Discount on avg buy price you would like 😊
              </Title>
            </Flex>
            <Flex gap={2}>
              <SignNumberSelect defaultValue="-" />
              <NumberInput
                value={form.values.buyPreferences.good}
                onChange={(value) =>
                  value &&
                  form.setFieldValue("buyPreferences", {
                    ...form.values.buyPreferences,
                    good: value,
                  })
                }
              />
              <Title order={6}>
                Discount on avg buy price you are okay with 🥲
              </Title>
            </Flex>
          </Flex>
          <Flex
            direction={"column"}
            gap={5}
            style={{ marginTop: !isMobile ? 40 : 50 }}
          >
            <Title order={3} align="center">
              Sell
            </Title>
            <Flex gap={2}>
              <SignNumberSelect defaultValue="+" />
              <NumberInput
                value={form.values.sellPreferences.best}
                onChange={(value) =>
                  value &&
                  form.setFieldValue("sellPreferences", {
                    ...form.values.sellPreferences,
                    best: value,
                  })
                }
              />
              <Title order={6}>Profit on avg buy price you would love 😁</Title>
            </Flex>
            <Flex gap={2}>
              <SignNumberSelect defaultValue="+" />

              <NumberInput
                value={form.values.sellPreferences.better}
                onChange={(value) =>
                  value &&
                  form.setFieldValue("sellPreferences", {
                    ...form.values.sellPreferences,
                    better: value,
                  })
                }
              />
              <Title order={6}>Profit on avg buy price you would like 😊</Title>
            </Flex>
            <Flex gap={2}>
              <SignNumberSelect defaultValue="+" />
              <NumberInput
                value={form.values.sellPreferences.good}
                onChange={(value) =>
                  value &&
                  form.setFieldValue("sellPreferences", {
                    ...form.values.sellPreferences,
                    good: value,
                  })
                }
              />
              <Title order={6}>
                Profit on avg buy price you are okay with 🥲
              </Title>
            </Flex>
          </Flex>
        </Flex>
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
