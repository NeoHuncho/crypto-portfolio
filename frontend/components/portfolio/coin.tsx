import { Coin } from "@common/types/interfaces";
import Image from "next/image";
import euroLogo from "../../assets/cryptoLogos/euro.png";
import React from "react";
import { useUIStore } from "data/ui_store";
import { Card, Group, Text, Title } from "@mantine/core";
import valuesTitles from "config/valuesTitles";
import Flex from "stiches/components/flex/flex";
import { GroupItem } from "./coin/group_item";
interface Props {
  coin: string;
  values: Coin;
}

export default function PortfolioCoin({ coin, values }: Props) {
  const uiSettings = useUIStore();
  return (
    <div key={coin} className=" flex flex-row mb-2">
      <div className="flex flex-row items-center ml-2 w-28 ">
        <Image
          alt={coin + " logo"}
          src={
            coin === "EUR"
              ? euroLogo
              : `https://raw.githubusercontent.com/jsupa/crypto-icons/main/icons/${coin.toLowerCase()}.png`
          }
          width={30}
          height={30}
        />
        <Title
          style={{ marginLeft: 0, marginRight: 0, paddingLeft: 10 }}
          order={5}
          className="mx-5   text-gray-200 text-center self-center font-semibold"
        >
          {coin}
        </Title>
      </div>
      <Flex justify={"space-around"} fullWidth>
        {uiSettings.coinCards.map((keys, index) => {
          return (
            <Group key={index}>
              {keys.map((key) => {
                return (
                  <GroupItem
                    key={key}
                    title={valuesTitles[key]}
                    value={values[key]}
                  />
                );
              })}
            </Group>
          );
        })}
      </Flex>
      {/* <div className="flex col-span-2 flex-row items-center">
        <div className="flex flex-col items-center  w-full">
          <h1 className="mx-5 text-gray-200 text-xs item-start">Total:</h1>
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
          <h1 className="mx-5 text-gray-200 text-xs item-end">Staking:</h1>
          <h1 className="mx-5 text-gray-200 text-l">
            {values.staked.value ? values.staked.value.toFixed(2) + "€" : "--"}
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
              
            </>
          )}
        </div>
        <div className="flex flex-row items-center">
          <div className="flex flex-col items-center">
            <h1 className=" text-gray-200 text-xs">Avg Buy Price:</h1>
            <h1 className=" text-gray-200 text-l">
              {values.avgBuyPrice ? values.avgBuyPrice?.toFixed(2) + "€" : "--"}
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
              <h1 className=" text-gray-200 text-xs">Remaining Amount</h1>
              <h1 className=" text-gray-200 text-xs">to be Stacked :</h1>
              <h1 className=" text-gray-200 text-l">
                {values.remainingStakingAmount.toFixed(2)}
              </h1>
            </div>
          )}
          <div className="flex flex-col items-center">
            <h1 className=" text-gray-200 text-xs">Total interest</h1>
            <h1 className=" text-gray-200 text-xs">at expiration :</h1>
            <h1 className=" text-gray-200 text-l">
              {values.interest.value?.toFixed(2)}€
            </h1>
          </div>
          <div className="flex flex-col items-center">
            <h1 className=" text-gray-200 text-xs">days to</h1>
            <h1 className=" text-gray-200 text-xs">next/last expiration:</h1>

            
          </div>
        </div>
      ) : (
        <></>
      )} */}
    </div>
  );
}
