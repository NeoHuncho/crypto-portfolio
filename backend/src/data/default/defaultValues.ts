import type { Coin, Data } from "../../../../common/types/interfaces";
import type { IMarginPosition, IMarginStats } from "../../interfaces";
class AmountValue {
  amount = 0;
  value = 0;
}
class daysTo {
  last = 0;
  next = 0;
}
class defaultCoin implements Coin {
  allTimeSellPrice = 0;
  avgBuyPrice = 0;
  currentCoinValue = 0;
  profitLoss = 0;
  priceDiff = "0";
  currentValueDiff = 0;
  daysToStaking = new daysTo();
  remainingStakingAmount = 0;
  amountValue = new AmountValue();
  bought = { amount: 0, cash: 0 };
  sold = { amount: 0, cash: 0 };
  spent = 0;
  spot = new AmountValue();
  staked = new AmountValue();
  savings = new AmountValue();
  stakedInterestAccumulated = new AmountValue();
  interest = new AmountValue();
  dailyInterest = new AmountValue();
}

const defaultMarginPosition: IMarginPosition = {
  prices: [],
  change: 0.0,
  toBeBought: false,
  toBeSold: false,
  investmentStart: 0,
  investmentGain: 0.0,
  maxGain: 0.0,
};
const defaultData: Data = {
  meta: {
    toAddToInterestTotal: [],
    coinBuyBalance: {},
    coinSellBalance: {},
    coinDepositHistory: [],
    coinWithdrawalHistory: [],
    depositHistory: [],
    tradeIDs: {},
    stakingHistory: {},
    directHistory: [],
    cardPayments: [],
    liquidityHistory: [],
    IDs: {
      stakingIDs: [],
      redemptionIDs: [],
      interestIDs: [],
      depositIDs: [],
      directIDs: [],
      coinDepositIDs: [],
      coinWithdrawalIDs: [],
      liquidityIDs: [],
      cardPaymentIDs: [],
    },
  },
  general: {
    coinsData: {
      spend: 0,
      taxes: 0,
      interestHistoryValue: 0,
      spotValue: 0,
      stakedValue: 0,
      percentageToNotStake: 25,
      value: 0,
    },
    currency: "EUR",
    passedFirstRun: false,
    currencySymbol: "€",
    lastRunTime: 0,
  },
  coins: {},
};

const defaultMarginStats: IMarginStats = {
  profitLoss: 0,
  totalCompleted: 0,
  totalProfited: 0,
  totalLoosed: 0,
  dailyProfitLoss: {},
};
export { defaultCoin, defaultData, defaultMarginPosition, defaultMarginStats };
