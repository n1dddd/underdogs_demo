import { create } from "zustand";

export const useProductsStore = create((set) => ({
    products: [],
    filteredProducts: [],
    activeProduct: {},
    setProducts: (dbProducts) => set({ products: dbProducts }),
    setActiveProduct: (selectedProduct) => set({ activeProduct: selectedProduct }),
    setFilteredProducts: (filteredState) => set({ filteredProducts: filteredState })
}))