import { Accordion, Avatar, Menu, Tabs, Title } from "@mantine/core";
import React, { useEffect, useState } from "react";
import Flex from "stiches/components/flex/flex";
import UseAnimations from "react-useanimations";
import IconAnimationLibrary from "config/iconAnimations";
interface HeaderProps {}
import { isMobile } from "react-device-detect";
import { useRouter } from "next/router";
import { BiLogOut } from "react-icons/bi";
import { getAuth, signOut } from "firebase/auth";
export const Header: React.FC<HeaderProps> = ({}) => {
  const router = useRouter();
  const auth = getAuth();
  const [loggedIn, setLoggedIn] = useState(false);
  auth.onAuthStateChanged(function (user) {
    if (user?.uid) setLoggedIn(true);
    else setLoggedIn(false);
  });
  const [pathname, setPathname] = useState(router.asPath);
  useEffect(() => {
    setPathname(router.asPath);
  }, [router.asPath]);
  return (
    <Flex
      style={{
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        height: 52,
      }}
      justify={"space-between"}
    >
      <Flex gap={2} className="xs:w-10 mt-1.5">
        <Title order={2} className="xs:!text-xs xs:!mt-1.5 sm:!-mt-2 text-xl ">
          Binance Manager
        </Title>

        <UseAnimations
          animation={IconAnimationLibrary.activity}
          size={27}
          strokeColor={"#fff"}
          className="xs:hidden"
        />
      </Flex>
      {loggedIn && (
        <Tabs
          defaultValue={
            pathname.includes("portfolio")
              ? "portfolio"
              : pathname.includes("bot")
              ? "bot"
              : pathname.includes("history")
              ? "history"
              : "portfolio"
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
      )}
      {loggedIn && (
        <Flex justify={"flex-end"} className="xs:w-fit w-60 pt-1">
          <Menu trigger="hover" width={120}>
            <Menu.Target>
              <Avatar radius="xl" />
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item icon={<BiLogOut />} onClick={() => signOut(auth)}>
                Log Out
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Flex>
      )}
    </Flex>
  );
};
