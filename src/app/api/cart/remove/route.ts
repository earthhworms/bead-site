import { NextResponse } from "next/server";
import { removeCartLine } from "@/lib/shopify";

export async function POST(req: Request) {
  try {
    const { cartId, lineId } = await req.json();

    if (!cartId || !lineId) {
      return NextResponse.json(
        { error: "Missing cartId or lineId" },
        { status: 400 }
      );
    }

    const cart = await removeCartLine(cartId, lineId);
    return NextResponse.json(cart);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to remove cart line",
      },
      { status: 500 }
    );
  }
}