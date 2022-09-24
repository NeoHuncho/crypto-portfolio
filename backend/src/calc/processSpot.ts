import { defaultCoin } from "../data/defaultValues";
import type { Coins, Data } from "../../../common/types/interfaces";

interface SpotBalanceItem {
  asset: string;
  free: string;
  locked: string;
}

const processSpot = async (data: Data) => {
  let coins = data["coins"];
  const checkBlackListedCoins = (coin: string) => {
    if (coin.includes("NANO")) return true;
    return false;
  };

  // const sortData = (a, b) => {
  //   if (a.totalAmount > b.totalAmount) {
  //     return -1;
  //   }
  //   if (a.totalAmount < b.totalAmount) {
  //     return 1;
  //   }
  //   return 0;
  // };

  //get spot current coins

  const resetSpot = (coins: Coins) => {
    Object.keys(coins).map((key) => {
      const coinData = coins[key];
      if (coinData) coinData.spot.amount = 0;
    });
  };
  resetSpot(coins);
  if (!data.binance) return;
  data.binance.spotAccount.balances.map((item: SpotBalanceItem) => {
    const totalAmount = parseFloat(item.free);

    if (totalAmount && !checkBlackListedCoins(item.asset)) {
      const coinName =
        item.asset.substring(0, 2) === "LD"
          ? item.asset.substring(2)
          : item.asset;
      if (!coinName) return;
      const coinData = coins[coinName];
      if (coinData) coinData.spot.amount += totalAmount;
      else {
        coins[coinName] = new defaultCoin();
        const coinData = coins[coinName];
        if (coinData) coinData.spot.amount = totalAmount;
      }
    }
  });

  return coins;
};

export default processSpot;
