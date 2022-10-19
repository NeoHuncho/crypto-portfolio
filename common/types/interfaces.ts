// import type { Database } from "@firebase/database-types";
// import type { FirebaseFirestore } from "@firebase/firestore-types";
import type { CurrencyListString } from "./types";
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
  stakingPositions: any;
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
  generalCoins?: CoinsGeneralDB | null;
}

export interface GeneralDB {
  user: string;
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

export interface GeneralCoinsData {
  generalCoins: GeneralCoins;
  coinKeys: string[];
  geckoKeys: GeckoKeys;
}
export interface GeckoKeys {
  [key: string]: string;
}
export interface GeneralCoins {
  [key: string]: GeneralCoin;
}

export interface GeneralCoin {
  creationDate: number;
  historyEvolution: HistoryEvolution;
}
export interface HistoryEvolution {
  [key: string]: CoinHistory;
}
export interface CoinHistory {
  priceChange: number;
  mintChange: number;
  circulatingSupplyChange: number;
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
  priceDiff?: string;
  allTimeSellPrice: number;
  avgBuyPrice: number;
  currentCoinValue: number;
  profitLoss: number;
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
  interestRoi?: number;
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

export interface CoinsGeneralDB {
  [key: string]: CoinGeneralDB;
}
export interface CoinGeneralDB {
  market: CGeneralMarket;
  price_change: CGeneralPrice;
  ranking: CGeneralRanking;
}

export interface CGeneralMarket {
  ath_date: CurrencyListString;
  atl_date: CurrencyListString;
}

export interface CGeneralPrice {
  "24h": number;
  "7d": number;
  "30d": number;
  "200d": number;
  "1y": number;
}

export interface CGeneralRanking {
  global_rank: number;
  coingecko_score: number;
  developer_score: number;
  community_score: number;
  liquidity_score: number;
  public_interest_score: number;
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
