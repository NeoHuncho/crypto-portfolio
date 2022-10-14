import { Coins, Data, General, Meta } from "@common/types/interfaces";
import { Withdrawals, Deposits, Card } from "design/icons";
import create from "zustand";

interface History {
  tabs: Tab[];
  data: any;
}
interface Tab {
  title: string;
  icon: any;
  id: string;
  edit?: boolean;
}
const useHistoryStore = create<History>((set) => ({
  tabs: [
    {
      id: "coinWithdrawalHistory",
      icon: Withdrawals,
      title: "Coin Withdrawal History",
    },
    {
      id: "coinDepositHistory",
      icon: Deposits,
      title: "Coin Deposit History",
    },
    { id: "directHistory", icon: Deposits, title: "Direct Buy History" },
    {
      id: "depositHistory",
      icon: Deposits,
      title: "Fiat Deposit History",
      edit: true,
    },
    { id: "Payments", icon: Card, title: "Card Payments" },

    // { id: "stakingHistory", icon: staking, title: "Staking History" },
  ],
  data: null,
}));
export { useHistoryStore };
