import { notFound } from "next/navigation";
import { getProduct } from "@/lib/shopify";
import styles from "./page.module.css";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await getProduct(slug);

  if (!product) return notFound();

  return (
    <div className={styles.pageContainer}>
        {product.images[0] && (
        <img
        className={styles.productImage}
          src={product.images[0].url}
          alt={product.images[0].altText || product.title}
        />
      )}
      <h2>{product.title}</h2>
      <div className={styles.productDetails}>
        <p className={styles.price}>{product.price}</p>
        <p className={styles.description}>{product.description}</p>
      </div>
    </div>
  );
}