import { NextResponse } from "next/server";
import { updateCartLineQuantity } from "@/lib/shopify";

export async function POST(req: Request) {
  try {
    const { cartId, lineId, quantity } = await req.json();

    if (!cartId || !lineId || typeof quantity !== "number") {
      return NextResponse.json(
        { error: "Missing cartId, lineId, or quantity" },
        { status: 400 }
      );
    }

    const cart = await updateCartLineQuantity(cartId, lineId, quantity);
    return NextResponse.json(cart);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to update cart line",
      },
      { status: 500 }
    );
  }
}