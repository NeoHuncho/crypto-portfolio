import { Modal, Switch } from "@mantine/core";
import { UpdateUserSpent } from "actions/api";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import Flex from "stiches/components/flex/flex";

interface Props {
  opened: boolean;
  onClose: () => void;
  item: any;
  type: string;
}

const AddRemoveDeposit = ({ opened, onClose, item, type }: Props) => {
  const auth = getAuth();

  const [isRemoved, setIsRemoved] = useState(!!item?.isRemoved);
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
          styles={{ root: { width: "100%" } }}
          size="md"
          checked={isRemoved}
          onChange={async () => {
            setIsRemoved(!isRemoved);
            auth.currentUser?.uid &&
              (await UpdateUserSpent({
                amount: item.amount,
                type: type,
                isRemoved: !isRemoved,
                id: item.id,
                userID: auth.currentUser?.uid,
              }));
          }}
          label="Remove from total Spent"
        />
      </Flex>
    </Modal>
  );
};

export default AddRemoveDeposit;
