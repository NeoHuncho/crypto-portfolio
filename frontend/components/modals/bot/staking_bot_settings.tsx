import React from "react";

import { useDocument } from "swr-firestore-v9";
import { Modal, Input, Switch, NumberInput } from "@mantine/core";
import { Data } from "@common/types/interfaces";
import { useBotStore } from "data/bot_store";
import Flex from "stiches/components/flex/flex";
import { useForm } from "@mantine/form";
import { updateUserBot } from "actions/api";
import { getAuth } from "firebase/auth";
interface Props {
  opened: boolean;
  onClose: () => void;
}

export default function StakingBotSettings({ opened, onClose }: Props) {
  const { settings } = useBotStore();
  const auth = getAuth();
  const userUID = auth.currentUser?.uid;
  const [enabled, setEnabled] = React.useState(!!settings?.stakingBot.enabled);
  const [min, setMin] = React.useState(
    settings?.stakingBot.percentageToNotStake || 100
  );
  return (
    <Modal
      size={"lg"}
      opened={opened}
      onClose={onClose}
      title="Staking Bot Settings"
    >
      <Flex fullWidth justify={"space-around"} align="center">
        <Switch
          label="enabled"
          required
          checked={enabled}
          onChange={(event) => {
            setEnabled(event.currentTarget.checked);
            updateUserBot({
              userID: userUID || "",
              path: "settings/stakingBot/enabled",
              value: event.currentTarget.checked,
            });
          }}
        />
        <Input.Wrapper label="Percentage to not stake" required>
          <NumberInput
            size="xs"
            placeholder="value"
            rightSection={<p className="text-l font-bold">%</p>}
            type="number"
            min={0}
            max={100}
            className="mt-2"
            defaultValue={min}
            onChange={(event: any) => {
              setMin(event.currentTarget.value);
              updateUserBot({
                userID: userUID || "",
                path: "settings/stakingBot/percentageToNotStake",
                value: event.currentTarget.value,
              });
            }}
          />
        </Input.Wrapper>
      </Flex>
    </Modal>
  );
}
