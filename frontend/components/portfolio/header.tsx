import { General } from "@common/types/interfaces";
import { Button, Card } from "@mantine/core";
import { usePortfolioStore } from "data/portfolio_store";
import React from "react";
import moment from "moment";
import { defaultButtonProps } from "config/mantine";
import { isMobile } from "react-device-detect";
import Flex from "stiches/components/flex/flex";
import { useDisclosure } from "@mantine/hooks";
import { Filters } from "components/modals/portfolio/filters";
import { Layout } from "components/modals/portfolio/layout";
export default function PortfolioHeader() {
  const general: General | null = usePortfolioStore((state) => state.general);
  const [showFilters, filterControls] = useDisclosure(false);
  const [showLayout, layoutControls] = useDisclosure(false);
  if (!general) return <></>;
  const profitLoss = parseFloat(
    (general.coinsData.value - general.coinsData.spend).toFixed(2)
  );
  return (
    <header>
      {<Filters opened={showFilters} onClose={filterControls.toggle} />}
      {<Layout opened={showLayout} onClose={layoutControls.toggle} />}

      <div className="xs:{flex flex-col}  bg-background p-5 mb-10 sm:flex flex-row justify-between items-start xs:mb-3p">
        {!isMobile && (
          <Buttons
            filterControls={filterControls}
            layoutControls={layoutControls}
          />
        )}

        <Card>
          <div className=" sm:flex flex-row  justify-center items-start xs:{flex flex-col}">
            <div className=" flex justify-center items-center flex-col mx-10 xs:mt-3">
              <p className="text-gray-200 text-xl font-bold">Current Value</p>
              <p className="text-gray-200 text-3xl font-bold">
                {general.coinsData.value.toFixed(2) + general.currencySymbol}
              </p>
            </div>
            <div className="flex justify-center items-center flex-col mx-10 xs:mt-3">
              <p className=" text-xl font-bold text-gray-200  ">
                Total {profitLoss > 0 ? "Profit" : "Loss"}
              </p>
              <p
                className={
                  " text-3xl font-bold " +
                  (profitLoss > 0 ? "text-green-600" : "text-red-600")
                }
              >
                {profitLoss + general.currencySymbol}
              </p>
            </div>
            <div className="flex justify-center items-center flex-col mx-10 xs:mt-3">
              <p className="text-gray-200 text-xl font-bold">Total Spend</p>
              <p className="text-gray-200 text-3xl font-bold">
                {general.coinsData.spend.toFixed(2) + general.currencySymbol}
              </p>
              <p className="text-gray-200 text-xs">
                (Including Taxes:
                {general.coinsData.taxes.toFixed(2) + general.currencySymbol})
              </p>
            </div>
            {isMobile && (
              <div className="mt-10 flex-col flex items-center justify-center">
                <Flex gap={2} align={"center"} className="mb-3">
                  <p className="text-gray-200 text-sm font-bold">
                    Last Update:
                  </p>
                  <p className="text-gray-200  text-sm font-bold ">
                    {moment.unix(general.lastRunTime).format("lll")}
                  </p>
                </Flex>
                <Button size="xs">Update Portfolio</Button>
              </div>
            )}
          </div>
        </Card>
        {!isMobile && (
          <Card>
            <div className="flex-col flex items-center justify-center">
              <p className="text-gray-200 -mt-2 text-xl font-bold">
                Last Update
              </p>
              <p className="text-gray-200 text-xs font-bold mb-3">
                {moment.unix(general.lastRunTime).format("lll")}
              </p>
              <Button size="xs">Update Portfolio</Button>
            </div>
          </Card>
        )}
        {isMobile && (
          <Buttons
            filterControls={filterControls}
            layoutControls={layoutControls}
          />
        )}
      </div>
    </header>
  );
}

const Buttons = ({ filterControls, layoutControls }: any) => {
  return (
    <Card
      className=" flex-col flex !important xs:flex-row xs:justify-between xs:mt-6"
      style={{ width: isMobile ? "100%" : 150 }}
    >
      <Button
        onClick={filterControls.toggle}
        style={{
          width: isMobile ? "40%" : "100%",
          marginBottom: isMobile ? 0 : 10,
        }}
        size={"sm"}
      >
        Filters
      </Button>
      <Button
        onClick={layoutControls.toggle}
        style={{ width: isMobile ? "40%" : "100%" }}
        size={"sm"}
      >
        Layout
      </Button>
    </Card>
  );
};
