import { create } from "zustand";
import type { Size } from "./products";

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  size: Size;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  setOpen: (open: boolean) => void;
  add: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  remove: (productId: string, size: Size) => void;
  setQty: (productId: string, size: Size, qty: number) => void;
  clear: () => void;
  total: () => number;
  count: () => number;
}

export const useCart = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  setOpen: (isOpen) => set({ isOpen }),
  add: (item) =>
    set((s) => {
      const existing = s.items.find(
        (i) => i.productId === item.productId && i.size === item.size,
      );
      const qty = item.quantity ?? 1;
      if (existing) {
        return {
          items: s.items.map((i) =>
            i === existing ? { ...i, quantity: i.quantity + qty } : i,
          ),
          isOpen: true,
        };
      }
      return { items: [...s.items, { ...item, quantity: qty }], isOpen: true };
    }),
  remove: (productId, size) =>
    set((s) => ({
      items: s.items.filter((i) => !(i.productId === productId && i.size === size)),
    })),
  setQty: (productId, size, qty) =>
    set((s) => ({
      items: s.items
        .map((i) =>
          i.productId === productId && i.size === size ? { ...i, quantity: qty } : i,
        )
        .filter((i) => i.quantity > 0),
    })),
  clear: () => set({ items: [] }),
  total: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
  count: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
}));
