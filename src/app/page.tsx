import styles from "./page.module.css";
import RecentProducts from "@/components/RecentProducts/RecentProducts";

export default function Home() {
  return (
    <div>
      <div className={styles.page}>
        <div className={styles.wave}>
          <div className={styles.waveTrack}>
            <svg viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q1.25 0 2.5 5 T5 5 T7.5 5 T10 5 T12.5 5 T15 5 T17.5 5 T20 5 T22.5 5 T25 5 T27.5 5 T30 5 T32.5 5 T35 5 T37.5 5 T40 5 T42.5 5 T45 5 T47.5 5 T50 5 T52.5 5 T55 5 T57.5 5 T60 5 T62.5 5 T65 5 T67.5 5 T70 5 T72.5 5 T75 5 T77.5 5 T80 5 T82.5 5 T85 5 T87.5 5 T90 5 T92.5 5 T95 5 T97.5 5 T100 5 V10 H0 Z" />
            </svg>

            <svg viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q1.25 0 2.5 5 T5 5 T7.5 5 T10 5 T12.5 5 T15 5 T17.5 5 T20 5 T22.5 5 T25 5 T27.5 5 T30 5 T32.5 5 T35 5 T37.5 5 T40 5 T42.5 5 T45 5 T47.5 5 T50 5 T52.5 5 T55 5 T57.5 5 T60 5 T62.5 5 T65 5 T67.5 5 T70 5 T72.5 5 T75 5 T77.5 5 T80 5 T82.5 5 T85 5 T87.5 5 T90 5 T92.5 5 T95 5 T97.5 5 T100 5 V10 H0 Z" />
            </svg>
          </div>
        </div>

        <main className={styles.main}>
          <div></div>

          <div className={styles.title}>
            <h1 className={styles.rainbowText}>
              HAND <br />
              MADE <br />
              RAVE
              <br />
              GEAR
            </h1>

            <h2>
              FOR RAVERS, <br />
              BY A RAVER
            </h2>

            <a href="/shop/accessories" className={styles.landingButton}>SHOP ITEMS</a>
          </div>
        </main>

        <div className={styles.wave2}>
          <div className={styles.waveTrack2}>
            <svg viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q1.25 0 2.5 5 T5 5 T7.5 5 T10 5 T12.5 5 T15 5 T17.5 5 T20 5 T22.5 5 T25 5 T27.5 5 T30 5 T32.5 5 T35 5 T37.5 5 T40 5 T42.5 5 T45 5 T47.5 5 T50 5 T52.5 5 T55 5 T57.5 5 T60 5 T62.5 5 T65 5 T67.5 5 T70 5 T72.5 5 T75 5 T77.5 5 T80 5 T82.5 5 T85 5 T87.5 5 T90 5 T92.5 5 T95 5 T97.5 5 T100 5 V10 H0 Z" />
            </svg>

            <svg viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q1.25 0 2.5 5 T5 5 T7.5 5 T10 5 T12.5 5 T15 5 T17.5 5 T20 5 T22.5 5 T25 5 T27.5 5 T30 5 T32.5 5 T35 5 T37.5 5 T40 5 T42.5 5 T45 5 T47.5 5 T50 5 T52.5 5 T55 5 T57.5 5 T60 5 T62.5 5 T65 5 T67.5 5 T70 5 T72.5 5 T75 5 T77.5 5 T80 5 T82.5 5 T85 5 T87.5 5 T90 5 T92.5 5 T95 5 T97.5 5 T100 5 V10 H0 Z" />
            </svg>
          </div>
        </div>
      </div>

      <section className={styles.bannerSection}>
        <h2 className={styles.banner}>
          <i>SUSTAINABLE RAVE GEAR</i>
        </h2>
      </section>

      <section className={styles.recentsSection}>
        <h2 className={styles.recentsTitle}>RECENT PRODUCTS</h2>
        <RecentProducts />
      </section>

    <div className={styles.waveDivider}>
  <svg viewBox="0 0 120 6" preserveAspectRatio="none">
    <path d="M0 3 
             Q2 1 4 4 
             T8 3 
             T12 3 
             T16 3 
             T20 3 
             T24 3 
             T28 3 
             T32 3 
             T36 3 
             T40 3 
             T44 3 
             T48 3 
             T52 3 
             T56 3 
             T60 3 
             T64 3 
             T68 3 
             T72 3 
             T76 3 
             T80 3 
             T84 3 
             T88 3 
             T92 3 
             T96 3 
             T100 3 
             T104 3 
             T108 3 
             T112 3 
             T116 3 
             T120 3 
             T124 3
             T128 3
             T134 3
             V6 H0 Z" />
  </svg>
</div>
<section className={styles.upcycledSection}>
  <div className={styles.upcycledFlex}>
    <img className={styles.upcycledImg} src="/images/upcycled-skirt.jpg" alt="" />
    <div className={styles.upcycledFlexDiv}>
      <h2>MADE WITH RECYCLED MATERIAL RIGHT IN THE U.S.</h2>
      <p>All clothing is made from thrifted materials, cut and upcycled into new pieces. <b>Every scrap is used—nothing goes to waste.</b></p>
      <a href="/shop/clothing" className={styles.ctaButton1}>SHOP CLOTHING</a>
    </div>
    
  </div>
</section>
<div className={styles.waveDividerReversed}>
  <svg viewBox="0 0 120 6" preserveAspectRatio="none">
    <path d="M0 3 
             Q2 1 4 4 
             T8 3 
             T12 3 
             T16 3 
             T20 3 
             T24 3 
             T28 3 
             T32 3 
             T36 3 
             T40 3 
             T44 3 
             T48 3 
             T52 3 
             T56 3 
             T60 3 
             T64 3 
             T68 3 
             T72 3 
             T76 3 
             T80 3 
             T84 3 
             T88 3 
             T92 3 
             T96 3 
             T100 3 
             T104 3 
             T108 3 
             T112 3 
             T116 3 
             T120 3 
             T124 3
             T128 3
             T134 3
             V6 H0 Z" />
  </svg>
</div>

<section className={styles.ctaSection}>
    <div className={styles.ctaFlex}>
      <h2>WANT TO AVOID FAST FASHION?
      </h2>
      <a href="/shop/clothing" className={styles.ctaButton2}>SEE ALL</a>
    </div>
</section>

<div className={styles.waveDividerYellow}>
  <svg viewBox="0 0 120 6" preserveAspectRatio="none">
    <path d="M0 3 
             Q2 1 4 4 
             T8 3 
             T12 3 
             T16 3 
             T20 3 
             T24 3 
             T28 3 
             T32 3 
             T36 3 
             T40 3 
             T44 3 
             T48 3 
             T52 3 
             T56 3 
             T60 3 
             T64 3 
             T68 3 
             T72 3 
             T76 3 
             T80 3 
             T84 3 
             T88 3 
             T92 3 
             T96 3 
             T100 3 
             T104 3 
             T108 3 
             T112 3 
             T116 3 
             T120 3 
             T124 3
             T128 3
             T134 3
             V6 H0 Z" />
  </svg>
</div>

    </div>
  );
}