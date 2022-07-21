import type { Database } from "@firebase/database-types";
import moment from "moment";
import { getAvgPrice } from "../data/dataBinance";
import { getHistoricPriceUSD } from "../data/dataGecko";

import type { Data } from "../../../common/types/interfaces";
import getCurrencySymbol from "../utils/getCurrencySymbol";
import XLSX from "xlsx";
import logToFile from "../utils/log";

const processAccountHistory = async (data: Data, db: Database) => {
  const general = data["general"];
  const processDepositHistory = async (depositHistory: any) => {
    if (!depositHistory || depositHistory.length === 0) return;
    depositHistory.map((item: any) => {
      if (
        item.status === "Successful" &&
        !data["meta"].IDs.depositIDs.includes(item.orderNo)
      ) {
        data["meta"].IDs.depositIDs.push(item.orderNo);
        data["meta"].depositHistory.push({
          fiatCurrency: item.fiatCurrency,
          amount: parseFloat(item.indicatedAmount),
          timeUnix: moment(item.updateTime).unix(),
          totalValue: {
            valuePast: parseFloat(item.indicatedAmount),
            valuePresent: parseFloat(item.indicatedAmount),
          },
          id: item.orderNo,
        });
        if (!data["general"].currency)
          data["general"].currency = item.fiatCurrency;
        data["general"].currencySymbol = getCurrencySymbol(general.currency);
        data["general"].coinsData.spend += parseFloat(item.indicatedAmount);
        data["general"].coinsData.taxes += parseFloat(item.totalFee);
      }
    });
  };

  const processDirectBuyHistory = (directHistory: any) => {
    const usdtBuys: [number, number][] = [];
    if (!directHistory || directHistory[0] === undefined) return;
    directHistory.map((item: any) => {
      if (
        item.status === "Completed" &&
        !data["meta"].IDs.directIDs.includes(item.orderNo)
      ) {
        data["meta"].IDs.directIDs.push(item.orderNo);
        data["meta"].directHistory.push({
          fiatCurrency: item.fiatCurrency,
          amount: parseFloat(item.sourceAmount),
          totalFee: parseFloat(item.totalFee),
          timeUnix: moment(item.updateTime).unix(),
          id: item.orderNo,
          cryptoCurrency: item.cryptoCurrency,
          obtainAmount: parseFloat(item.obtainAmount),
        });
        if (!data["general"].currency)
          data["general"].currency = item.fiatCurrency;
        if (
          parseFloat(item.totalFee) / parseFloat(item.sourceAmount) >
          0.0199
        ) {
          data["general"].coinsData.spend += parseFloat(item.sourceAmount);
          data["general"].coinsData.taxes += parseFloat(item.totalFee);
        } else {
          data["general"].coinsData.taxes += parseFloat(item.totalFee);
        }
        if (item.cryptoCurrency === "USDT")
          usdtBuys.push([
            parseFloat(item.price),
            parseFloat(item.obtainAmount),
          ]);
      }
    });

    if (data["coins"]["USDT"]) {
      const [valueSumBuy, weightSumBuy] = usdtBuys.reduce(
        ([valueSum, weightSum], [value, weight]) => [
          valueSum + value * weight,
          weightSum + weight,
        ],
        [0, 0]
      );
      data["coins"]["USDT"].avgBuyPrice = valueSumBuy / weightSumBuy;
    }
  };
  const processCoinWithdrawalHistory = async (coinWithdrawalHistory: any) => {
    if (coinWithdrawalHistory)
      for (const index in coinWithdrawalHistory) {
        const item = coinWithdrawalHistory[index];
        if (
          item.confirmNo &&
          !data["meta"].IDs.coinWithdrawalIDs.includes(item.id)
        ) {
          data["meta"].IDs.coinWithdrawalIDs.push(item.id);
          const coin = data["coins"][item.coin];
          if (coin) {
            const avgPrice = coin.avgBuyPrice;
            data["meta"].coinWithdrawalHistory.push({
              coin: item.coin,
              amount: parseFloat(item.amount),
              value: parseFloat(item.amount) * avgPrice,
              timeUnix: moment(item.applyTime).unix(),
              id: item.id,
            });
            data["general"].coinsData.taxes += parseFloat(item.transactionFee);

            data["general"].coinsData.spend -=
              parseFloat(item.amount) * avgPrice;
            // TODO remove avg qty from buy meta
          } else {
            const historicPrice = await getHistoricPriceUSD({
              db: db,
              coin: item.coin.toLowerCase(),
              inputDate: item.applyTime,
            });

            if (historicPrice) {
              data["meta"].coinWithdrawalHistory.push({
                coin: item.coin,
                amount: parseFloat(item.amount),
                value: parseFloat(item.amount) * historicPrice,
                timeUnix: moment(item.applyTime).unix(),
                id: item.confirmNo,
              });
              data["general"].coinsData.taxes +=
                parseFloat(item.transactionFee) * historicPrice;

              data["general"].coinsData.spend -=
                parseFloat(item.amount) * historicPrice;
            } else
              await logToFile(
                "errors",
                `${item.coin} historic price not found`
              );
          }
        }
      }
  };
  const processCoinDepositHistory = async (coinDepositHistory: any) => {
    if (coinDepositHistory)
      for (const index in coinDepositHistory) {
        const item = coinDepositHistory[index];
        if (
          item.confirmTimes &&
          !data.meta.IDs.coinDepositIDs.includes(item.txId)
        ) {
          data.meta.IDs.coinDepositIDs.push(item.txId);
          const historicPrice = await getHistoricPriceUSD({
            db: db,
            coin: item.coin.toLowerCase(),
            inputDate: item.insertTime,
          });

          if (historicPrice) {
            data["general"].coinsData.spend +=
              parseFloat(item.amount) * historicPrice;
            data["meta"].coinDepositHistory.push({
              coin: item.coin,
              amount: parseFloat(item.amount),
              value: parseFloat(item.amount) * historicPrice,
              timeUnix: moment(item.insertTime).unix(),
              id: item.txId,
            });
          } else {
            const valueData = !item.coin.includes("USD")
              ? parseFloat(
                  await getAvgPrice(
                    item.coin.includes("LD")
                      ? item.coin.substring(2) + "USDT"
                      : item.coin + "USDT"
                  )
                )
              : 1;
            data["general"].coinsData.spend +=
              parseFloat(item.amount) * valueData;
            data["meta"].coinDepositHistory[item.txId] = {
              coin: item.coin,
              amount: parseFloat(item.amount),
              value: parseFloat(item.amount) * valueData,
              timeUnix: moment(item.insertTime).unix(),
              id: item.txId,
            };
          }
        }
      }
  };
  // const processLiquidityHistory = (liquidityHistory: any) => {
  //   liquidityHistory.map((item: any) => {
  //     if (
  //       item.status === 1 &&
  //       !data["meta"].IDs.liquidityIDs.includes(item.operationId)
  //     ) {
  //       data["meta"].IDs.liquidityIDs.push(item.operationId);
  //       let coinNameReg: RegExpExecArray | string | null = /(.+)\//g.exec(
  //         item.poolName
  //       );
  //       if (!coinNameReg) return;
  //       if (!coinNameReg[0]) return;
  //       let coinName = coinNameReg[0];
  //       const totalAmount =
  //         item.operation === "ADD"
  //           ? parseFloat(item.shareAmount)
  //           : -parseFloat(item.shareAmount);
  //       data["meta"].liquidityHistory.push({
  //         operation: item.operation,
  //         amount: totalAmount,
  //         timeUnix: moment(item.insertTime).unix(),
  //         id: item.operationId,
  //       });
  //       const coin = data["coins"][coinName];
  //       if (coin) {
  //         coin.totalStaked += totalAmount;
  //       } else {
  //         // totalStaked: totalAmount,
  //         data["coins"][coinName] = { ...defaultCoin };
  //         const coin = data["coins"][coinName];
  //         if (coin) coin.totalStaked = totalAmount;
  //       }
  //     }
  //   });
  // };

  const processCardPayments = (items: any) => {
    items.map((item: any) => {
      if (
        item["Paid OUT (EUR)"] &&
        !data["meta"].IDs.cardPaymentIDs.includes(item["Timestamp"])
      ) {
        data["meta"].IDs.cardPaymentIDs.push(item["Timestamp"]);
        data["general"].coinsData.spend -= parseFloat(item["Paid OUT (EUR)"]);
        data["meta"].cardPayments.push({
          amount: parseFloat(item["Paid OUT (EUR)"]),
          timeUnix: moment(item["Timestamp"]).unix(),
          id: item.Timestamp,
        });
      }
    });
  };
  if (!data.binance) return;
  processDepositHistory(data.binance.depositHistory);
  processDirectBuyHistory(data.binance.directHistory);
  await processCoinWithdrawalHistory(data.binance.coinWithdrawalHistory);
  await processCoinDepositHistory(data.binance.coinDepositHistory);
  // await processLiquidityHistory(data.binance.liquidityHistory);

  try {
    let buyWorkbook = XLSX.readFile("imports/CardHistoryFinal.xlsx");
    let buySheet: string[] = buyWorkbook.SheetNames;
    await processCardPayments(
      XLSX.utils.sheet_to_json(buyWorkbook.Sheets[buySheet[0]])
    );
  } catch (error) {
    await logToFile("errors", "cardHistory does not exist");
  }

  return data;
};

export default processAccountHistory;
