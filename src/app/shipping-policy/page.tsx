import styles from "./shipping-policy.module.css";

export default function ShippingPolicyPage() {
  return (
    <main className={styles.page}>
      <section className={styles.container}>
        <h1 className={styles.title}>SHIPPING POLICY</h1>

        <p className={styles.text}>
          We ship all orders within 3–5 business days of receiving the order,
          but usually much quicker! You will be notified of any unexpected
          delays. Unless specified in your order notes, your order will be
          consolidated into as few individual packages as possible to help curb
          excessive waste.
        </p>
      </section>
    </main>
  );
}