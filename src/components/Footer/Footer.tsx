import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <img
              src="/icons/logo.svg"
              alt="Bunny Logo"
              className={styles.logo}
            />
        <h1 className={styles.footerGreeting}>THANKS FOR CHECKING US OUT</h1>
        
        <div className={styles.footerSection}>
            <ul>
              <li><a href="/shop/accessories">Accessories</a></li>
              <li><a href="/shop/clothing">Clothing</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/shipping">Shipping Policy</a></li>
              <li><a href="/returns">Return Policy</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
        </div>

      </div>
        <div className={styles.socialMedia}>
          <a href="https://instagram.com/bunnyonabender">
            <img
              src="/icons/insta.svg"
              alt="Insta Logo"
              className={styles.socialIcon}
            />
          </a>
        </div>
      <div className={styles.footerBottom}>
        <p>© {new Date().getFullYear()} Bunny on a Bender. All rights reserved.</p>
      </div>
    </footer>
  );
}