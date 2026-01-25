import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.title}>
          <h1>HAND <br></br>MADE <br></br>RAVE<br></br>GEAR</h1>
          <h2>FOR RAVERS, <br></br>BY A RAVER</h2>
          <a className={styles.landingButton}>SHOP ITEMS</a>
        </div>
      </main>
    </div>
  );
}
