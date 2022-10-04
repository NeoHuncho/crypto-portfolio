import { Coin } from "@common/types/interfaces";
import Image from "next/image";
import euroLogo from "../../assets/cryptoLogos/euro.png";
import React, { useState } from "react";
import { useUIStore } from "data/ui_store";
import { Card, createStyles, Group, Text, Title } from "@mantine/core";
import valuesTitles from "config/valuesTitles";
import Flex from "stiches/components/flex/flex";
import { GroupItem } from "./coin/group_item";
import { Carousel } from "@mantine/carousel";

import { GeckoSlide } from "./coin/gecko_slide";
import { usePortfolioStore } from "data/portfolio_store";
import { useMediaQuery } from "@mantine/hooks";
interface Props {
  coin: string;
  values: Coin;
}

const useStyles = createStyles((_theme, _params, getRef) => ({
  controls: {
    ref: getRef("controls"),
    transition: "opacity 150ms ease",
    opacity: 0,
  },

  root: {
    "&:hover": {
      [`& .${getRef("controls")}`]: {
        opacity: 1,
      },
    },
  },
}));

export default function PortfolioCoin({ coin, values }: Props) {
  const { classes } = useStyles();
  const isMobile = useMediaQuery("(max-width: 500px)");

  const uiSettings = useUIStore();
  const data = usePortfolioStore();
  if (!data.generalCoins) return <></>;
  const generalCoins = data.generalCoins;

  return (
    <div key={coin} className=" flex flex-row mb-2 xs:mb-10 ">
      <div className="flex gap-2 flex-col mt-2 items-center ml-2 w-20 xs:w-10  xs:ml-5">
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
      <Carousel
        initialSlide={uiSettings.ui.currentSlideIndex}
        onNextSlide={() => uiSettings.actions.incrementSlideIndex()}
        onPreviousSlide={() => uiSettings.actions.decrementSlideIndex()}
        controlsOffset="xs"
        height={uiSettings.layout.syncCarouselMoves ? 100 : 125}
        slideSize={isMobile ? "80%" : "33.333333%"}
        slideGap="xl"
        withControls={uiSettings.layout.syncCarouselMoves ? true : false}
        withIndicators={uiSettings.layout.syncCarouselMoves ? false : true}
        controlSize={isMobile ? 20 : 25}
        classNames={!isMobile ? classes : {}}
        breakpoints={
          !isMobile
            ? [
                { maxWidth: "md", slideSize: "50%" },
                { maxWidth: "sm", slideSize: "100%", slideGap: 0 },
              ]
            : [{ slideSize: "80%", slideGap: 5 }]
        }
        align={!isMobile ? "start" : "center"}
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
          if (keys.includes("PriceSlider/Ranking")) {
            if (generalCoins[coin])
              return (
                <Carousel.Slide key={index}>
                  <div
                    className="border rounded-lg xs:gap-2"
                    style={{ width: "100%" }}
                  >
                    <GeckoSlide coin={coin} />
                  </div>
                </Carousel.Slide>
              );
            else return null;
          }
          return (
            <Carousel.Slide key={index}>
              <div
                className="grid grid-cols-3 border rounded-lg xs:gap-2"
                style={{ width: "100%" }}
              >
                {keys.map((name) => {
                  if (name !== "PriceSlider/Ranking")
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
    </div>
  );
}
