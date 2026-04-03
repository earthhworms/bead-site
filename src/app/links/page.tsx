import styles from "./page.module.css";

export default function LinksPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <img
          src="/images/about-peach.jpg"
          alt="Bunny on a Bender logo"
          className={styles.logo}
        />

        <h1 className={styles.title}>Bunny on a Bender</h1>
        <p className={styles.subtitle}>
          check out my depop for some everyday clothing ive upcycled from the thrift, and my shopify for my rave biz! clothing, hats, spoons, jewelry, plushies, etc!
        </p>

        <div className={styles.links}>
          <a href="https://www.depop.com/bunnyonabender/" target="_blank" className={styles.linkButton}>Depop</a>
          <a href="https://www.depop.com/bunnyonabender/" target="_blank" className={styles.linkButton}>Insta Biz</a>
          <a href="/about" className={styles.linkButton}>Insta Main ~</a>
        </div>
      </div>
    </main>
  );
}