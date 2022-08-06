import { General } from "@common/types/interfaces";
import { Button, Card } from "@mantine/core";
import { usePortfolioStore } from "data/portfolio_store";
import React from "react";
import moment from "moment";
import { defaultButtonProps } from "config/mantine";
export default function PortfolioHeader() {
  const general: General | null = usePortfolioStore((state) => state.general);
  if (!general) return <></>;
  const profitLoss = parseFloat(
    (general.coinsData.value - general.coinsData.spend).toFixed(2)
  );
  console.log(moment(general.lastRunTime));
  return (
    <header>
      <div className="bg-background p-5 mb-10 flex flex-row justify-between items-start">
        <Card className="flex-col flex gap-2" style={{ width: 150 }}>
          <Button size={"sm"} {...defaultButtonProps}>
            Filters
          </Button>
          <Button size={"sm"} {...defaultButtonProps}>
            Layout
          </Button>
        </Card>

        <Card>
          <div className="flex flex-row justify-center items-start">
            <div className="flex justify-center items-center flex-col mx-10">
              <p className="text-gray-200 text-xl font-bold">Current Value</p>
              <p className="text-gray-200 text-3xl font-bold">
                {general.coinsData.value.toFixed(2) + general.currencySymbol}
              </p>
            </div>
            <div className="flex justify-center items-center flex-col mx-10">
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
            <div className="flex justify-center items-center flex-col mx-10">
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
        <Card>
          <div className="flex-col flex items-center justify-center">
            <p className="text-gray-200 -mt-2 text-xl font-bold">Last Update</p>
            <p className="text-gray-200 text-xs font-bold mb-3">
              {moment.unix(general.lastRunTime).format("lll")}
            </p>
            <Button size="xs" {...defaultButtonProps}>
              Update Portfolio
            </Button>
          </div>
        </Card>
      </div>
    </header>
  );
}
