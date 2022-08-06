import { purchaseSaving, redeemSaving } from "../data/dataBinance";
import type { Data } from "../../../common/types/interfaces";

const updateSavingPositions = async (
  data: Data,
  coinName: string,
  canBeStaked: number
) => {
  if (coinName === "USDT") return;
  const coins = data["coins"];
  const savingPositions = data["binance"]?.savingProducts;
  if (!savingPositions) return;
  const coin = coins[coinName];
  if (!coin) return;
  const products = savingPositions[coinName];
  if (!products) return;
  const product = products[0];
  if (!product) {
    console.log("could not find saving product for" + coinName);
    return;
  }
  if (!canBeStaked) {
    let remainingSavingsAmount: any = null;
    data["binance"]?.spotAccount.balances.map((balance: any) => {
      if (balance.asset === coinName)
        remainingSavingsAmount = parseFloat(balance.free);
    });
    if (!remainingSavingsAmount) return;
    if (remainingSavingsAmount < product.minPurchaseAmount) return;
    else {
      await purchaseSaving(product.productId, remainingSavingsAmount);
      return;
    }
  } else {
    if (parseFloat(coin.remainingStakingAmount.toFixed(7)) <= 0) {
      let remainingSavingsAmount: any = null;
      data["binance"]?.spotAccount.balances.map((balance: any) => {
        if (balance.asset === coinName)
          remainingSavingsAmount = parseFloat(balance.free);
      });
      if (!remainingSavingsAmount) return;
      if (remainingSavingsAmount < product.minPurchaseAmount) return;
      else {
        await purchaseSaving(product.productId, remainingSavingsAmount);
        return;
      }
    } else {
      if (
        Number(coin.remainingStakingAmount.toFixed(7)) <
        product.minPurchaseAmount
      )
        return;
      await redeemSaving(
        product.productId,
        Number(coin.remainingStakingAmount.toFixed(7))
      );
    }
  }
};
export default updateSavingPositions;
