import type { Database } from "firebase-admin/database";
import type {
  CurrencyListNumber,
  CurrencyListString,
} from "../../common/types/types";
export interface CoinsFetchData {
  id: string;
  symbol: string;
  name: string;
  block_time_in_minutes: number;
  hashing_algorithm: string;
  categories: string[];
  localization: object;
  description: object;
  links: object;
  image: {
    thumb: string;
    small: string;
  };
  country_origin: string;
  genesis_date: string;
  sentiment_votes_up_percentage: number;
  sentiment_votes_down_percentage: number;
  market_cap_rank: number;
  coingecko_rank: number;
  coingecko_score: number;
  developer_score: number;
  community_score: number;
  liquidity_score: number;
  public_interest_score: number;
  market_data: {
    ath_change_percentage: CurrencyListNumber;
    ath_date: CurrencyListString;
    atl_change_percentage: CurrencyListNumber;
    atl_date: CurrencyListString;
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_30d: number;
    price_change_percentage_60d: number;
    price_change_percentage_200d: number;
    price_change_percentage_1y: number;
  };
  community_data: {
    facebook_likes: null | number;
    twitter_followers: number;
    reddit_average_posts_48h: number;
    reddit_average_comments_48h: number;
    reddit_subscribers: number;
    reddit_accounts_active_48h: string;
  };
  developer_data: {
    forks: number;
    stars: number;
    subscribers: number;
    total_issues: number;
    closed_issues: number;
    pull_requests_merged: number;
    pull_request_contributors: number;
    code_additions_deletions_4_weeks: { additions: number; deletions: number };
    commit_count_4_weeks: number;
  };
  public_interest_stats: { alexa_rank: number; bing_matches: null };
  last_updated: string;
  tickers: CoinsFetchDataTicker[];
}
export interface FirebaseData {
  fireStore: any;
  db: Database;
  reset?: boolean | undefined;
  userID: string;
  data?: Data;
}
interface CoinsFetchDataTicker {
  base: string;
  target: string;
  market: {
    name: string;
    identifier: string;
    has_trading_incentive: boolean;
  };
  last: number;
  volume: number;
  converted_last: {
    btc: number;
    eth: number;
    usd: number;
  };
  converted_volume: {
    btc: number;
    eth: number;
    usd: number;
  };
  trust_score: TrustScore;
  bid_ask_spread_percentage: number;
  timestamp: Date;
  last_traded_at: Date;
  last_fetch_at: Date;
  is_anomaly: boolean;
  is_stale: boolean;
  trade_url: string | null;
  token_info_url: string | null;
  coin_id: string;
  target_coin_id: string;
}

type TrustScore = "green" | "yellow" | "red";
