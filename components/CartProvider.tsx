"use client";

import { createContext, type ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { catalogById, type CatalogItem } from "@/lib/catalog";

export type CartLine = { id: string; quantity: number };
export type CartLineWithItem = CartLine & { item: CatalogItem };

type CartContextValue = {
  lines: CartLineWithItem[];
  hydrated: boolean;
  itemCount: number;
  subtotal: number;
  addItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

const storageKey = "tic-clinic-cart-v1";
const CartContext = createContext<CartContextValue | null>(null);

const sanitizeLines = (value: unknown): CartLine[] => {
  if (!Array.isArray(value)) return [];
  return value.flatMap((line) => {
    if (!line || typeof line !== "object") return [];
    const { id, quantity } = line as Partial<CartLine>;
    if (typeof id !== "string" || !catalogById.has(id)) return [];
    if (!Number.isInteger(quantity) || (quantity ?? 0) < 1) return [];
    return [{ id, quantity: Math.min(quantity as number, 10) }];
  });
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [storedLines, setStoredLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try { setStoredLines(sanitizeLines(JSON.parse(localStorage.getItem(storageKey) ?? "[]"))); }
      catch { setStoredLines([]); }
      finally { setHydrated(true); }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(storageKey, JSON.stringify(storedLines));
  }, [hydrated, storedLines]);

  const addItem = useCallback((id: string) => {
    if (!catalogById.has(id)) return;
    setStoredLines((current) => {
      const exists = current.find((line) => line.id === id);
      if (!exists) return [...current, { id, quantity: 1 }];
      return current.map((line) => line.id === id ? { ...line, quantity: Math.min(line.quantity + 1, 10) } : line);
    });
  }, []);

  const setQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) {
      setStoredLines((current) => current.filter((line) => line.id !== id));
      return;
    }
    setStoredLines((current) => current.map((line) => line.id === id ? { ...line, quantity: Math.min(Math.floor(quantity), 10) } : line));
  }, []);
  const removeItem = useCallback((id: string) => setStoredLines((current) => current.filter((line) => line.id !== id)), []);
  const clearCart = useCallback(() => setStoredLines([]), []);

  const value = useMemo<CartContextValue>(() => {
    const lines = storedLines.flatMap((line) => {
      const item = catalogById.get(line.id);
      return item ? [{ ...line, item }] : [];
    });
    return {
      lines,
      hydrated,
      itemCount: lines.reduce((sum, line) => sum + line.quantity, 0),
      subtotal: lines.reduce((sum, line) => sum + line.item.price * line.quantity, 0),
      addItem, setQuantity, removeItem, clearCart,
    };
  }, [addItem, clearCart, hydrated, removeItem, setQuantity, storedLines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used inside CartProvider");
  return value;
}
