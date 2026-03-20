type ShopifyError = { message: string };

export async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, any>
): Promise<T> {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const publicToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  const privateToken = process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN;
  const version = process.env.SHOPIFY_API_VERSION ?? "2024-01";

  if (!domain) throw new Error("Missing SHOPIFY_STORE_DOMAIN");
  if (!publicToken && !privateToken) {
    throw new Error(
      "Missing SHOPIFY_STOREFRONT_ACCESS_TOKEN or SHOPIFY_STOREFRONT_PRIVATE_TOKEN"
    );
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (privateToken) {
    headers["Shopify-Storefront-Private-Token"] = privateToken;
  } else {
    headers["X-Shopify-Storefront-Access-Token"] = publicToken!;
  }

  const res = await fetch(`https://${domain}/api/${version}/graphql.json`, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  const json = (await res.json()) as { data?: T; errors?: ShopifyError[] };

  if (!res.ok) {
    throw new Error(`Shopify HTTP ${res.status}: ${JSON.stringify(json)}`);
  }
  if (json.errors?.length) {
    throw new Error(`Shopify GraphQL errors: ${JSON.stringify(json.errors)}`);
  }
  if (!json.data) throw new Error("No data returned from Shopify");

  return json.data;
}

type ShopifyProductResponse = {
  product: {
    id: string;
    title: string;
    handle: string;
    description: string;
    images: {
      nodes: { url: string; altText: string | null }[];
    };
    variants: {
      nodes: {
        id: string;
        price: {
          amount: string;
          currencyCode: string;
        };
      }[];
    };
  } | null;
};

export async function getProduct(slug: string) {
  const data = await shopifyFetch<ShopifyProductResponse>(
    `
      query GetProduct($handle: String!) {
        product(handle: $handle) {
          id
          title
          handle
          description
          images(first: 10) {
            nodes {
              url
              altText
            }
          }
          variants(first: 10) {
            nodes {
              id
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    `,
    { handle: slug }
  );

  if (!data.product) return null;

  return {
    id: data.product.id,
    title: data.product.title,
    handle: data.product.handle,
    description: data.product.description,
    images: data.product.images.nodes,
    variants: data.product.variants.nodes,
    price: data.product.variants.nodes[0]?.price.amount ?? "0.00",
    currencyCode:
      data.product.variants.nodes[0]?.price.currencyCode ?? "USD",
  };
}