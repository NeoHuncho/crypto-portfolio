import { purchaseSaving, redeemSaving } from "../../foreign_api/dataBinance";
import type { Data } from "../../../../common/types/interfaces";

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
    let remainingSavingsAmount: number = 0;

    data["binance"]?.spotAccount.balances.map((balance: any) => {
      if (balance.asset === coinName)
        if (coin.remainingStakingAmount < 0)
          remainingSavingsAmount = parseFloat(balance.free);
        else
          remainingSavingsAmount =
            parseFloat(balance.free) - coin.remainingStakingAmount;
    });

    if (!remainingSavingsAmount) return;
    if (remainingSavingsAmount < 0)
      await redeemSaving(
        product.productId,
        Number(coin.remainingStakingAmount.toFixed(7)) * -1
      );
    if (remainingSavingsAmount < 0)
      await redeemSaving(
        product.productId,
        Number(coin.remainingStakingAmount.toFixed(7))
      );
    if (remainingSavingsAmount < product.minPurchaseAmount) return;

    await purchaseSaving(product.productId, remainingSavingsAmount);
    return;
  }
};
export default updateSavingPositions;
