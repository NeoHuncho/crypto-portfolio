import { NumberInput, Title } from "@mantine/core";
import React from "react";
import { isMobile } from "react-device-detect";
import Flex from "stiches/components/flex/flex";
import SignNumberSelect from "../sign_number_select";

interface TradeBotProps {
  form: any;
}

export const TradeBot: React.FC<TradeBotProps> = ({ form }) => {
  return (
    <Flex direction={!isMobile ? "row" : "column"} gap={!isMobile ? 8 : 5}>
      <Flex direction={"column"} gap={5}>
        <Title order={3} align="center">
          Buy
        </Title>
        <Flex gap={2}>
          <SignNumberSelect defaultValue="-" />
          <NumberInput
            value={form.values.tradeBot.buyPreferences.best}
            onChange={(value) =>
              value &&
              form.setFieldValue("buyPreferences", {
                ...form.values.tradeBot.buyPreferences,
                best: value,
              })
            }
          />
          <Title order={6}>Discount on avg buy price you would love 😁</Title>
        </Flex>
        <Flex gap={2}>
          <SignNumberSelect defaultValue="-" />
          <NumberInput
            value={form.values.tradeBot.buyPreferences.better}
            onChange={(value) =>
              value &&
              form.setFieldValue("buyPreferences", {
                ...form.values.tradeBot.buyPreferences,
                better: value,
              })
            }
          />{" "}
          <Title order={6}>Discount on avg buy price you would like 😊</Title>
        </Flex>
        <Flex gap={2}>
          <SignNumberSelect defaultValue="-" />
          <NumberInput
            value={form.values.tradeBot.buyPreferences.good}
            onChange={(value) =>
              value &&
              form.setFieldValue("buyPreferences", {
                ...form.values.tradeBot.buyPreferences,
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
            value={form.values.tradeBot.sellPreferences.best}
            onChange={(value) =>
              value &&
              form.setFieldValue("sellPreferences", {
                ...form.values.tradeBot.sellPreferences,
                best: value,
              })
            }
          />
          <Title order={6}>Profit on avg buy price you would love 😁</Title>
        </Flex>
        <Flex gap={2}>
          <SignNumberSelect defaultValue="+" />

          <NumberInput
            value={form.values.tradeBot.sellPreferences.better}
            onChange={(value) =>
              value &&
              form.setFieldValue("sellPreferences", {
                ...form.values.tradeBot.sellPreferences,
                better: value,
              })
            }
          />
          <Title order={6}>Profit on avg buy price you would like 😊</Title>
        </Flex>
        <Flex gap={2}>
          <SignNumberSelect defaultValue="+" />
          <NumberInput
            value={form.values.tradeBot.sellPreferences.good}
            onChange={(value) =>
              value &&
              form.setFieldValue("sellPreferences", {
                ...form.values.tradeBot.sellPreferences,
                good: value,
              })
            }
          />
          <Title order={6}>Profit on avg buy price you are okay with 🥲</Title>
        </Flex>
      </Flex>
    </Flex>
  );
};
