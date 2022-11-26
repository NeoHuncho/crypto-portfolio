import { fromUnixTime, isBefore } from "date-fns";
import type { Coin, Data } from "../../../../../common/types/interfaces";
import { getCoinSavingPosition } from "../../../foreign_api/dataBinance";

const calculateSyncData = async (data: Data) => {

  for (const key in data["coins"]) {
    const stakingData = data.meta?.stakingHistory?.[key];

    const coin: Coin = data["coins"][key];
    if (!coin) continue;
    if (!data.general) return;
    if (!coin.amountValue.amount) continue;
    if (coin.staked.amount) {
      coin.remainingStakingAmount =
        (coin.staked.amount + coin.spot.amount) *
          (1 - data["general"].coinsData.percentageToNotStake / 100) -
        coin.staked.amount;
      let totalStaking = 0;
      if (stakingData)
        for (const item of stakingData) {
          if (isBefore(new Date(), fromUnixTime(item.expiration))) break;
          totalStaking += item.interestData.dailyAmount;
        }
      const savingPositions = await getCoinSavingPosition(key);
      if (savingPositions)
        savingPositions.map((item: any) => {
          totalStaking +=
            parseFloat(item.dailyInterestRate) * parseFloat(item.totalAmount);
        });

      if (!totalStaking) continue;
      coin.interestRoi = ((totalStaking * 365) / coin.amountValue.amount) * 100;
    } else if (coin.spot.amount)
      coin.remainingStakingAmount =
        coin.spot.amount *
        (1 - data["general"].coinsData.percentageToNotStake / 100);
  }
  return data["coins"];
};

export default calculateSyncData;
