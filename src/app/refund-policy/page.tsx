import styles from "./refund-policy.module.css";

export default function RefundPolicyPage() {
  return (
    <main className={styles.page}>
      <section className={styles.container}>
        <h1 className={styles.title}>
          REFUND
          <br />
          POLICY
        </h1>

        <div className={styles.content}>
          <p>
            We have a 7-day return policy, which means you have 7 days after
            receiving your item to request a return.
          </p>

          <p>
            To be eligible for a return, your item must be in the same condition
            that you received it, you’ll also need the receipt or proof of
            purchase.
          </p>

          <p>
            To start a return, you can contact us at{" "}
            <a href="mailto:hello@bunnyonabender.com">hello@bunnyonabender.com</a>.
          </p>

          <p>
            If your return is accepted, we’ll send you a return shipping label,
            as well as instructions on how and where to send your package. Items
            sent back to us without first requesting a return will not be
            accepted. Some items may be subject to a restocking fee of up to 5%.
          </p>

          <p>
            You can always contact us for any return questions at{" "}
            <a href="mailto:hello@bunnyonabender.com">hello@bunnyonabender.com</a>.
          </p>

          <div className={styles.section}>
            <h2>Damages and issues</h2>
            <p>
              Please inspect your order upon reception and contact us
              immediately if the item is defective, damaged or if you receive
              the wrong item, so that we can evaluate the issue and make it
              right.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}