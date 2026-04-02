import styles from "./page.module.css";

export default function AboutPage() {
  return (
    <main className={styles.main}>
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
      <section className={styles.hero}>
        <h1 className={styles.rainbowText}>About</h1>
        <p className={styles.subtitle}>
          Upcycled pieces made from thrifted materials and reworked by hand.
        </p>
      </section>

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

      <section className={styles.section1}>
        <div className={styles.sectionContainer}>
          <h2>My Mission</h2>
        <p>
          Millions of festival outfits and accessories are bought every year - majority are only worn once before ending up in a landfill. This isn’t even including everyday wear. <b>Almost 100 million TONS are wasted each year.</b> My goal is to change that, as much as one person can do. 
          <br />
          <br /> 
          Almost every single piece of my clothing comes from thrifted materials. I turn these previously unwanted jeans, plushies, shirts, and shoes into durable and ADORABLE fashion statements that you’ll want to wear at every festival you go to. <b>Everything I make will be absolutely one of one - meaning you will never see someone wearing the same outfit as you!</b>
        </p>
        </div>
        
      </section>

      <section className={styles.section2}>
        
        <div className={styles.sectionContainer}>
          <div className={styles.imgGrid}>
          <img className={styles.sectionImg} src="/images/about-peach.jpg" alt="" />
          <img className={styles.sectionImg} src="/images/about-peach1.jpg" alt="" /></div>
        <div>
        <h2>Who I Am</h2>
        <p>
          My name is Bunny/Peach! In 2022, my older sister invited me to go to my first ever rave- EDC Orlando. Since then, I’ve absolutely fallen in love with it all. The people who become family, the music, the energy, and especially the artistic side of it. Since then, I’ve been to numerous festivals throughout the years, including <b>Lost Lands 🦖 , Okeechobee, Dancefestopia, and dozens more. </b>
          <br />
          <br />
          I love how raving has allowed me to tap into my creative side, and I love how much it’s taken over my life. I started with just creating trinkets to give away to friends I might meet at festivals, but it very quickly made me realize my love for art and creating. 
        </p>
        </div>
        </div>
        
      </section>
    </main>
  );
}