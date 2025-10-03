import { NextRequest, NextResponse } from "next/server";
import MidtransClient from "midtrans-client";

const snap = new MidtransClient.Snap({
  isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
  serverKey: process.env.MIDTRANS_SERVER_KEY || "",
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || "",
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { order_id, gross_amount, items = [], customer = {} } = body;

    const parameter = {
      transaction_details: {
        order_id: order_id || `order-${Date.now()}`,
        gross_amount: gross_amount || 0,
      },
      item_details: items,
      customer_details: customer,
    };

    const snapToken = await snap.createTransactionToken(parameter);
    return NextResponse.json({ token: snapToken });
  } catch (err) {
    console.error("Midtrans create token error:", err);
    return NextResponse.json({ error: err || "failed" }, { status: 500 });
  }
}