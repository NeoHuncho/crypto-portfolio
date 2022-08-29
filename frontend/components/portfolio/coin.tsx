import { Coin } from "@common/types/interfaces";
import Image from "next/image";
import euroLogo from "../../assets/cryptoLogos/euro.png";
import React from "react";
import { useUIStore } from "data/ui_store";
import { Card, Group, Text, Title } from "@mantine/core";
import valuesTitles from "config/valuesTitles";
import Flex from "stiches/components/flex/flex";
import { GroupItem } from "./coin/group_item";
import { Carousel } from "@mantine/carousel";
import { isMobile } from "react-device-detect";
interface Props {
  coin: string;
  values: Coin;
}

export default function PortfolioCoin({ coin, values }: Props) {
  const uiSettings = useUIStore();
  return (
    <div key={coin} className=" flex flex-row mb-2">
      <div className="flex gap-2 flex-col mt-2 items-center ml-2 w-20 ">
        <Image
          alt={coin + " logo"}
          src={
            coin === "EUR"
              ? euroLogo
              : `https://raw.githubusercontent.com/jsupa/crypto-icons/main/icons/${coin.toLowerCase()}.png`
          }
          width={35}
          height={35}
        />
        <Title
          style={{ marginLeft: 0, marginRight: 0 }}
          order={4}
          className="mx-5   text-gray-200 text-center self-center font-semibold"
        >
          {coin}
        </Title>
      </div>
      <Flex fullWidth>
        <Carousel
          withIndicators
          withControls={false}
          height={!isMobile ? 110 : 120}
          slideSize={isMobile ? "90%" : "33.333333%"}
          slideGap="xl"
          breakpoints={
            !isMobile
              ? [
                  { maxWidth: "md", slideSize: "50%" },
                  { maxWidth: "sm", slideSize: "100%", slideGap: 0 },
                ]
              : [{ slideSize: "90%", slideGap: 5 }]
          }
          loop
          align="start"
          styles={{
            indicators: { bottom: 20, paddingRight: 25 },
            indicator: { backgroundColor: "white !important" },
            container: !isMobile ? { marginLeft: 20, marginRight: 60 } : {},
          }}
          style={{ width: "100%", justifyItems: "center" }}
        >
          {uiSettings.coinCards.map((keys, index) => {
            if (keys.includes("remainingStakingAmount") && !values.canBeStaked)
              return null;
            return (
              <Carousel.Slide key={index}>
                <div
                  className="grid grid-cols-3  border rounded-lg xs:gap-2"
                  style={{ width: "100%" }}
                >
                  {keys.map((name) => {
                    return (
                      <GroupItem
                        key={name}
                        title={valuesTitles[name]}
                        value={values[name]}
                        name={name}
                      />
                    );
                  })}
                </div>
              </Carousel.Slide>
            );
          })}
        </Carousel>
      </Flex>
    </div>
  );
}
