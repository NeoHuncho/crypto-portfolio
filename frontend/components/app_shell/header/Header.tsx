import { Accordion, Avatar, Tabs, Title } from "@mantine/core";
import React from "react";
import Flex from "stiches/components/flex/flex";
import UseAnimations from "react-useanimations";
import IconAnimationLibrary from "config/iconAnimations";
interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <Flex
      style={{
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
      }}
      justify={"space-between"}
    >
      <Flex gap={2} style={{ paddingTop: 10 }}>
        <Title order={2} style={{ marginTop: -8 }}>
          Binance Manager
        </Title>
        <UseAnimations
          animation={IconAnimationLibrary.activity}
          size={27}
          strokeColor={"#fff"}
        />
      </Flex>
      <Tabs defaultValue="portfolio">
        <Tabs.List>
          <Tabs.Tab value="portfolio">Portfolio</Tabs.Tab>
          <Tabs.Tab value="Bot">Bot</Tabs.Tab>
          <Tabs.Tab value="History">History</Tabs.Tab>
        </Tabs.List>
      </Tabs>
      <Flex justify={"flex-end"} style={{ width: 240, paddingTop: 2 }}>
        <Avatar radius="xl" />
      </Flex>
    </Flex>
  );
};
