import { getStakingPositions, purchaseStaking } from "../data/dataBinance";
import type { Coin, Data } from "../../../common/types/interfaces";
import logToFile from "../utils/log";
import updateSavingPositions from "./updateSavingPositions";

const updateStakingPositions = async (data: Data) => {
  const coins = data["coins"];
  for (const key in coins) {
    if (!coins[key]) continue;
    const coin: Coin | undefined = coins[key];

    if (!coin || coin.remainingStakingAmount <= 0) continue;
    const stakingPositions = await getStakingPositions(key);

    await updateSavingPositions(data, key, stakingPositions.length);
    if (stakingPositions.length === 0) continue;
    for (const index in stakingPositions) {
      let quota = stakingPositions[index].quota.totalPersonalQuota;
      let minimum = stakingPositions[index].quota.minimum;
      if (!quota || !minimum) continue;
      quota = parseFloat(quota);
      minimum = parseFloat(minimum);

      if (minimum > coin.remainingStakingAmount) continue;
      const stakingAmount =
        coin.remainingStakingAmount < quota
          ? Number(coin.remainingStakingAmount.toFixed(7))
          : quota;
      const res = await purchaseStaking(
        "STAKING",
        stakingPositions[index].projectId,
        stakingAmount
      );

      if (!res) continue;
      if (!res.data?.success) continue;
      coin.remainingStakingAmount = coin.remainingStakingAmount - stakingAmount;
      logToFile(
        "general",
        `${key} staked ${stakingAmount}. Remaining ${coin.remainingStakingAmount}`
      );
    }
  }
  console.log("done");
  return coins;
};
export default updateStakingPositions;
