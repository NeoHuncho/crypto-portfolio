import moment from "moment";
import { defaultCoin } from "../data/defaultValues";
import type { Data, StakingHistory } from "../../../common/types/interfaces";
import { numDaysBetween } from "../utils/dates";

const processStaking = (data: Data) => {
  const coins = data["coins"];
  const resetStaking = () => {
    Object.keys(coins).map((key) => {
      const coinData = coins[key];
      if (coinData) coinData.staked.amount = 0;
    });
  };
  const sortSubscriptions = (subscriptions: any) => {

    subscriptions.map((item: any) => {
      if (!item.positionId || !item.asset) return;
      if (data.meta.IDs.stakingIDs.includes(item.positionId)) return;
      data.meta.IDs.stakingIDs.push(item.positionId);

      const metaData = data["meta"].stakingHistory[item.asset];

      const historyObj = {
        id: item.positionId,
        expiration: moment(item.time).add(item.lockPeriod, "d").unix(),
        value: 0,
        amount: parseFloat(item.amount),
        lockPeriod: item.lockPeriod,
        date: item.time,
        interestData: {
          dailyAmount: 0,
          dailyValue: 0,
          totalAmount: 0,
          totalValue: 0,
        },
      };
      if (metaData)
        metaData.push({
          ...historyObj,
        });
      else
        data["meta"].stakingHistory[item.asset] = [
          {
            ...historyObj,
          },
        ];

      if (!coins[item.asset]) coins[item.asset] = new defaultCoin();
    });
  };

  const sortInterest = async (interest: any) => {
    interest.map((item: any) => {
      const coin = coins[item.asset];
      if (!coin || !item.positionId) return;
      if (data.meta.IDs.interestIDs.includes(item.positionId)) return;
      data.meta.IDs.interestIDs.push(item.positionId);
      const stakingHistory = data.meta.stakingHistory[item.asset];
      if (!stakingHistory) return;

      stakingHistory.map((history: StakingHistory) => {
        const totalAmount = parseFloat(item.amount) * history.lockPeriod;
        if (history.id === item.positionId) {
          history.interestData.dailyAmount = parseFloat(item.amount);
          history.interestData.dailyValue = 0;
          history.interestData.totalAmount = totalAmount;
          history.interestData.totalValue = 0;
          coin.dailyInterest.amount += parseFloat(item.amount);
          coin.interest.amount += totalAmount;
          return history;
        } else return history;
      });
    });
  };

  const sortRedemptions = (redemptions: any) => {
    redemptions.map((item: any) => {
      const coin = coins[item.asset];
      if (!item.positionId) return;
      if (!coin || data.meta.IDs.redemptionIDs.includes(item.positionId))
        return;
      data.meta.IDs.redemptionIDs.push(item.positionId);
      const stakingHistory = data.meta.stakingHistory[item.asset];
      if (!stakingHistory) return;
      data.meta.stakingHistory[item.asset] = stakingHistory.map(
        (history: StakingHistory) => {
          if (history.id === item.positionId) {
            history.redemptionDate = item.time;
            data.meta.toAddToInterestTotal.push([
              item.asset,
              history.interestData.totalAmount,
            ]);
            return history;
          } else return history;
        }
      );
    });
  };

  if (!data.binance) return;
  resetStaking();
  sortSubscriptions(data.binance.stakingSubscriptionHistory);
  sortInterest(data.binance.stakingInterestHistory);
  sortRedemptions(data.binance.stakingRedemptionHistory);

  Object.entries(data.meta.stakingHistory).map(([coin, history]) => {
    history.map((historyElement: StakingHistory) => {
      const coinData = data.coins[coin];
      if (!coinData) return;
      if (!historyElement.redemptionDate) {
        coinData.staked.amount += historyElement.amount;
        const daysToExpiration = numDaysBetween(
          historyElement.expiration,
          new Date()
        );

        if (!coinData.daysToStaking.last)
          coinData.daysToStaking.last = daysToExpiration;
        if (!coinData.daysToStaking.next)
          coinData.daysToStaking.next = daysToExpiration;
        if (coinData.daysToStaking.last < daysToExpiration)
          coinData.daysToStaking.last = daysToExpiration;
        if (coinData.daysToStaking.next > daysToExpiration)
          coinData.daysToStaking.next = daysToExpiration;
      }
    });
  });
  return data;
};
export default processStaking;
