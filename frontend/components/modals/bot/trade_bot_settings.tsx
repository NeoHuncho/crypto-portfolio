import { Modal, NumberInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useBotStore } from "data/bot_store";
import React from "react";
import { isMobile } from "react-device-detect";
import Flex from "stiches/components/flex/flex";
import SignNumberSelect from "../../bot/sub_components/sign_number_select";

interface Props {
  opened: boolean;
  onClose: () => void;
}

export const TradeBotSettings: React.FC<Props> = ({ opened, onClose }) => {
  const { settings } = useBotStore();
  const form = useForm({
    initialValues: settings?.tradeBot
      ? settings.tradeBot
      : {
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
  });
  return (
    <Modal
      size={"xl"}
      opened={opened}
      onClose={onClose}
      title="Trading Bot Settings"
    >
      <Flex direction={!isMobile ? "row" : "column"} gap={!isMobile ? 8 : 5}>
        <Flex direction={"column"} gap={5}>
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
            <Title order={6}>Discount on avg buy price you would love 😁</Title>
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
            <Title order={6}>Discount on avg buy price you would like 😊</Title>
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
        <Flex direction={"column"} gap={5}>
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
    </Modal>
  );
};
