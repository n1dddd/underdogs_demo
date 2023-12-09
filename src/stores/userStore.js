import { create } from "zustand";

export const useUserStore = create((set) => ({
    user: {},
    setUser: (authUser) => set({ user: authUser })
}))