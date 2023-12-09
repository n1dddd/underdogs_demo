import { create } from "zustand";

export const useFinderStore = create((set) => ({
    isFinderOpen: false,
    openFinder: () => set({ isFinderOpen: true }),
    closeFinder: () => set({ isFinderOpen: false })
}))