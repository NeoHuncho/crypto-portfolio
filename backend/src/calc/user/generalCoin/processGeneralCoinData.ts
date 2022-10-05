import type { CoinsFetchData } from "../../../interfaces";

const processGeneralCoinData = (coinData: CoinsFetchData) => {
  const data: any = { market: {}, price_change: {}, ranking: {} };

  const {
    market_data,
    coingecko_rank,
    community_score,
    coingecko_score,
    developer_score,
    liquidity_score,
    public_interest_score,
  } = coinData;
  if (!market_data?.price_change_percentage_24h) {
    return;
  }
  data.price_change["24h"] = market_data.price_change_percentage_24h.toFixed(2);

  data.price_change["7d"] = market_data.price_change_percentage_7d.toFixed(2);

  data.price_change["30d"] = market_data.price_change_percentage_30d.toFixed(2);
  data.price_change["60d"] = market_data.price_change_percentage_60d.toFixed(2);

  data.price_change["200d"] =
    market_data.price_change_percentage_200d.toFixed(2);

  data.price_change["1y"] = market_data.price_change_percentage_1y.toFixed(2);

  data.price_change["ath"] = market_data.ath_change_percentage.usd.toFixed(2);

  data.price_change["atl"] = market_data.atl_change_percentage.usd.toFixed(2);

  data.market["ath_date"] = market_data.ath_date.usd;
  data.market["atl_date"] = market_data.atl_date.usd;
  data.ranking["global_rank"] = parseInt(coingecko_rank.toFixed());
  data.ranking["community_score"] = parseInt(community_score.toFixed());
  data.ranking["coingecko_score"] = parseInt(coingecko_score.toFixed());
  data.ranking["public_interest_score"] = parseInt(
    public_interest_score.toFixed()
  );
  data.ranking["developer_score"] = parseInt(developer_score.toFixed());

  data.ranking["liquidity_score"] = parseInt(liquidity_score.toFixed());
  return data;
};

export default processGeneralCoinData;
