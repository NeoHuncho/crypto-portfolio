import { Modal, Switch } from "@mantine/core";
import { toggle0Balance, useUIStore } from "data/ui_store";
import React, { useState } from "react";
import Flex from "stiches/components/flex/flex";

interface FiltersProps {
  opened: boolean;
  onClose: () => void;
}

export const Filters: React.FC<FiltersProps> = ({ opened, onClose }) => {
  const [hide0Balance, setHide0Balance] = useState(true);
  return (
    <Modal opened={opened} onClose={onClose}>
      <Flex fullWidth align={"center"} className="ml-3">
        <Switch
          size="md"
          checked={hide0Balance}
          onChange={() => {
            toggle0Balance();
            setHide0Balance(!hide0Balance);
          }}
          label="Hide coins with empty balance"
        />
      </Flex>
    </Modal>
  );
};
