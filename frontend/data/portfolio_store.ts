import { Coins, Data, General, Meta } from "@common/types/interfaces";
import create from "zustand";

const usePortfolioStore = create<Data>((set) => ({
  coins: null,
  general: null,
  meta: null,
  generalCoins: null,
}));
export { usePortfolioStore };
