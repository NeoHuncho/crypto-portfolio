//  create user store with userUID

import create from "zustand";
import { persist } from "zustand/middleware";

const useUserStore: any = create(
  persist((set) => ({
    userUID: "",
    setUserUID: (userUID: string) => set({ userUID }),
  }))
);

export default useUserStore;
