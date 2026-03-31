"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import styles from "./CheckoutButton.module.css";

export default function CheckoutButton() {
  const [loading, setLoading] = useState(false);
  const { cart } = useCart();

  const total =
    Number(cart?.cost?.totalAmount?.amount ?? 0).toFixed(2);

  async function handleCheckout() {
    try {
      setLoading(true);

      const checkoutUrl = localStorage.getItem("checkoutUrl");

      if (!checkoutUrl) {
        throw new Error("No checkout available");
      }

      window.location.href = checkoutUrl;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={loading || !cart || (cart.totalQuantity ?? 0) === 0}
      type="button"
      className={styles.checkoutButton}
    >
      {loading ? "LOADING..." : `CHECKOUT - ${total}`}
    </button>
  );
}