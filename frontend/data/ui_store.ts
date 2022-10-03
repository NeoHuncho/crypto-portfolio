import create from "zustand";

type CoinsCards =
  | "PriceSlider/Ranking"
  | "amountValue"
  | "spot"
  | "staked"
  | "priceDiff"
  | "avgBuyPrice"
  | "allTimeSellPrice"
  | "allTimeSellPrice"
  | "remainingStakingAmount"
  | "interest"
  | "daysToStaking";
interface IStore {
  coinCards: CoinsCards[][];
  filters: {
    hide0Balance: boolean;
  };
  actions: {
    toggle0Balance: () => void;
  };
}
const useUIStore = create<IStore>((set) => ({
  coinCards: [
    ["PriceSlider/Ranking"],
    ["amountValue", "spot", "staked"],
    ["priceDiff", "avgBuyPrice", "allTimeSellPrice"],
    ["remainingStakingAmount", "interest", "daysToStaking"],
  ],
  filters: {
    hide0Balance: true,
  },
  actions: {
    toggle0Balance: () =>
      set((state) => ({
        ...state,
        filters: { hide0Balance: !state.filters.hide0Balance },
      })),
  },
}));
const toggle0Balance = () => useUIStore.getState().actions.toggle0Balance();

export { useUIStore,toggle0Balance };
