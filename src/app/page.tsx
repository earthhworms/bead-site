import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.title}>
          <h1>HANDMADE RAVE GEAR</h1>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores a nesciunt fugit doloribus provident beatae iusto assumenda facere, id perferendis minus, laborum consectetur iste error maxime suscipit quis voluptatibus nam!</p>
        </div>
      </main>
    </div>
  );
}
