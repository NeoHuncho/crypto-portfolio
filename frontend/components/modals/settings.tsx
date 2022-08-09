import React from "react";

import { useDocument } from "swr-firestore-v9";
import { Modal, Input } from "@mantine/core";
import { Data } from "@common/types/interfaces";
interface Props {
  showSettings: boolean;
  setShowSettings: (showSettings: boolean) => void;
}

export default function Settings({ showSettings, setShowSettings }: Props) {
  const { data, update, error } = useDocument<Data>(`users/william`, {
    listen: true,
  });

  if (!data?.general) return <p>Loading...</p>;
  return (
    <Modal
      opened={showSettings}
      onClose={() => setShowSettings(false)}
      title="Settings"
    >
      <div className="flex justify-center items-center ">
        <p className="mr-4 text-xl font-bold">% wanted to not be staked:</p>
        <Input
          size="xs"
          placeholder="value"
          rightSection={<p className="text-l font-bold">%</p>}
          type="number"
          min={0}
          max={100}
          defaultValue={data.general.coinsData.percentageToNotStake}
          onChange={(e: any) => {
            update({
              general: {
                ...data.general,
                coinsData: {
                  ...data.general?.coinsData,
                  percentageToNotStake: e.target.value,
                },
              },
            });
          }}
        />
      </div>
    </Modal>
  );
}
