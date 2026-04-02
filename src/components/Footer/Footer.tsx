import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        
        <div className={styles.footerSection}>
          <img
              src="/icons/logo.svg"
              alt="Bunny Logo"
              className={styles.logo}
            />
          <p>Upcycled fashion made in the U.S.</p>
        </div>

        <div className={styles.footerSection}>
          <h2>Shop</h2>
          <ul>
            <li><a href="/shop/accessories">Accessories</a></li>
            <li><a href="/shop/clothing">Clothing</a></li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h2>Info</h2>
          <ul>
            <li><a href="/about">About</a></li>
            <li><a href="/shipping">Shipping</a></li>
            <li><a href="/returns">Returns</a></li>
          </ul>
        </div>

        <div className={styles.socialMedia}>
          <img
              src="/icons/insta.svg"
              alt="Insta Logo"
              className={styles.socialIcon}
            />
        </div>

      </div>

      <div className={styles.footerBottom}>
        <p>© {new Date().getFullYear()} Bunny on a Bender. All rights reserved.</p>
      </div>
    </footer>
  );
}