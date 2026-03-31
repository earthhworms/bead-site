import Link from "next/link";
import Image from "next/image";
import { shopifyFetch } from "@/lib/shopify";
import styles from "./RecentProducts.module.css"

type RecentProductsQuery = {
  products: {
    edges: {
      node: {
        id: string;
        title: string;
        handle: string;
        featuredImage: {
          url: string;
          altText: string | null;
        } | null;
        priceRange: {
          minVariantPrice: {
            amount: string;
            currencyCode: string;
          };
        };
      };
    }[];
  };
};

export default async function RecentProducts() {
  const data = await shopifyFetch<RecentProductsQuery>(`
    {
      products(first: 12, sortKey: CREATED_AT, reverse: true) {
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
  `);

  const products = data.products.edges.map((edge) => edge.node);

  return (
    <section>

      <div className={styles.scrollContainer}>
  <div className={styles.scrollTrack}>
    {products.map((product) => (
      <Link key={product.id} href={`/shop/${product.handle}`}>
        <div className={styles.card}>
          {product.featuredImage ? (
            <Image
              src={product.featuredImage.url}
              alt={product.featuredImage.altText ?? product.title}
              width={500}
              height={500}
              className={styles.image}
            />
          ) : (
            <div>No image</div>
          )}

          <h3 className={styles.productTitle}>{product.title}</h3>

          <p className={styles.productPrice}>
            ${Number(product.priceRange.minVariantPrice.amount).toFixed(2)}
          </p>
        </div>
      </Link>
    ))}
  </div>
</div>
    </section>
  );
}