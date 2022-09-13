// import type { Database } from "@firebase/database-types";
// import type { FirebaseFirestore } from "@firebase/firestore-types";

export interface InnerStakingData {
  subscriptionHistory: any | [];
  redemptionHistory: any | [];
  interestHistory: any | [];
  stakingIDs: {
    subscriptionIDS: number[] | [];
    redemptionIDS: number[] | [];
    interestIDS: number[] | [];
  };
}

export interface AmountValue {
  amount: number;
  value: number;
}
export interface AmountCash {
  amount: number;
  cash: number;
}
export interface DaysTo {
  next: number;
  last: number;
}
export interface BinanceData {
  stakingSubscriptionHistory: any;
  stakingRedemptionHistory: any;
  stakingInterestHistory: any;
  depositHistory: any;
  directHistory: any;
  coinDepositHistory: any;
  coinWithdrawalHistory: any;
  liquidityHistory: any;
  IDs: {
    [key: string]: number[];
  };
  spotAccount: any;

  savingProducts: { [key: string]: any };
}
export interface ExchangeRates {
  [key: string]: number;
}

export interface FirebaseData {
  fireStore: any;
  db: any;
  test?: boolean | undefined;
}

export interface GeneralBotData {
  tradeBot: {
    buyPreferences: {
      best: number;
      better: number;
      good: number;
    };
    sellPreferences: {
      best: number;
      better: number;
      good: number;
    };
    enabled: boolean;
  };
  stakingBot: {
    enabled: boolean;
    percentageToNotStake: number;
  };
}
export interface BotData {
  general: GeneralBotData | null;
}
export interface Data {
  general: General | null;
  coins: Coins | null;
  meta: Meta | null;
  binance?: BinanceData | null;
}
export interface CoinsData {
  percentageToNotStake: number;
  spend: number;
  spotValue: number;
  stakedValue: number;
  interestHistoryValue: number;
  taxes: number;
  value: number;
}

export interface General {
  currency: string;
  currencySymbol: string;
  passedFirstRun: boolean;
  coinsData: CoinsData;
  lastRunTime: number;
}
export interface Coins {
  [key: string]: Coin;
}
export interface Coin {
  allTimeSellPrice: number;
  avgBuyPrice: number;
  currentCoinValue: number;
  currentProfitLoss: number;
  currentValueDiff: number;
  daysToStaking: DaysTo;
  remainingStakingAmount: number;
  bought: AmountCash;
  sold: AmountCash;
  spent: number;
  dailyInterest: AmountValue;
  interest: AmountValue;
  spot: AmountValue;
  staked: AmountValue;
  stakedInterestAccumulated: AmountValue;
  amountValue: AmountValue;
  canBeStaked?: boolean;
}

export interface Meta {
  toAddToInterestTotal: [string, number][];
  coinBuyBalance: Balance;
  coinSellBalance: Balance;
  coinDepositHistory: History[];
  coinWithdrawalHistory: History[];
  depositHistory: History[];
  directHistory: History[];
  liquidityHistory: History[];
  tradeIDs: {
    [key: string]: number[];
  };
  stakingHistory: {
    [key: string]: StakingHistory[];
  };
  cardPayments: History[];
  IDs: {
    stakingIDs: number[];
    redemptionIDs: number[];
    interestIDs: number[];
    depositIDs: number[];
    directIDs: number[];
    coinDepositIDs: number[];
    coinWithdrawalIDs: number[];
    liquidityIDs: number[];
    cardPaymentIDs: number[];
  };
}

export interface History {
  amount: number;
  sourceAmount?: number;
  totalFee?: number;
  coin?: string;
  value?: number;
  timeUnix: number;
  totalValue?: TotalValue;
  fiatCurrency?: string;
  validated?: boolean;
  operation?: string;
  id: string;
  cryptoCurrency?: string;
  obtainAmount?: number;
}
export interface Balance {
  [key: string]: [number, number][];
}

export interface LiquidityHistory {
  amount: number;
  operation: string;
  timeUnix: number;
}
export interface StakingHistory {
  expiration: number;
  lockPeriod: number;
  date: number;
  amount: number;
  value: number;
  interestData: InterestData;
  id: string;
  redemptionDate?: number;
}

export interface InterestData {
  dailyAmount: number;
  dailyValue: number;
  totalAmount: number;
  totalValue: number;
}

export interface TotalValue {
  valuePast: number;
  valuePresent: number;
}
