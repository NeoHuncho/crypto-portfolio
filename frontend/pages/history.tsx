import { ActionIcon, Table, Tabs, Text } from "@mantine/core";
import CenteredLoader from "components/loader/centered";
import { userMetaRef } from "data/firebase";
import { useHistoryStore } from "data/history_store";
import { onValue } from "firebase/database";
import { format, fromUnixTime } from "date-fns";
import React, { useEffect, useState } from "react";
import Flex from "stiches/components/flex/flex";
import { Pencil } from "design/icons";
import AddRemoveDeposit from "components/modals/history/add_remove_deposit";
import { useMediaQuery } from "@mantine/hooks";
interface HistoryProps {}

const History: React.FC<HistoryProps> = ({}) => {
  const [activeTab, setActiveTab] = useState<string | null>();
  const [data, setData] = useState<any>(null);
  const [canEdit, setCanEdit] = useState<boolean | undefined>(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const isMobile = useMediaQuery("(max-width: 500px)");
  console.log("rerender");
  const HistoryStore = useHistoryStore();
  useEffect(() => {
    if (activeTab) {
      setCanEdit(HistoryStore.tabs.find((tab) => tab.id === activeTab)?.edit);
      onValue(userMetaRef(activeTab), (snapshot) => {
        setData(snapshot.val());
      });
    }
  }, [activeTab]);
  if (!HistoryStore.tabs) return <CenteredLoader />;
  return (
    <Flex fullWidth direction="column" align="center">
      <Tabs
        variant="pills"
        value={activeTab}
        onTabChange={setActiveTab}
        className="mb-5 mt-7"
        styles={{ tabsList: { justifyContent: "center" } }}
        // styles={{ tabsList:{isMobile?{width:"100%"}:{width:"50%"}} }}
      >
        <Tabs.List>
          {HistoryStore.tabs.map((item) => {
            const Icon = item.icon;

            return (
              <Tabs.Tab
                key={item.id}
                value={item.id}
                icon={Icon ? <Icon /> : null}
              >
                {item.title}
              </Tabs.Tab>
            );
          })}
        </Tabs.List>
        {activeTab && data ? (
          <Tabs.Panel value={activeTab} className="mt-8">
            <Flex direction="column" align="center" gap={5}>
              {data.map((item: any, index: number) => (
                <Item
                  setEditingItem={setEditingItem}
                  editBtn={canEdit}
                  key={index}
                  data={item}
                  index={index}
                />
              ))}
            </Flex>
          </Tabs.Panel>
        ) : activeTab ? (
          <CenteredLoader />
        ) : (
          <></>
        )}
      </Tabs>
      {activeTab && (
        <AddRemoveDeposit
          item={editingItem}
          opened={!!editingItem}
          type={activeTab}
          onClose={() => setEditingItem(null)}
        />
      )}
    </Flex>
  );
};
const Item = ({ data, index, editBtn, setEditingItem }: any) => {
  return (
    <Flex direction="column" align="center" gap={1}>
      <Flex>
        {data.timeUnix && (
          <Text size="xl" className="font-bold mb-1">
            {`${index + 1}. ${format(
              fromUnixTime(data.timeUnix),
              "dd-MM-yyyy' 'HH:mm"
            )}`}
          </Text>
        )}
        {editBtn && (
          <ActionIcon onClick={() => setEditingItem(data)}>
            <Pencil />
          </ActionIcon>
        )}
      </Flex>
      {data.amount && data.obtainAmount ? (
        <>
          <Text>{`amount: ${
            data.obtainAmount
              ? data.obtainAmount.toFixed(2)
              : data.amount.toFixed(2)
          } ${data.coin ? data.coin : data.cryptoCurrency}`}</Text>
          <Text>{`price: ${data.amount.toFixed(2)} ${data.fiatCurrency}`}</Text>
        </>
      ) : (
        data.amount && (
          <Text>{`amount: ${data.amount.toFixed(2)} ${
            data.fiatCurrency ? data.fiatCurrency : data.coin ? data.coin : ""
          }`}</Text>
        )
      )}

      {data.value && (
        <Text>{`value: ${data.value.toFixed(2)}${
          data.fiatCurrency ? data.fiatCurrency : " USDT at date"
        } `}</Text>
      )}
    </Flex>
  );
};

export default History;
