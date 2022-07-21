//
import { Spot } from "@binance/connector";
import moment from "moment";
import type { BinanceData } from "../../../common/types/interfaces";
import logToFile from "../utils/log";

const apiKey =
 process.env['BINANCE_API_KEY'] 
const apiSecret =
process.env['BINANCE_API_SECRET'] ;

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
        await logToFile("errors", "error from binance- waiting");

        await new Promise((resolve) => setTimeout(resolve, 60000));

        if (setting1 === 0 && !setting2)
          return (await client[name](setting1, { ...params })).data;

        if (setting1 && setting2)
          return (await client[name](setting1, setting2, { ...params })).data;
        return (await client[name](params)).data;
      } catch (error) {
        await logToFile(
          "errors",
          `error while making request ${name}, ${params}`
        );

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
    coinDepositHistory: [],
    coinWithdrawalHistory: [],
    liquidityHistory: [],
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

const getAvgPrice = async (name: string) => {
  return (await client.avgPrice(name)).data.price;
};

const getAllOrders = async (key: string) => {
  return (await client.allOrders(key + "USDT")).data;
};

const getStakingPositions = async (key: string) => {
  return (await client.stakingProductList("STAKING", { asset: key })).data;
};
const getSavingPositions = async () => {
  return (
    await client.savingsFlexibleProducts({
      status: "ALL",
      featured: "ALL",
    })
  ).data;
};

const purchaseStaking = async (
  type: string,
  product: string,
  amount: number
) => {
  const res = await client
    .stakingPurchaseProduct(type, product, amount)
    .catch(() => {
      console.log(
        `error when purchasing staking: ${product} for amount ${amount}`
      );
    });
  return res;
};
const purchaseSaving = async (productID: string, amount: number) => {
  client.savingsPurchaseFlexibleProduct(productID, amount).catch(() => {
    console.log(
      `error when purchasing saving: ${productID} for amount ${amount}`
    );
  });
};
const redeemSaving = async (productID: string, amount: number) => {
  client.savingsFlexibleRedeem(productID, amount, "FAST").catch(() => {
    console.log(
      `error when redeeming saving: ${productID} for amount ${amount}`
    );
  });
};
export {
  getBinanceData,
  getAvgPrice,
  getAllOrders,
  getStakingPositions,
  purchaseStaking,
  getSavingPositions,
  purchaseSaving,
  redeemSaving,
};
