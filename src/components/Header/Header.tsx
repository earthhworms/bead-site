import styles from "./Header.module.css";

export default function Header() {
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
        <nav className={`${styles.headerChild} ${styles.nav}`}>
            <ul className={styles.navContainer}>
                <li className={styles.navItem}>Contact</li>
                <li className={styles.navItem}>Shop</li>
                <li className={styles.navItem}>About</li>
            </ul>
        </nav>
        <div className={`${styles.headerChild} ${styles.bagIconContainer}`}>
            <img
                src="/icons/bag.svg"
                alt="Cart"
                className={styles.bagIcon}
            />
        </div>
        <div className={styles.hamburger}>

        </div>
    </div>
    <img
        src="/icons/header-wave.svg"
        className={styles.waves}
        
    />
    </div>
  );
}