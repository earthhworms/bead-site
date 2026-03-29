"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import type { ShopifyCart } from "@/lib/shopify";

type Props = {
  variantId: string;
};

export default function AddToCartButton({ variantId }: Props) {
  const [loading, setLoading] = useState(false);
  const { setCart, openCart } = useCart();

  async function handleAddToCart() {
    try {
      setLoading(true);

      const existingCartId = localStorage.getItem("cartId");
      let cart: ShopifyCart;

      if (!existingCartId) {
        const res = await fetch("/api/cart/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            merchandiseId: variantId,
            quantity: 1,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to create cart");
        }

        cart = data;
        localStorage.setItem("cartId", cart.id);
      } else {
        const res = await fetch("/api/cart/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cartId: existingCartId,
            merchandiseId: variantId,
            quantity: 1,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to add to cart");
        }

        cart = data;
      }

      localStorage.setItem("checkoutUrl", cart.checkoutUrl);
      setCart(cart);
      openCart();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button onClick={handleAddToCart} disabled={loading} type="button">
      {loading ? "Adding..." : "Add to Cart"}
    </button>
  );
}