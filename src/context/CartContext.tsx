"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import type { ShopifyCart } from "@/lib/shopify";

type CartContextType = {
  cart: ShopifyCart | null;
  cartOpen: boolean;
  setCart: (cart: ShopifyCart | null) => void;
  openCart: () => void;
  closeCart: () => void;
  refreshCart: () => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [cartOpen, setCartOpen] = useState(false);

  function openCart() {
    setCartOpen(true);
  }

  function closeCart() {
    setCartOpen(false);
  }

  async function refreshCart() {
    const cartId = localStorage.getItem("cartId");

    if (!cartId) {
      setCart(null);
      return;
    }

    try {
      const res = await fetch(`/api/cart/${encodeURIComponent(cartId)}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch cart");
      }

      setCart(data);
      localStorage.setItem("checkoutUrl", data.checkoutUrl);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    refreshCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartOpen,
        setCart,
        openCart,
        closeCart,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}