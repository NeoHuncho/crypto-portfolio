import create from "zustand";

type CoinsCards =
  | "amountValue"
  | "spot"
  | "staked"
  | "currentCoinValue"
  | "avgBuyPrice"
  | "allTimeSellPrice"
  | "allTimeSellPrice"
  | "remainingStakingAmount"
  | "interest"
  | "daysToStaking";
interface IStore {
  coinCards: [CoinsCards, CoinsCards, CoinsCards][];
}
const useUIStore = create<IStore>((set) => ({
  coinCards: [
    ["amountValue", "spot", "staked"],
    ["currentCoinValue", "avgBuyPrice", "allTimeSellPrice"],
    ["remainingStakingAmount", "interest", "daysToStaking"],
  ],
}));
export { useUIStore };
