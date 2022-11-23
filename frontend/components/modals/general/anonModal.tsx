import { Modal, Switch, Text } from "@mantine/core";
import { toggle0Balance, useUIStore } from "data/ui_store";
import React, { useState } from "react";
import Flex from "stiches/components/flex/flex";

interface AnonProps {
  opened: boolean;
  onClose: () => void;
}

export const AnonModal: React.FC<AnonProps> = ({ opened, onClose }) => {
  return (
    <Modal title={'Welcome fellow anonymous user 🕵️'} opened={opened} onClose={onClose}>
      <Text>This portfolio consists of low carbon emissions coins (C02 per transaction).</Text>
    </Modal>
  );
};
