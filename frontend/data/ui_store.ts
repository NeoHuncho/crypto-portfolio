import { Layout } from "components/modals/portfolio/layout";
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
  layout: {
    syncCarouselMoves: boolean;
    syncPriceDayChanges: boolean;
  };
  actions: {
    toggle0Balance: () => void;
    toggleCarouselMoves: () => void;
    togglePriceDayChanges: () => void;
    incrementSlideIndex: () => void;
    decrementSlideIndex: () => void;
    setPriceDate: (date: string) => void;
  };
  ui: {
    currentSlideIndex: number;
    currentPriceDate: string;
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
  layout: {
    syncCarouselMoves: false,
    syncPriceDayChanges: true,
  },
  ui: {
    currentSlideIndex: 0,
    currentPriceDate: "24h",
  },
  actions: {
    toggle0Balance: () =>
      set((state) => ({
        ...state,
        filters: { hide0Balance: !state.filters.hide0Balance },
      })),
    toggleCarouselMoves: () =>
      set((state) => ({
        ...state,
        layout: {
          ...state.layout,
          syncCarouselMoves: !state.layout.syncCarouselMoves,
        },
      })),
    togglePriceDayChanges: () =>
      set((state) => ({
        ...state,
        layout: {
          ...state.layout,
          syncPriceDayChanges: !state.layout.syncPriceDayChanges,
        },
      })),
    incrementSlideIndex: () =>
      set((state) => ({
        ...state,
        ui: {
          ...state.ui,
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
          ...state.ui,
          currentSlideIndex:
            state.ui.currentSlideIndex === 0
              ? 0
              : state.ui.currentSlideIndex - 1,
        },
      })),
    setPriceDate: (date: string) =>
      set((state) => ({
        ...state,
        ui: { ...state.ui, currentPriceDate: date },
      })),
  },
}));
const toggle0Balance = () => useUIStore.getState().actions.toggle0Balance();

export { useUIStore, toggle0Balance };
