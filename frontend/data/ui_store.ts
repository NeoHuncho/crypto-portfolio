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
    incrementSlideIndex: () => void;
    decrementSlideIndex: () => void;
  };
  ui: {
    currentSlideIndex: number;
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
  ui: {
    currentSlideIndex: 0,
  },
  actions: {
    toggle0Balance: () =>
      set((state) => ({
        ...state,
        filters: { hide0Balance: !state.filters.hide0Balance },
      })),
    incrementSlideIndex: () =>
      set((state) => ({
        ...state,
        ui: {
          currentSlideIndex:
            state.ui.currentSlideIndex === state.coinCards.length - 1
              ? state.coinCards.length - 1
              : state.ui.currentSlideIndex + 1,
        },
      })),
    decrementSlideIndex: () =>
      set((state) => ({
        ...state,
        ui: {
          currentSlideIndex:
            state.ui.currentSlideIndex === 0
              ? 0
              : state.ui.currentSlideIndex - 1,
        },
      })),
  },
}));
const toggle0Balance = () => useUIStore.getState().actions.toggle0Balance();

export { useUIStore, toggle0Balance };
