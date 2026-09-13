import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { PRODUCTS, isSoldOut } from "./products";

const initialStock: Record<string, number> = Object.fromEntries(
  PRODUCTS.map((p) => [p.id, isSoldOut(p) ? 0 : 4]),
);

interface StockState {
  stock: Record<string, number>;
  get: (id: string) => number;
  set: (id: string, qty: number) => void;
  decrement: (id: string, qty?: number) => void;
}

export const useStock = create<StockState>()(
  persist(
    (set, get) => ({
      stock: initialStock,
      get: (id) => {
        const s = get().stock[id];
        return typeof s === "number" ? s : (initialStock[id] ?? 0);
      },
      set: (id, qty) =>
        set((s) => ({ stock: { ...s.stock, [id]: Math.max(0, qty) } })),
      decrement: (id, qty = 1) =>
        set((s) => ({
          stock: {
            ...s.stock,
            [id]: Math.max(0, (s.stock[id] ?? initialStock[id] ?? 0) - qty),
          },
        })),
    }),
    {
      name: "roguecore-stock",
      storage: createJSONStorage(() =>
        typeof window !== "undefined"
          ? window.localStorage
          : (undefined as unknown as Storage),
      ),

      merge: (persisted, current) => {
        const p = (persisted as StockState | undefined)?.stock ?? {};
        const stock: Record<string, number> = { ...initialStock, ...p };
        // Sold-out products are always 0, even if an earlier visit stored
        // a positive quantity for them in this browser.
        for (const product of PRODUCTS) {
          if (isSoldOut(product)) stock[product.id] = 0;
        }
        return { ...current, stock };
      },
    },
  ),
);
