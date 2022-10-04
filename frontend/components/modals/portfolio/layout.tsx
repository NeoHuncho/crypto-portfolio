import { Modal, Switch } from "@mantine/core";
import { toggle0Balance, useUIStore } from "data/ui_store";
import React, { useState } from "react";
import Flex from "stiches/components/flex/flex";

interface LayoutProps {
  opened: boolean;
  onClose: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ opened, onClose }) => {
  const uiStore = useUIStore();
  return (
    <Modal opened={opened} onClose={onClose}>
      <Flex
        direction={"column"}
        gap={4}
        fullWidth
        align={"center"}
        className="ml-3"
      >
        <Switch
          size="md"
          checked={uiStore.layout.syncCarouselMoves}
          onChange={() => {
            uiStore.actions.toggleCarouselMoves();
          }}
          label="Sync Carousel slide movements"
          styles={{ root: { width: "100%" } }}
        />
        <Switch
          size="md"
          checked={uiStore.layout.syncPriceDayChanges}
          onChange={() => {
            uiStore.actions.togglePriceDayChanges();
          }}
          label="Sync Price Evolution date changes"
          styles={{ root: { width: "100%" } }}
        />
      </Flex>
    </Modal>
  );
};
