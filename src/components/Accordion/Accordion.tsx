"use client";

import { useState } from "react";
import styles from "./Accordion.module.css";

type AccordionItem = {
  title: string;
  content: string;
};

const items: AccordionItem[] = [
  {
    title: "BUILT IN LED",
    content:
      "Each pacifier features a built-in LED center that adds an extra glow to your fit, making it perfect for festivals, raves, and late-night sets.",
  },
  {
    title: "HARD OR SOFT TIPS",
    content:
      "Choose the feel that works best for you. Available with either hard or soft tips so you can pick your preferred comfort and style.",
  },
  {
    title: "HANDMADE PERLER ART",
    content:
      "Every piece is decorated with handmade perler art, giving each pacifier a playful, one-of-a-kind finish that stands out in any crowd.",
  },
];

export default function Accordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function toggleAccordion(index: number) {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <section className={styles.accordion}>
      {items.map((item, index) => (
        <div key={index} className={styles.item}>
          <button
  className={styles.header}
  onClick={() => toggleAccordion(index)}
>
  <span>{item.title}</span>
  <span
    className={`${styles.icon} ${
      openIndex === index ? styles.iconOpen : ""
    }`}
  >
    ^
  </span>
</button>

          {openIndex === index && (
            <div className={styles.content}>
              <p>{item.content}</p>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}