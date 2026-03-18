import styles from "./page.module.css";
import Image from "next/image";

export default function Home() {
  return (
    <div>
    <div className={styles.page}>
       <div className={styles.wave}>
            <div className={styles.waveTrack}>
                <svg viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q1.25 0 2.5 5 T5 5 T7.5 5 T10 5 T12.5 5 T15 5 T17.5 5 T20 5 T22.5 5 T25 5 T27.5 5 T30 5 T32.5 5 T35 5 T37.5 5 T40 5 T42.5 5 T45 5 T47.5 5 T50 5 T52.5 5 T55 5 T57.5 5 T60 5 T62.5 5 T65 5 T67.5 5 T70 5 T72.5 5 T75 5 T77.5 5 T80 5 T82.5 5 T85 5 T87.5 5 T90 5 T92.5 5 T95 5 T97.5 5 T100 5 V10 H0 Z" />
                </svg>

                {/* duplicate for seamless loop */}
                <svg viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q1.25 0 2.5 5 T5 5 T7.5 5 T10 5 T12.5 5 T15 5 T17.5 5 T20 5 T22.5 5 T25 5 T27.5 5 T30 5 T32.5 5 T35 5 T37.5 5 T40 5 T42.5 5 T45 5 T47.5 5 T50 5 T52.5 5 T55 5 T57.5 5 T60 5 T62.5 5 T65 5 T67.5 5 T70 5 T72.5 5 T75 5 T77.5 5 T80 5 T82.5 5 T85 5 T87.5 5 T90 5 T92.5 5 T95 5 T97.5 5 T100 5 V10 H0 Z" />
                </svg>
            </div>
        </div>
      <main className={styles.main}>
        <div>
        </div>
        <div className={styles.title}>
          <h1 className={styles.rainbowText}>HAND <br></br>MADE <br></br>RAVE<br></br>GEAR</h1>
          <h2>FOR RAVERS, <br></br>BY A RAVER</h2>
          <a className={styles.landingButton}>SHOP ITEMS</a>
        </div>
      </main>

      <div className={styles.wave2}>
            <div className={styles.waveTrack2}>
                <svg viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q1.25 0 2.5 5 T5 5 T7.5 5 T10 5 T12.5 5 T15 5 T17.5 5 T20 5 T22.5 5 T25 5 T27.5 5 T30 5 T32.5 5 T35 5 T37.5 5 T40 5 T42.5 5 T45 5 T47.5 5 T50 5 T52.5 5 T55 5 T57.5 5 T60 5 T62.5 5 T65 5 T67.5 5 T70 5 T72.5 5 T75 5 T77.5 5 T80 5 T82.5 5 T85 5 T87.5 5 T90 5 T92.5 5 T95 5 T97.5 5 T100 5 V10 H0 Z" />
                </svg>

                {/* duplicate for seamless loop */}
                <svg viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q1.25 0 2.5 5 T5 5 T7.5 5 T10 5 T12.5 5 T15 5 T17.5 5 T20 5 T22.5 5 T25 5 T27.5 5 T30 5 T32.5 5 T35 5 T37.5 5 T40 5 T42.5 5 T45 5 T47.5 5 T50 5 T52.5 5 T55 5 T57.5 5 T60 5 T62.5 5 T65 5 T67.5 5 T70 5 T72.5 5 T75 5 T77.5 5 T80 5 T82.5 5 T85 5 T87.5 5 T90 5 T92.5 5 T95 5 T97.5 5 T100 5 V10 H0 Z" />
                </svg>
            </div>
        </div>
    </div>

      <section>

      </section>
    </div>
  );
}
