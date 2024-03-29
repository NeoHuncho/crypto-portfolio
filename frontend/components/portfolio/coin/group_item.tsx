import { AmountValue, DaysTo } from "@common/types/interfaces";
import { Text, Title } from "@mantine/core";
import React from "react";
import { isMobile } from "react-device-detect";
import Flex from "stiches/components/flex/flex";

interface GroupItemProps {
  name: string;
  title: string;
  value: number | string | DaysTo | AmountValue | undefined;
}

interface IDaysTo {
  value: DaysTo;
}

const DaysTo = ({ value }: IDaysTo) => {
  return (
    <div className="flex flex-row justify-center">
      <h1 className=" text-green-600 text-lg xs:text-xs">{value.next}d/</h1>
      <h1 className=" text-red-600 text-lg xs:text-xs">{value.last}d</h1>
    </div>
  );
};
const isDaysTo = (value: any): value is DaysTo => {
  if (!value) return false;
  return value.next !== undefined;
};

const isAmountValue = (value: any): value is AmountValue => {
  if (!value) return false;
  return value.value !== undefined;
};

export const GroupItem: React.FC<GroupItemProps> = ({ title, value, name }) => {
  typeof value === "number"
    ? value === 0
      ? "--"
      : name === "remainingStakingAmount"
      ? (value = value.toFixed(2))
      : name === "interestRoi"
      ? (value = value.toFixed(2) + "%")
      : (value = value.toFixed(2) + "€")
    : isAmountValue(value) &&
      (value = !value.value ? "--" : value.value.toFixed(2) + "€");
  return (
    <Flex
      style={{
        height: 85,
        justifyContent: "center",
      }}
      direction={"column"}
    >
      <Text
        size={!isMobile ? "md" : "xs"}
        className=" text-center text-gray-200 w-full xs:text-xs"
      >
        {title.split("\n").map(function (item, name) {
          return (
            <span key={name}>
              {item}
              <br />
            </span>
          );
        })}{" "}
      </Text>
      {isDaysTo(value) ? (
        <DaysTo value={value} />
      ) : (
        <Title
          order={4}
          className=" text-center text-gray-200  justify-self-end w-full xs:text-sm"
        >
          {value && typeof value === "string" ? value : "--"}
        </Title>
      )}
    </Flex>
  );
};
