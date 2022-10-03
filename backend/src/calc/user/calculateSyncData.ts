import type { DocumentData } from "firebase-admin/firestore";
import type { Coin } from "../../../../common/types/interfaces";

const calculateSyncData = (data: DocumentData) => {
  for (const key in data["coins"]) {
    const coin: Coin = data["coins"][key];
    if (!coin) continue;
    if (!data["general"].coinsData.percentageToNotStake) continue;
    if (!coin.amountValue.amount) continue;
    if (coin.staked.amount) {
      coin.remainingStakingAmount =
        (coin.staked.amount + coin.spot.amount) *
          (1 - data["general"].coinsData.percentageToNotStake / 100) -
        coin.staked.amount;
    } else if (coin.spot.amount)
      coin.remainingStakingAmount =
        coin.spot.amount *
        (1 - data["general"].coinsData.percentageToNotStake / 100);
  }
  return data["coins"];
};

export default calculateSyncData;
