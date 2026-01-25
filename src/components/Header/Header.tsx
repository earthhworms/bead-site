import styles from "./Header.module.css";

export default function Header() {
  return (
    <div className={styles.headerParent}>
        <div className={styles.headerChild}>
            <h2>Logo</h2>
        </div>
        <nav className={`${styles.headerChild} ${styles.nav}`}>
            <ul className={styles.navContainer}>
                <li className={styles.navItem}>Contact</li>
                <li className={styles.navItem}>Shop</li>
                <li className={styles.navItem}>About</li>
            </ul>
        </nav>
        <div className={styles.headerChild}>
            <a href="">Cart</a>
        </div>
    </div>
  );
}