"use client";

import styles from "./Header.module.css";
import { useState, useEffect } from "react";
import CartDrawer from "../CartDrawer/CartDrawer";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartOpen, openCart, closeCart, cart } = useCart();

  useEffect(() => {
    if (menuOpen || cartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, cartOpen]);

  return (
    <div>
      <div className={styles.headerParent}>
        <div className={styles.headerChild}>
          <a href="/">
            <img
              src="/icons/logo.svg"
              alt="Bunny Logo"
              className={styles.logo}
            />
          </a>
        </div>

        <nav
          className={`${styles.headerChild} ${styles.nav} ${
            menuOpen ? styles.navOpen : ""
          }`}
        >
          <ul className={styles.navContainer}>
            <li className={styles.navItem}>
              <a className={styles.dropdownArrow} href="/shop">
                Shop
              </a>
              <ul className={styles.navDropdown}>
                <li>
                  <a href="/shop/accessories">Accessories</a>
                </li>
                <li>
                  <a href="/shop/clothing">Clothing</a>
                </li>
              </ul>
            </li>
            <li className={styles.navItem}>
              <a href="/about">About</a>
            </li>
            <li className={styles.navItem}>
              <a href="/construction">Contact</a>
            </li>
          </ul>
        </nav>

        <button
          className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
          onClick={() => {
            setMenuOpen(!menuOpen);
            if (cartOpen) closeCart();
          }}
          aria-label="Toggle menu"
          type="button"
        >
          <span />
          <span />
          <span />
        </button>

        <button
          className={`${styles.headerChild} ${styles.bagIconContainer}`}
          onClick={() => {
            openCart();
            if (menuOpen) setMenuOpen(false);
          }}
          aria-label="Open cart"
          type="button"
        >
          <img
            src="/icons/bag.svg"
            alt="Cart"
            className={styles.bagIcon}
          />
          {!!cart?.totalQuantity && (
            <span className={styles.cartCount}>{cart.totalQuantity}</span>
          )}
        </button>
      </div>

      <CartDrawer />
      
    </div>
  );
}