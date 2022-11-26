import { Spot } from "@binance/connector";
import moment from "moment";
import type { BinanceData } from "../../../common/types/interfaces";
import { params } from "@serverless/cloud";
import dotenv from "dotenv";
import type { IMarginPosition } from "../interfaces";
import { defaultMarginStats } from "../data/default/defaultValues";
dotenv.config({ path: "../../.env" });
const apiKey = params["BINANCE_API_KEY"] || process.env["BINANCE_API_KEY"];
const apiSecret =
  params["BINANCE_API_SECRET"] || process.env["BINANCE_API_SECRET"];
let client = new Spot(apiKey, apiSecret);
let date = moment("2021-08-01");

type Props = {
  passedFirstRun: boolean;
};

const flattenAndFilter = (data: any, ids: number[] | undefined) => {
  if (!ids) return data;
  return [].concat(...data).filter((item: any) => {
    if (!item) return false;

    const id = item.positionId
      ? item.positionId
      : item.txId
      ? item.txId
      : item.operationId
      ? item.operationId
      : item.orderNo
      ? item.orderNo
      : item.id;
    if (ids.includes(id)) return false;
    ids.push(id);
    return true;
  });
};
const getBinanceData = async ({ passedFirstRun }: Props) => {
  const makeRequest = async (
    name: string,
    params: any,
    setting1?: string | number,
    setting2?: string | number
  ) => {
    try {
      if (setting1 !== "undefined" && !setting2) {
        return (await client[name](setting1, { ...params })).data;
      }

      if (setting1 && setting2)
        return (await client[name](setting1, setting2, { ...params })).data;
      return (await client[name](params)).data;
    } catch (error) {
      try {
        console.log("errors", "error from binance- waiting");

        await new Promise((resolve) => setTimeout(resolve, 60000));

        if (setting1 === 0 && !setting2)
          return (await client[name](setting1, { ...params })).data;

        if (setting1 && setting2)
          return (await client[name](setting1, setting2, { ...params })).data;
        return (await client[name](params)).data;
      } catch (error) {
        console.log("errors", `error while making request ${name}, ${params}`);

        return;
      }
    }
  };

  const data: BinanceData = {
    stakingSubscriptionHistory: [],
    stakingRedemptionHistory: [],
    stakingInterestHistory: [],
    depositHistory: [],
    directHistory: [],
    stakingPositions: [],
    coinDepositHistory: [],
    coinWithdrawalHistory: [],
    liquidityHistory: [],
    savingProducts: {},
    IDs: {
      subscriptionIDs: [],
      redemptionIDs: [],
      interestIDs: [],
      depositIDs: [],
      directIDs: [],
      coinDepositIDs: [],
      coinWithdrawalIDs: [],
      liquidityIDs: [],
    },
    spotAccount: null,
  };

  if (!passedFirstRun) {
    while (moment(date).add(89, "days") < moment().add(4, "months")) {
      if (moment(date).unix() < moment().unix()) {
        const requestSettings =
          moment(date).add(89, "days").unix() < moment().unix()
            ? {
                startTime: parseInt(moment(date).unix() + "000"),
                endTime: parseInt(moment(date).add(89, "days").unix() + "000"),
                size: 100,
              }
            : {
                startTime: parseInt(moment(date).unix() + "000"),
                endTime: parseInt(moment().unix() + "000"),
                size: 100,
              };

        const requestsBeginEnd =
          moment(date).add(89, "days").unix() < moment().unix()
            ? {
                beginTime: parseInt(moment(date).unix() + "000"),
                endTime: parseInt(moment(date).add(89, "days").unix() + "000"),
                size: 100,
              }
            : {
                beginTime: parseInt(moment(date).unix() + "000"),
                endTime: parseInt(moment().unix() + "000"),
                size: 100,
              };

        data.directHistory.push(
          (await makeRequest("paymentHistory", requestsBeginEnd, 0))?.data
        );
        data.stakingSubscriptionHistory.push(
          await makeRequest(
            "stakingHistory",
            requestSettings,
            "STAKING",
            "SUBSCRIPTION"
          )
        );
        data.stakingRedemptionHistory.push(
          await makeRequest(
            "stakingHistory",
            requestSettings,
            "STAKING",
            "REDEMPTION"
          )
        );
        data.stakingInterestHistory.push(
          await makeRequest(
            "stakingHistory",
            requestSettings,
            "STAKING",
            "INTEREST"
          )
        );
        data.depositHistory.push(
          (await makeRequest("depositWithdrawalHistory", requestsBeginEnd, 0))
            ?.data
        );

        data.coinDepositHistory.push(
          await makeRequest("depositHistory", requestSettings)
        );
        data.coinWithdrawalHistory.push(
          await makeRequest("withdrawHistory", requestSettings)
        );
        data.liquidityHistory.push(
          await makeRequest("bswapLiquidityOperationRecord", requestSettings)
        );
      }
      date.add(89, "days");
    }
  } else {
    data.stakingSubscriptionHistory.push(
      (await client.stakingHistory("STAKING", "SUBSCRIPTION", { size: 100 }))
        .data
    );
    data.stakingRedemptionHistory.push(
      (await client.stakingHistory("STAKING", "REDEMPTION", { size: 100 })).data
    );
    data.stakingInterestHistory.push(
      (await client.stakingHistory("STAKING", "INTEREST", { size: 100 })).data
    );
    data.depositHistory.push(
      (await client.depositWithdrawalHistory(0)).data.data
    );
    data.directHistory.push((await client.paymentHistory(0)).data.data);
    data.coinDepositHistory.push((await client.depositHistory(0)).data);
    data.coinWithdrawalHistory.push((await client.withdrawHistory()).data);
    data.liquidityHistory.push(
      (await client.bswapLiquidityOperationRecord()).data
    );
  }
  data.spotAccount = (await client.account()).data;
  data.spotAccount.balances = data.spotAccount.balances.filter(
    (item: any) => parseFloat(item.free) > 0
  );
  let index = 1;
  while (true) {
    const savingData = (
      await client.savingsFlexibleProducts({
        status: "ALL",
        featured: "ALL",
        size: 10,
        current: index,
      })
    ).data;
    if (savingData.length === 0) break;
    for (const index in savingData) {
      data.savingProducts[savingData[index].asset]
        ? data.savingProducts[savingData[index].asset].push(savingData[index])
        : (data.savingProducts[savingData[index].asset] = [savingData[index]]);
    }
    index++;
  }
  data.stakingPositions = await getStakingPositions("STAKING");

  data.stakingSubscriptionHistory = flattenAndFilter(
    data.stakingSubscriptionHistory,
    data.IDs["subscriptionIDs"]
  );
  data.stakingRedemptionHistory = flattenAndFilter(
    data.stakingRedemptionHistory,
    data.IDs["redemptionIDs"]
  );
  data.stakingInterestHistory = flattenAndFilter(
    data.stakingInterestHistory,
    data.IDs["interestIDs"]
  );
  data.depositHistory = flattenAndFilter(
    data.depositHistory.filter((item: any) => item),
    data.IDs["depositIDs"]
  );
  data.directHistory = flattenAndFilter(
    data.directHistory,
    data.IDs["directIDs"]
  );
  data.coinDepositHistory = flattenAndFilter(
    data.coinDepositHistory,
    data.IDs["coinDepositIDs"]
  );
  data.coinWithdrawalHistory = flattenAndFilter(
    data.coinWithdrawalHistory,
    data.IDs["coinWithdrawalIDs"]
  );
  data.liquidityHistory = flattenAndFilter(
    data.liquidityHistory,
    data.IDs["liquidityIDs"]
  );

  return data;
};

const getAvgPrice = async (name: string) =>
  (await client.avgPrice(name))?.data?.price;
const getAvgPrices = async (coins: string[]) => {
  const promises = coins.map((coin) => {
    return new Promise(async (resolve, reject) => {
      try {
        const price = await getAvgPrice(coin + "USDT");
        resolve({ [coin]: parseFloat(price) });
      } catch (error) {
        console.log("error getting price for coin", coin);
        reject(error);
      }
    });
  });
  const promiseArray = await Promise.all(promises);

  return Object.assign({}, ...promiseArray);
};

const getAllOrders = async (key: string) => {
  return (await client.allOrders(key + "USDT")).data;
};

const getStakingList = async (key: string) => {
  return (await client.stakingProductList("STAKING", { asset: key })).data;
};
const getStakingPositions = async (type: string) => {
  let current: number | boolean = 1;
  let data = [];
  while (current) {
    const res = (
      await client.stakingProductPosition(type, { size: 100, current: current })
    ).data;

    if (!res?.length) current = false;
    else {
      data.push(...res);
      current++;
    }
  }
  return data;
};
const getSavingPositions = async () => {
  return (
    await client.savingsFlexibleProducts({
      status: "ALL",
      featured: "ALL",
      size: 100,
    })
  ).data;
};
const getCoinSavingPosition = async (coin: string) =>
  (await client.savingsFlexibleProductPosition(coin)).data;

const purchaseStaking = async (
  type: string,
  product: string,
  amount: number
) => {
  const res = await client
    .stakingPurchaseProduct(type, product, amount)
    .then(async (res: any) => {
      console.log(
        "general",
        `${product} (staking) purchased for amount  ${amount}.`
      );
      return res;
    })
    .catch((err: any) => {
      console.log(
        `error when purchasing staking: ${product} for amount ${amount} ${err}`
      );
      return err;
    });

  return res;
};
const purchaseSaving = async (productID: string, amount: number) => {
  await client
    .savingsPurchaseFlexibleProduct(productID, amount)
    .then(async () => {
      console.log(
        "general",
        `${productID} (saving) purchased for amount  ${amount}.`
      );
    })
    .catch(() => {
      console.log(
        `error when purchasing saving: ${productID} for amount ${amount}`
      );
    });
};
const redeemSaving = async (productID: string, amount: number) => {
  await client
    .savingsFlexibleRedeem(productID, amount, "FAST")
    .then(async () => {
      console.log(
        "general",
        `${productID}(saving) redeemed for amount of ${amount}.`
      );
    })
    .catch(() => {
      console.log(
        `error when redeeming saving: ${productID} for amount ${amount}`
      );
    });
};

const borrowMargin = async (coin: string, margin: IMarginPosition) => {
  try {
    const maxAmount = (await client.marginMaxBorrowable(coin))?.data?.amount;
    await client.marginBorrow(coin, (maxAmount * 0.5).toFixed());
    const sellRes = await client.newMarginOrder(
      coin + "BUSD",
      "SELL",
      "MARKET",
      {
        quantity: (maxAmount * 0.5).toFixed(),
      }
    );
    let totalQty = 0;
    const value = sellRes.data.fills.reduce((acc: number, item: any) => {
      totalQty += parseFloat(item.qty);
      return acc + parseFloat(item.qty) * parseFloat(item.price);
    }, 0);
    const avgPrice = value / totalQty;
    margin.investmentStart = avgPrice;
    margin.totalBought = totalQty;
    margin.prices = [avgPrice];
    margin.change = 0;
    margin.toBeBought = false;
  } catch (error) {
    console.log("error when trying to buy margin for " + coin, error);
  }
};
const repayMargin = async (coin: string, margin: IMarginPosition) => {
  try {
    const resBuy = await client.newMarginOrder(coin + "BUSD", "BUY", "MARKET", {
      quantity: margin.totalBought,
    });
    await client.marginRepay(coin, margin.totalBought);
    let totalQty = 0;
    const value = resBuy.data.fills.reduce((acc: number, item: any) => {
      totalQty += parseFloat(item.qty);
      return acc + parseFloat(item.qty) * parseFloat(item.price);
    }, 0);
    const avgPrice = value / totalQty;
    const profitLoss =
      margin.investmentStart * margin.totalBought -
      avgPrice * margin.totalBought;

    defaultMarginStats.profitLoss += profitLoss;
    defaultMarginStats.totalCompleted++;
    if (profitLoss > 0) defaultMarginStats.totalProfited++;
    else defaultMarginStats.totalLoosed++;
  } catch (error) {
    console.log("error when trying to repay margin for " + coin, error);
  }
};

export {
  getBinanceData,
  getAvgPrice,
  getAllOrders,
  getStakingList,
  getStakingPositions,
  purchaseStaking,
  getSavingPositions,
  getCoinSavingPosition,
  purchaseSaving,
  redeemSaving,
  getAvgPrices,
  borrowMargin,
  repayMargin,
};
