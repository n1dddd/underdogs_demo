import { create } from "zustand";

export const useCategoriesStore = create((set) => ({
    categories: [],
    activeCategory: "",
    setCategories: (dbCategories) => set({ categories: dbCategories }),
    setActiveCategory: (selectedCategory) => set({ activeCategory: selectedCategory })
}))