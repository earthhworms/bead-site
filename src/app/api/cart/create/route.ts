import { NextResponse } from "next/server";
import { createCart } from "@/lib/shopify";

export async function POST(req: Request) {
  try {
    const { merchandiseId, quantity } = await req.json();

    if (!merchandiseId) {
      return NextResponse.json(
        { error: "Missing merchandiseId" },
        { status: 400 }
      );
    }

    const cart = await createCart(merchandiseId, quantity ?? 1);
    return NextResponse.json(cart);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to create cart",
      },
      { status: 500 }
    );
  }
}