import { General } from "@common/types/interfaces";
import { Button, Card } from "@mantine/core";
import { usePortfolioStore } from "data/portfolio_store";
import React from "react";
import moment from "moment";
import { defaultButtonProps } from "config/mantine";
import { isMobile } from "react-device-detect";
export default function PortfolioHeader() {
  const general: General | null = usePortfolioStore((state) => state.general);
  if (!general) return <></>;
  const profitLoss = parseFloat(
    (general.coinsData.value - general.coinsData.spend).toFixed(2)
  );
  return (
    <header>
      <div className="xs:{flex flex-col}  bg-background p-5 mb-10 sm:flex flex-row justify-between items-start">
        {!isMobile && (
          <Card className="flex-col flex" style={{ width: 150 }}>
            <Button style={{ width: "100%", marginBottom: 10 }} size={"sm"}>
              Filters
            </Button>
            <Button style={{ width: "100%" }} size={"sm"}>
              Layout
            </Button>
          </Card>
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
      </div>
    </header>
  );
}
