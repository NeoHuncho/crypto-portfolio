import { Accordion, Avatar, Tabs, Title } from "@mantine/core";
import React from "react";
import Flex from "stiches/components/flex/flex";
import UseAnimations from "react-useanimations";
import IconAnimationLibrary from "config/iconAnimations";
interface HeaderProps {}
import { isMobile } from "react-device-detect";
import { useRouter } from "next/router";
export const Header: React.FC<HeaderProps> = ({}) => {
  const router = useRouter();

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
      <Flex gap={2}>
        <Title order={2} className="xs:!text-xs xs:!mt-1.5 sm:!-mt-2 text-xl">
          Binance Manager
        </Title>

        <UseAnimations
          animation={IconAnimationLibrary.activity}
          size={27}
          strokeColor={"#fff"}
          className="xs:hidden"
        />
      </Flex>
      <Tabs
        defaultValue={
          router.asPath.includes("portfolio")
            ? "portfolio"
            : router.asPath.includes("bot")
            ? "bot"
            : "history"
        }
      >
        <Tabs.List className="xs:ml-4">
          <Tabs.Tab
            onClick={() => router.push("/user/portfolio")}
            value="portfolio"
          >
            Portfolio
          </Tabs.Tab>
          <Tabs.Tab onClick={() => router.push("/user/bot")} value="bot">
            Bot
          </Tabs.Tab>
          <Tabs.Tab
            onClick={() => router.push("/user/history")}
            value="history"
          >
            History
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
      <Flex justify={"flex-end"} style={{ width: 240, paddingTop: 2 }}>
        <Avatar radius="xl" />
      </Flex>
    </Flex>
  );
};
