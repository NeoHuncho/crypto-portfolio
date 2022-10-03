// @ts-nocheck
import { Data } from "@common/types/interfaces";
import {
  RingProgress,
  SegmentedControl,
  Slider,
  Text,
  Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { usePortfolioStore } from "data/portfolio_store";
import React, { useState } from "react";
import { isMobile } from "react-device-detect";
import Flex from "stiches/components/flex/flex";
import sortPriceChangeKeys from "utils/sortPriceChangeKeys";

interface GeckoSlideProps {
  coin: string;
}

export const GeckoSlide: React.FC<GeckoSlideProps> = ({ coin }) => {
  const [key, setKey] = useState("24h");
  const data: Data = usePortfolioStore();
  if (!data.generalCoins || !data.generalCoins[coin]) return <></>;
  const coinData = data.generalCoins[coin];
  if (!coinData.price_change) return <></>;
  const keys = sortPriceChangeKeys(
    Object.keys(coinData.price_change).map((key: string) => {
      return { label: key, value: key };
    })
  );

  const priceValue: any = coinData.price_change[key];
  return (
    <Flex justify={"space-around"}>
      <Flex direction={"column"} gap={2} className="mt-1 mb-2">
        <Title
          order={3}
          className={`text-center justify-self-end w-full xs:text-sm`}
          style={{
            color: priceValue ? (priceValue > 0 ? "green" : "red") : "grey",
          }}
        >
          {!!priceValue ? priceValue + "%" : "--"}
        </Title>

        <SegmentedControl value={key} onChange={setKey} size="xs" data={keys} />
      </Flex>
      {!isMobile && (
        <Flex align="center" className="ml-2 mr-2" gap={2}>
          <RingProgress
            size={75}
            label={
              <Text align="center" size="xs">
                {coinData.ranking.coingecko_score + "%"}
              </Text>
            }
            sections={[
              { value: coinData.ranking.coingecko_score, color: "blue" },
            ]}
          />

          <Flex direction="column">
            <Text
              size={!isMobile ? "md" : "xs"}
              className=" text-center text-gray-200 w-full xs:text-xs"
            >
              Rank
            </Text>
            <Title
              order={4}
              className={`text-center justify-self-end w-full xs:text-sm`}
            >
              {coinData.ranking.global_rank}
            </Title>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};
