"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import type { ShopifyCart } from "@/lib/shopify";
import styles from "./AddToCartButton.module.css";

type Props = {
  variantId: string;
  price: string;
};

export default function AddToCartButton({ variantId, price }: Props) {
  const [loading, setLoading] = useState(false);
  const { setCart, openCart } = useCart();

  const formattedPrice = Number.isFinite(Number(price))
    ? Number(price).toFixed(2)
    : price;

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
    <button
      onClick={handleAddToCart}
      disabled={loading}
      type="button"
      className={styles.cartButton}
    >
      <img
        src="/icons/bag-black.svg"
        alt=""
        aria-hidden="true"
        className={styles.icon}
      />

      <span>
        {loading ? "Adding..." : `ADD TO CART - ${formattedPrice}`}
      </span>
    </button>
  );
}