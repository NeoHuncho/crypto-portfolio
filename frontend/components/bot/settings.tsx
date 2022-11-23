import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import StakingBotSettings from "components/modals/bot/staking_bot_settings";
import { TradeBotSettings } from "components/modals/bot/trade_bot_settings";
import React from "react";
import { Settings as SettingsIcon } from "design/icons";
import Flex from "stiches/components/flex/flex";
interface settingsProps {}

export const Settings = ({}) => {
  const [showTradingSettings, tradingHandlers] = useDisclosure(false);
  const [showStakingSettings, stakingHandlers] = useDisclosure(false);

  return (
    <>
      <Flex
        fullWidth
        justify={"center"}
        align="center"
        gap={5}
        className="mt-8"
      >
        <Button leftIcon={<SettingsIcon />} onClick={tradingHandlers.open}>
          Trading Bot
        </Button>
        <Button leftIcon={<SettingsIcon />} onClick={stakingHandlers.open}>
          Staking Bot
        </Button>
        <StakingBotSettings
          opened={showStakingSettings}
          onClose={stakingHandlers.close}
        />
        <TradeBotSettings
          opened={showTradingSettings}
          onClose={tradingHandlers.close}
        />
      </Flex>
    </>
  );
};
