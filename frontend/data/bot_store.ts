import { BotData, Coins, Data, General, Meta } from "@common/types/interfaces";
import create from "zustand";

const useBotStore = create<BotData>((set) => ({
  settings: null,
  coins: null,
}));
export { useBotStore };
