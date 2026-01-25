"use client";

import styles from "./Header.module.css";
import { useState, useEffect } from "react";


export default function Header() {

    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
      if (menuOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
  
      // cleanup (important for route changes)
      return () => {
        document.body.style.overflow = "";
      };
    }, [menuOpen]);

  return (
    <div>
        <div className={styles.headerParent}>
            <div className={styles.headerChild}>
                <img
                    src="/icons/logo.svg"
                    alt="Bunny Logo"
                    className={styles.logo}
                />
            </div>
            <nav
            className={`${styles.headerChild} ${styles.nav} ${
            menuOpen ? styles.navOpen : ""
            }`}>
                <ul className={styles.navContainer}>
                    <li className={styles.navItem}><a href="">Shop</a></li>
                    <li className={styles.navItem}><a href="">About</a></li>
                    <li className={styles.navItem}><a href="">Contact</a></li>
                </ul>
            </nav>
            <button
                className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
            >
                <span />
                <span />
                <span />
            </button>
            <div className={`${styles.headerChild} ${styles.bagIconContainer}`}>
                <img
                    src="/icons/bag.svg"
                    alt="Cart"
                    className={styles.bagIcon}
                />
            </div>
        </div>
        <img
            src="/icons/header-wave.svg"
            className={styles.waves}
            
        />
    </div>
  );
}