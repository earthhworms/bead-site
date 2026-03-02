import Link from "next/link";
import Image from "next/image";
import { shopifyFetch } from "@/lib/shopify";

type ProductsQuery = {
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
  };

  
export default async function ShopPage() {

    const data = await shopifyFetch<ProductsQuery>(`
        {
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
      `);

      const products = data.products.edges.map((e) => e.node);

      return (
        <main style={{ padding: 24 }}>
          <h1 style={{ fontSize: 32, marginBottom: 16 }}>Shop</h1>
    
          <ul
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 16,
              listStyle: "none",
              padding: 0,
            }}
          >
            {products.map((p) => (
              <li
                key={p.id}
                style={{
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 14,
                  padding: 14,
                }}
              >
                <Link href={`/shop/${p.handle}`} style={{ textDecoration: "none" }}>
                  <div style={{ marginBottom: 10 }}>
                    {p.featuredImage ? (
                      <Image
                        src={p.featuredImage.url}
                        alt={p.featuredImage.altText ?? p.title}
                        width={600}
                        height={600}
                        style={{
                          width: "100%",
                          height: 220,
                          objectFit: "cover",
                          borderRadius: 12,
                        }}
                        priority={false}
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: 220,
                          borderRadius: 12,
                          background: "rgba(255,255,255,0.06)",
                        }}
                      />
                    )}
                  </div>
    
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                    <div style={{ fontWeight: 600 }}>{p.title}</div>
                    <div style={{ opacity: 0.85, whiteSpace: "nowrap" }}>
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
  