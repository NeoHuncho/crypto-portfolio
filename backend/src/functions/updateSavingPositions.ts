import {
  getSavingPositions,
  purchaseSaving,
  redeemSaving,
} from "../data/dataBinance";
import type { Data } from "../../../common/types/interfaces";
import logToFile from "../utils/log";

const updateSavingPositions = async (
  data: Data,
  coinName: string,
  canBeStaked: number
) => {
  const coins = data["coins"];
  const savingPositions = await getSavingPositions();
  for (const key in savingPositions) {
    if (coinName === "USDT") continue;
    if (!coins[savingPositions[key].asset]) continue;
    const asset = savingPositions[key].asset;
    if (asset !== coinName) continue;
    const coin = coins[asset];
    if (!coin) continue;

    if (!canBeStaked) {
      let remainingSavingsAmount: any = null;
      data["binance"]?.spotAccount.balances.map((balance: any) => {
        if (balance.asset === asset)
          remainingSavingsAmount = parseFloat(balance.free);
      });
      if (!remainingSavingsAmount) continue;
      else {
        await purchaseSaving(
          savingPositions[key].productId,
          remainingSavingsAmount
        );
        continue;
      }
    } else {
      if (parseFloat(coin.remainingStakingAmount.toFixed(7)) <= 0) {
        let remainingSavingsAmount: any = null;
        data["binance"]?.spotAccount.balances.map((balance: any) => {
          if (balance.asset === asset)
            remainingSavingsAmount = parseFloat(balance.free);
        });
        if (!remainingSavingsAmount) continue;
        else {
          await purchaseSaving(
            savingPositions[key].productId,
            remainingSavingsAmount
          );
          continue;
        }
      } else {
        await redeemSaving(
          savingPositions[key].productId,
          Number(coin.remainingStakingAmount.toFixed(7))
        );
      }
    }
  }
};
export default updateSavingPositions;
