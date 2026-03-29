"use client";

import { useState } from "react";

export default function CheckoutButton() {
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    try {
      setLoading(true);

      const cartId = localStorage.getItem("cartId");
      const savedCheckoutUrl = localStorage.getItem("checkoutUrl");

      if (!cartId && !savedCheckoutUrl) return;

      if (savedCheckoutUrl) {
        window.location.href = savedCheckoutUrl;
        return;
      }

      const res = await fetch(`/api/cart/${encodeURIComponent(cartId!)}`);
      const cart = await res.json();

      if (!res.ok) {
        throw new Error(cart.error || "Failed to fetch cart");
      }

      if (cart?.checkoutUrl) {
        localStorage.setItem("checkoutUrl", cart.checkoutUrl);
        window.location.href = cart.checkoutUrl;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button onClick={handleCheckout} disabled={loading} type="button">
      {loading ? "Loading..." : "Checkout"}
    </button>
  );
}