import { getAvgPrice } from "../../foreign_api/dataBinance";
import type { Data, ExchangeRates } from "../../../../common/types/interfaces";

const updatePriceValues = async (
  data: Data,
  exchangeRatesUSDT: ExchangeRates
) => {
  //get values of positions
  if (!exchangeRatesUSDT["currency"]) return;
  for (const key in data["coins"]) {
    const coin = data["coins"][key];
    if (!coin) return;
    try {
      const value = !key.includes("USD")
        ? parseFloat(
            await getAvgPrice(
              key.substring(0, 2) === "LD"
                ? key.substring(2) + "USDT"
                : key + "USDT"
            )
          ) / exchangeRatesUSDT["currency"]
        : 1;

      const reverseExchangeRate = 1 / exchangeRatesUSDT["currency"];
      coin.currentCoinValue = value;
      coin.amountValue.value =
        ((coin.staked.amount || 0) + (coin.staked.amount || 0)) * value;
      if (coin.currentCoinValue && coin.avgBuyPrice)
        coin.priceDiff =
          coin.currentCoinValue / coin.avgBuyPrice < 1
            ? "-" +
              ((1 - coin.currentCoinValue / coin.avgBuyPrice) * 100).toFixed(
                2
              ) +
              "%"
            : ((coin.currentCoinValue / coin.avgBuyPrice - 1) * 100).toFixed(
                2
              ) + "%";
      else delete coin.priceDiff;
      coin.spot.value = coin.spot.amount * value;
      if (coin.avgBuyPrice)
        coin.currentValueDiff = -(
          (1 - coin.currentCoinValue / coin.avgBuyPrice) *
          100
        ).toFixed(2);

      if (coin.bought && coin.sold) {
        coin.bought.cash = coin.bought.cash * reverseExchangeRate;
        coin.sold.cash = coin.sold.cash * reverseExchangeRate;
        coin.spent = coin.bought.cash - coin.sold.cash;
        coin.profitLoss = coin.amountValue.value - coin.spent;
      }
      coin.staked.value = coin.staked.amount * value;
      coin.amountValue.amount = coin.spot.amount + coin.staked.amount;
      coin.amountValue.value = coin.spot.value + coin.staked.value;
      data["general"].coinsData.value += coin.amountValue.value;
      data["general"].coinsData.spotValue += coin.spot.value;

      coin.interest.value = coin.interest.amount * value;
      data["general"].coinsData.stakedValue += coin.staked.value;
      coin.dailyInterest.value = coin.dailyInterest.amount * value;
      let removeIndex: number[] = [];

      data.meta.toAddToInterestTotal.map((item, index) => {
        if (item[0] === key) {
          data.general.coinsData.interestHistoryValue += item[1] * value;
          removeIndex.push(index);
        }
        return item;
      });
    } catch (error) {
      console.log( "error in updatePriceValues for " + key + ": " + error);
    }
  }

  return data;
};

export default updatePriceValues;
