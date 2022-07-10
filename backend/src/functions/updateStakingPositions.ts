import { getStakingPositions, purchaseStaking } from "../data/dataBinance";
import type { Coin, Data } from "../types/interfaces";

const updateStakingPositions = async (data: Data) => {
  const coins = data["coins"];
  for (const key in coins) {
    if (!coins[key]) continue;
    const coin: Coin | undefined = coins[key];

    if (!coin || coin.canBeStaked === false || coin.remainingStakingAmount <= 0)
      continue;
    const stakingPositions = await getStakingPositions(key);

    if (stakingPositions.length === 0) {
      coin.canBeStaked = false;
      continue;
    } else coin.canBeStaked = true;

    for (const index in stakingPositions) {
      let quota = stakingPositions[index].quota.totalPersonalQuota;
      let minimum = stakingPositions[index].quota.minimum;

      if (!quota || !minimum) continue;
      quota = parseFloat(quota);
      minimum = parseFloat(minimum);

      if (minimum > coin.remainingStakingAmount) continue;
      const stakingAmount =
        coin.remainingStakingAmount < quota
          ? coin.remainingStakingAmount
          : quota;

      // const res = await purchaseStaking(
      //   "STAKING",
      //   stakingPositions[index].projectId,
      //   stakingAmount
      // );
      console.log(stakingPositions[index].projectId, stakingAmount);
      // if (!res) continue;
      // if (!res.success) {
      //   console.log(res);
      //   continue;
      // } else coin.remainingStakingAmount -= stakingAmount;
      coin.remainingStakingAmount -= stakingAmount;
    }
  }
  return coins;
};
export default updateStakingPositions;
