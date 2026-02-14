import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Order from "@/models/Order";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const reference = searchParams.get("reference");

    if (!reference) {
      return NextResponse.json(
        { error: "No reference provided" },
        { status: 400 },
      );
    }

    const order = await Order.findOne({ reference });
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (order.status === "Success") {
      return NextResponse.json({ status: "success", order });
    }

    // Call Paystack Verify
    const verifyUrl = `https://api.paystack.co/transaction/verify/${reference}`;
    const response = await fetch(verifyUrl, {
      method: "GET",
      headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
    });

    const data = await response.json();

    if (!data.status || !data.data) {
      return NextResponse.json(
        { error: "Verification failed" },
        { status: 400 },
      );
    }

    const paystackData = data.data;

    // --- CRITICAL USD CHECKS ---
    const paidAmount = paystackData.amount / 100; // Cents to Dollars

    // 1. Check if success
    // 2. Check if amount matches
    // 3. Check if currency matches (Must be USD)
    if (
      paystackData.status === "success" &&
      paidAmount >= order.amount &&
      paystackData.currency === "USD"
    ) {
      order.status = "Success";
      order.paidAt = new Date();
      order.transactionId = paystackData.id;
      await order.save();

      return NextResponse.json({ status: "success", order });
    } else {
      order.status = "Failed";
      await order.save();
      return NextResponse.json(
        { error: "Payment failed, currency mismatch, or incorrect amount" },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error("Verify Error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
