"use client";

import { useState } from "react";
import styles from "./CartDrawer.module.css";
import CheckoutButton from "../CheckoutButton";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const { cartOpen, closeCart, cart, setCart } = useCart();
  const [loadingLineId, setLoadingLineId] = useState<string | null>(null);

  if (!cartOpen) return null;

  const lines = cart?.lines?.nodes ?? [];

  async function handleRemove(lineId: string) {
    try {
      const cartId = localStorage.getItem("cartId");
      if (!cartId) return;

      setLoadingLineId(lineId);

      const res = await fetch("/api/cart/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartId,
          lineId,
        }),
      });

      const updatedCart = await res.json();

      if (!res.ok) {
        throw new Error(updatedCart.error || "Failed to remove item");
      }

      setCart(updatedCart);
      localStorage.setItem("checkoutUrl", updatedCart.checkoutUrl);

      if ((updatedCart?.totalQuantity ?? 0) === 0) {
        localStorage.removeItem("checkoutUrl");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingLineId(null);
    }
  }

  async function handleDecrease(lineId: string, currentQty: number) {
    const cartId = localStorage.getItem("cartId");
    if (!cartId) return;

    if (currentQty <= 1) {
      await handleRemove(lineId);
      return;
    }

    try {
      setLoadingLineId(lineId);

      const res = await fetch("/api/cart/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartId,
          lineId,
          quantity: currentQty - 1,
        }),
      });

      const updatedCart = await res.json();

      if (!res.ok) {
        throw new Error(updatedCart.error || "Failed to update quantity");
      }

      setCart(updatedCart);
      localStorage.setItem("checkoutUrl", updatedCart.checkoutUrl);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingLineId(null);
    }
  }

  async function handleIncrease(lineId: string, currentQty: number) {
    const cartId = localStorage.getItem("cartId");
    if (!cartId) return;

    try {
      setLoadingLineId(lineId);

      const res = await fetch("/api/cart/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartId,
          lineId,
          quantity: currentQty + 1,
        }),
      });

      const updatedCart = await res.json();

      if (!res.ok) {
        throw new Error(updatedCart.error || "Failed to update quantity");
      }

      setCart(updatedCart);
      localStorage.setItem("checkoutUrl", updatedCart.checkoutUrl);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingLineId(null);
    }
  }

  return (
    <>
      <div className={styles.overlay} onClick={closeCart} />

      <aside className={styles.drawer}>
        <div className={styles.header}>
          <h2 className={styles.title}>Cart · {cart?.totalQuantity ?? 0}</h2>
          <button
            className={styles.closeButton}
            onClick={closeCart}
            aria-label="Close cart"
            type="button"
          >
            ×
          </button>
        </div>

        <div className={styles.content}>
          {lines.length === 0 ? (
            <>
              <p className={styles.emptyText}>Your cart is empty.</p>
              <p className={styles.emptySubtext}>
                Add products, then continue to checkout.
              </p>
            </>
          ) : (
            lines.map((line) => (
              <div key={line.id} className={styles.cartItem}>
                {line.merchandise.image && (
                  <img
                    src={line.merchandise.image.url}
                    alt={
                      line.merchandise.image.altText ||
                      line.merchandise.product.title
                    }
                    className={styles.cartItemImage}
                  />
                )}

                <div className={styles.cartItemInfo}>
                  <p className={styles.cartItemTitle}>
                    {line.merchandise.product.title}
                  </p>
                  <p className={styles.cartItemVariant}>
                    {line.merchandise.title}
                  </p>

                  <div className={styles.cartControls}>
                    <button
                      type="button"
                      className={styles.qtyButton}
                      onClick={() => handleDecrease(line.id, line.quantity)}
                      disabled={loadingLineId === line.id}
                    >
                      −
                    </button>

                    <span className={styles.qtyValue}>{line.quantity}</span>

                    <button
                      type="button"
                      className={styles.qtyButton}
                      onClick={() => handleIncrease(line.id, line.quantity)}
                      disabled={loadingLineId === line.id}
                    >
                      +
                    </button>

                    <button
                      type="button"
                      className={styles.removeButton}
                      onClick={() => handleRemove(line.id)}
                      disabled={loadingLineId === line.id}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <p className={styles.cartItemPrice}>
                  {line.merchandise.price.currencyCode}{" "}
                  {line.merchandise.price.amount}
                </p>
              </div>
            ))
          )}
        </div>

        <div className={styles.footer}>
          <CheckoutButton />
        </div>
      </aside>
    </>
  );
}