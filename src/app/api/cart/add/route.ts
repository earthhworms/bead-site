import { NextResponse } from "next/server";
import { addToCart } from "@/lib/shopify";

export async function POST(req: Request) {
  try {
    const { cartId, merchandiseId, quantity } = await req.json();

    if (!cartId || !merchandiseId) {
      return NextResponse.json(
        { error: "Missing cartId or merchandiseId" },
        { status: 400 }
      );
    }

    const cart = await addToCart(cartId, merchandiseId, quantity ?? 1);
    return NextResponse.json(cart);
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to add to cart",
      },
      { status: 500 }
    );
  }
}