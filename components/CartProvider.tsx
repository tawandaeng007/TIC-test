"use client";

import { createContext, type ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { catalogById, type CatalogItem } from "@/lib/catalog";
import { getCatalogVariant, getCatalogVariants, type CatalogVariant } from "@/lib/catalog-variants";

export type CartLine = { id: string; variantId?: string; quantity: number };
export type CartLineWithItem = CartLine & {
  item: CatalogItem;
  variant?: CatalogVariant;
  lineKey: string;
  unitPrice: number;
};

type CartContextValue = {
  lines: CartLineWithItem[];
  hydrated: boolean;
  itemCount: number;
  subtotal: number;
  addItem: (id: string, variantId?: string) => void;
  setQuantity: (lineKey: string, quantity: number) => void;
  removeItem: (lineKey: string) => void;
  clearCart: () => void;
};

const storageKey = "tic-clinic-cart-v1";
const CartContext = createContext<CartContextValue | null>(null);
export const cartLineKey = (id: string, variantId?: string) => `${id}::${variantId ?? "standard"}`;

const sanitizeLines = (value: unknown): CartLine[] => {
  if (!Array.isArray(value)) return [];
  return value.flatMap((line) => {
    if (!line || typeof line !== "object") return [];
    const { id, quantity, variantId } = line as Partial<CartLine>;
    if (typeof id !== "string" || !catalogById.has(id)) return [];
    if (!Number.isInteger(quantity) || (quantity ?? 0) < 1) return [];
    const itemVariants = getCatalogVariants(id);
    const safeVariantId = itemVariants.length > 0
      ? getCatalogVariant(id, variantId)?.id
      : undefined;
    return [{ id, variantId: safeVariantId, quantity: Math.min(quantity as number, 10) }];
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

  const addItem = useCallback((id: string, variantId?: string) => {
    if (!catalogById.has(id)) return;
    const safeVariantId = getCatalogVariant(id, variantId)?.id;
    const targetKey = cartLineKey(id, safeVariantId);
    setStoredLines((current) => {
      const exists = current.find((line) => cartLineKey(line.id, line.variantId) === targetKey);
      if (!exists) return [...current, { id, variantId: safeVariantId, quantity: 1 }];
      return current.map((line) => cartLineKey(line.id, line.variantId) === targetKey ? { ...line, quantity: Math.min(line.quantity + 1, 10) } : line);
    });
  }, []);

  const setQuantity = useCallback((lineKey: string, quantity: number) => {
    if (quantity < 1) {
      setStoredLines((current) => current.filter((line) => cartLineKey(line.id, line.variantId) !== lineKey));
      return;
    }
    setStoredLines((current) => current.map((line) => cartLineKey(line.id, line.variantId) === lineKey ? { ...line, quantity: Math.min(Math.floor(quantity), 10) } : line));
  }, []);
  const removeItem = useCallback((lineKey: string) => setStoredLines((current) => current.filter((line) => cartLineKey(line.id, line.variantId) !== lineKey)), []);
  const clearCart = useCallback(() => setStoredLines([]), []);

  const value = useMemo<CartContextValue>(() => {
    const lines = storedLines.flatMap((line) => {
      const item = catalogById.get(line.id);
      if (!item) return [];
      const variant = getCatalogVariant(line.id, line.variantId);
      return [{
        ...line,
        variantId: variant?.id,
        item,
        variant,
        lineKey: cartLineKey(line.id, variant?.id),
        unitPrice: variant?.price ?? item.price,
      }];
    });
    return {
      lines,
      hydrated,
      itemCount: lines.reduce((sum, line) => sum + line.quantity, 0),
      subtotal: lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0),
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
