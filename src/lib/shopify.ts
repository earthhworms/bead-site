// src/lib/shopify.ts
type ShopifyError = { message: string };

export async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, any>
): Promise<T> {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const publicToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN; // public token (if you use it)
  const privateToken = process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN; // private token (if you use it)
  const version = process.env.SHOPIFY_API_VERSION ?? "2024-01";

  if (!domain) throw new Error("Missing SHOPIFY_STORE_DOMAIN");
  if (!publicToken && !privateToken) {
    throw new Error("Missing SHOPIFY_STOREFRONT_ACCESS_TOKEN or SHOPIFY_STOREFRONT_PRIVATE_TOKEN");
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

  if (!res.ok) throw new Error(`Shopify HTTP ${res.status}: ${JSON.stringify(json)}`);
  if (json.errors?.length) throw new Error(`Shopify GraphQL errors: ${JSON.stringify(json.errors)}`);
  if (!json.data) throw new Error("No data returned from Shopify");

  return json.data;
}