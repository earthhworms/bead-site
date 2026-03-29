import { NextResponse } from "next/server";
import { getCart } from "@/lib/shopify";

type Context = {
  params: Promise<{ cartId: string }>;
};

export async function GET(_: Request, context: Context) {
  try {
    const { cartId } = await context.params;

    if (!cartId) {
      return NextResponse.json({ error: "Missing cartId" }, { status: 400 });
    }

    const cart = await getCart(cartId);

    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    return NextResponse.json(cart);
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to fetch cart",
      },
      { status: 500 }
    );
  }
}