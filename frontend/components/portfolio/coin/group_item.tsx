import { AmountValue, DaysTo } from "@common/types/interfaces";
import { Text, Title } from "@mantine/core";
import React from "react";
import Flex from "stiches/components/flex/flex";

interface GroupItemProps {
  key: string;
  title: string;
  value: number | string | DaysTo | AmountValue;
  
}

interface IDaysTo {
  value: DaysTo;
}

const DaysTo = ({ value }: IDaysTo) => {
  return (
    <div className="flex flex-row justify-center">
      <h1 className=" text-green-600 text-lg">{value.next}d/</h1>
      <h1 className=" text-red-600 text-lg">{value.last}d</h1>
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

export const GroupItem: React.FC<GroupItemProps> = ({ key, title, value }) => {
  typeof value === "number"
    ? value === 0
      ? "--"
      : (value = value.toFixed(2) + "€")
    : isAmountValue(value) &&
      (value = !value.value  ? "--" : value.value.toFixed(2) + "€");

  return (
    <Flex direction={"column"}>
      <Text
        style={{ fontSize: 15 }}
        className="text-center text-gray-200  justify-self-end w-full"
      >
        {title.split("\n").map(function (item, key) {
          return (
            <span key={key}>
              {item}
              <br />
            </span>
          );
        })}{" "}
      </Text>
      <Title
        style={{ fontSize: 20 }}
        className="text-center text-gray-200  justify-self-end w-full"
      >
        {typeof value === "string" && value}
        {isDaysTo(value) && <DaysTo value={value} />}
      </Title>
    </Flex>
  );
};
