import { getAllOrders } from "../data/dataBinance";
import type { Data } from "../../../common/types/interfaces";
import logToFile from "../utils/log";

const processTrades = async (data: Data) => {
  const checkKey = (key: string) => {
    if (key === "XNO") return "NANO";
    if (key === "USDT" || key === "NANO") return false;
    else return key;
  };

  for (const key in data["coins"]) {
    try {
      const tradeKey = checkKey(key);
      if (tradeKey) {
        //todo ADD other trading pairs such as EUR, BTC ect..
        const trades = await getAllOrders(tradeKey);
        const coinData = data["coins"][key];
        if (!coinData) return;

        if (!data["meta"].tradeIDs[key]) data["meta"].tradeIDs[key] = [];
        let tradeIDs = data["meta"].tradeIDs[key];
        let priceDataBuy = data["meta"].coinBuyBalance[key];
        let priceDataSell = data["meta"].coinSellBalance[key];
        let totalBought = coinData.bought;
        let totalSold = coinData.sold;
        if (!priceDataBuy) priceDataBuy = [];
        if (!priceDataSell) priceDataSell = [];
        if (!totalBought) coinData.bought = { cash: 0, amount: 0 };
        if (!totalSold) coinData.sold = { cash: 0, amount: 0 };

        trades.map((item: any) => {
          if (!tradeIDs || !priceDataBuy || !priceDataSell) return;
          if (item.status === "FILLED" && !tradeIDs.includes(item.orderId)) {
            tradeIDs.push(item.orderId);
            const paidAmount = parseFloat(item.cummulativeQuoteQty);
            const coinAmount = parseFloat(item.executedQty);
            if (paidAmount !== 0 && coinAmount !== 0)
              if (item.side === "BUY") {
                coinData.bought.cash += paidAmount;
                coinData.bought.amount += coinAmount;
                priceDataBuy.push([paidAmount / coinAmount, coinAmount]);
              } else if (item.side === "SELL") {
                let avgQuantitySell = coinAmount / priceDataBuy.length;
                let allPassed = false;
                while (!allPassed && priceDataBuy.length !== 0) {
                  let removeIndex: number = -1;
                  for (let index in priceDataBuy) {
                    const data = priceDataBuy[index];
                    if (data)
                      if (data[1] < avgQuantitySell) {
                        removeIndex = parseInt(index);
                        break;
                      }
                  }
                  if (removeIndex !== -1) {
                    const itemToRemove = priceDataBuy[removeIndex];
                    if (itemToRemove) {
                      avgQuantitySell =
                        (coinAmount - itemToRemove[1]) /
                        (priceDataBuy.length - 1);
                      priceDataBuy.splice(removeIndex, 1);
                    }
                  } else allPassed = true;
                }

                priceDataBuy.map((item) => {
                  item[1] -= avgQuantitySell;
                });

                coinData.sold.cash += paidAmount;
                coinData.sold.amount += coinAmount;
                priceDataSell.push([paidAmount / coinAmount, coinAmount]);
              }
          }
        });

        const [valueSumSell, weightSumSell] = priceDataSell.reduce(
          ([valueSum, weightSum], [value, weight]) => [
            valueSum + value * weight,
            weightSum + weight,
          ],
          [0, 0]
        );
        const [valueSumBuy, weightSumBuy] = priceDataBuy.reduce(
          ([valueSum, weightSum], [value, weight]) => [
            valueSum + value * weight,
            weightSum + weight,
          ],
          [0, 0]
        );
        coinData.avgBuyPrice = valueSumBuy / weightSumBuy;
        coinData.allTimeSellPrice = valueSumSell / weightSumSell;
        data["meta"].coinBuyBalance[key] = priceDataBuy;
        data["meta"].coinSellBalance[key] = priceDataSell;
      }
    } catch (error) {
      await logToFile("errors", "error in trades for " + key);
    }
  }
  return data;
};
export default processTrades;
