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

  if (!json.data) {
    throw new Error("No data returned from Shopify");
  }

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
    options: {
      name: string;
      values: string[];
    }[];
    variants: {
      nodes: {
        id: string;
        title: string;
        availableForSale: boolean;
        selectedOptions: {
          name: string;
          value: string;
        }[];
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
          options {
            name
            values
          }
          variants(first: 100) {
            nodes {
              id
              title
              availableForSale
              selectedOptions {
                name
                value
              }
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
    options: data.product.options,
    variants: data.product.variants.nodes,
    price: data.product.variants.nodes[0]?.price.amount ?? "0.00",
    currencyCode: data.product.variants.nodes[0]?.price.currencyCode ?? "USD",
  };
}

export type CartLine = {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: {
      title: string;
      handle: string;
    };
    image: {
      url: string;
      altText: string | null;
    } | null;
    price: {
      amount: string;
      currencyCode: string;
    };
  };
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
  lines: {
    nodes: CartLine[];
  };
};

type CartCreateResponse = {
  cartCreate: {
    cart: ShopifyCart | null;
    userErrors: {
      field: string[] | null;
      message: string;
    }[];
  };
};

type CartLinesAddResponse = {
  cartLinesAdd: {
    cart: ShopifyCart | null;
    userErrors: {
      field: string[] | null;
      message: string;
    }[];
  };
};

type CartLinesUpdateResponse = {
  cartLinesUpdate: {
    cart: ShopifyCart | null;
    userErrors: {
      field: string[] | null;
      message: string;
    }[];
  };
};

type CartLinesRemoveResponse = {
  cartLinesRemove: {
    cart: ShopifyCart | null;
    userErrors: {
      field: string[] | null;
      message: string;
    }[];
  };
};

type GetCartResponse = {
  cart: ShopifyCart | null;
};

const CART_FIELDS = `
  id
  checkoutUrl
  totalQuantity
  cost {
    totalAmount {
      amount
      currencyCode
    }
  }
  lines(first: 20) {
    nodes {
      id
      quantity
      merchandise {
        ... on ProductVariant {
          id
          title
          product {
            title
            handle
          }
          image {
            url
            altText
          }
          price {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;

export async function createCart(merchandiseId: string, quantity = 1) {
  const data = await shopifyFetch<CartCreateResponse>(
    `
      mutation CartCreate($lines: [CartLineInput!]) {
        cartCreate(input: { lines: $lines }) {
          cart {
            ${CART_FIELDS}
          }
          userErrors {
            field
            message
          }
        }
      }
    `,
    {
      lines: [{ merchandiseId, quantity }],
    }
  );

  if (data.cartCreate.userErrors.length) {
    throw new Error(data.cartCreate.userErrors[0].message);
  }

  return data.cartCreate.cart;
}

export async function addToCart(
  cartId: string,
  merchandiseId: string,
  quantity = 1
) {
  const data = await shopifyFetch<CartLinesAddResponse>(
    `
      mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart {
            ${CART_FIELDS}
          }
          userErrors {
            field
            message
          }
        }
      }
    `,
    {
      cartId,
      lines: [{ merchandiseId, quantity }],
    }
  );

  if (data.cartLinesAdd.userErrors.length) {
    throw new Error(data.cartLinesAdd.userErrors[0].message);
  }

  return data.cartLinesAdd.cart;
}

export async function updateCartLineQuantity(
  cartId: string,
  lineId: string,
  quantity: number
) {
  const data = await shopifyFetch<CartLinesUpdateResponse>(
    `
      mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart {
            ${CART_FIELDS}
          }
          userErrors {
            field
            message
          }
        }
      }
    `,
    {
      cartId,
      lines: [{ id: lineId, quantity }],
    }
  );

  if (data.cartLinesUpdate.userErrors.length) {
    throw new Error(data.cartLinesUpdate.userErrors[0].message);
  }

  return data.cartLinesUpdate.cart;
}

export async function removeCartLine(cartId: string, lineId: string) {
  const data = await shopifyFetch<CartLinesRemoveResponse>(
    `
      mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart {
            ${CART_FIELDS}
          }
          userErrors {
            field
            message
          }
        }
      }
    `,
    {
      cartId,
      lineIds: [lineId],
    }
  );

  if (data.cartLinesRemove.userErrors.length) {
    throw new Error(data.cartLinesRemove.userErrors[0].message);
  }

  return data.cartLinesRemove.cart;
}

export async function getCart(cartId: string) {
  const data = await shopifyFetch<GetCartResponse>(
    `
      query GetCart($cartId: ID!) {
        cart(id: $cartId) {
          ${CART_FIELDS}
        }
      }
    `,
    { cartId }
  );

  return data.cart;
}