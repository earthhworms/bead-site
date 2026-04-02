import styles from './page.module.css'

export default function NotFound() {
  return (
    <main className={styles.errorPage}>

        <img className={styles.bunnyImg} src="/images/404-bunny.png" alt="" />
        <span className={styles.divider}></span>
        <div className={styles.errorContainer}>
            <h1>404</h1>
            <p>the page ur looking for does not exist</p>
            
        </div>
      
    </main>
  );
}