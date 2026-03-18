import Link from "next/link";
import Image from "next/image";
import { shopifyFetch } from "@/lib/shopify";
import styles from "./page.module.css";

type CollectionProductsQuery = {
  collection: {
    products: {
      edges: {
        node: {
          id: string;
          title: string;
          handle: string;
          featuredImage: { url: string; altText: string | null } | null;
          priceRange: {
            minVariantPrice: { amount: string; currencyCode: string };
          };
        };
      }[];
    };
  } | null;
}; 

export default async function AccessoriesPage() {
  const data = await shopifyFetch<CollectionProductsQuery>(`
    {
      collection(handle: "accessories") {
        products(first: 24) {
          edges {
            node {
              id
              title
              handle
              featuredImage {
                url
                altText
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  `);

  const products = data.collection?.products.edges.map((e) => e.node) ?? [];

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Accessories</h1>

      <ul className={styles.grid}>
        {products.map((p) => (
          <li key={p.id} className={styles.card}>
            <Link href={`/shop/${p.handle}`} className={styles.link}>
              <div className={styles.imageWrapper}>
                {p.featuredImage ? (
                  <Image
                    src={p.featuredImage.url}
                    alt={p.featuredImage.altText ?? p.title}
                    width={600}
                    height={600}
                    className={styles.image}
                  />
                ) : (
                  <div className={styles.imagePlaceholder} />
                )}
              </div>

              <div className={styles.productRow}>
                <div className={styles.productTitle}>{p.title}</div>
                <div className={styles.price}>
                  {Number(p.priceRange.minVariantPrice.amount).toFixed(2)}{" "}
                  {p.priceRange.minVariantPrice.currencyCode}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}