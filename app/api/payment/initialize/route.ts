import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Order from "@/models/Order";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { email, amount, items, userId, shippingAddress } = body;

    if (!email || !amount || !items) {
      return NextResponse.json(
        { error: "Missing required payment details" },
        { status: 400 },
      );
    }

    const reference = `ICE-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // 1. Save Order as USD
    await Order.create({
      userId,
      email,
      reference,
      amount: amount,
      currency: "USD", // <--- Database now knows this is Dollars
      items,
      shippingAddress,
      status: "Pending",
    });

    const paystackUrl = "https://api.paystack.co/transaction/initialize";
    const secretKey = process.env.PAYSTACK_SECRET_KEY;

    // 2. Convert Dollars to Cents (Paystack expects lowest unit)
    // $50.00 = 5000 cents
    const amountInCents = Math.round(amount * 100);

    const callbackUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/checkout`;

    const response = await fetch(paystackUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: amountInCents,
        currency: "USD", // <--- Tells Paystack to charge in Dollars
        reference,
        callback_url: callbackUrl,
        channels: ["card"], // USD payments mostly support Cards only
        metadata: {
          cart_items: items,
          user_id: userId,
        },
      }),
    });

    const data = await response.json();

    if (!data.status) {
      console.error("Paystack Error:", data.message);
      return NextResponse.json(
        { error: data.message || "Paystack initialization failed" },
        { status: 400 },
      );
    }

    return NextResponse.json({
      message: "Payment initialized",
      data: {
        link: data.data.authorization_url,
        reference: reference,
      },
    });
  } catch (error: unknown) {
    console.error("Payment Init Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
