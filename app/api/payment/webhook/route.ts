import { NextResponse } from "next/server";
import crypto from "crypto";
import connectDB from "@/lib/db";
import Order from "@/models/Order";

export async function POST(req: Request) {
  try {
    await connectDB();

    // 1. Validate the Event (Security)
    // Paystack sends a signature in headers to prove it's really them
    const secret = process.env.PAYSTACK_SECRET_KEY as string;
    const signature = req.headers.get("x-paystack-signature");

    // We need the raw body as a string to verify the signature
    const bodyBuffer = await req.arrayBuffer();
    const bodyString = Buffer.from(bodyBuffer).toString("utf-8");

    const hash = crypto
      .createHmac("sha512", secret)
      .update(bodyString)
      .digest("hex");

    if (hash !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // 2. Parse the body
    const event = JSON.parse(bodyString);

    // 3. Handle "Charge Success"
    if (event.event === "charge.success") {
      const { reference, amount } = event.data;

      const order = await Order.findOne({ reference });

      if (order && order.status !== "Success") {
        // Double check amount (Amount comes in Kobo from webhook)
        if (amount / 100 >= order.amount) {
          order.status = "Success";
          order.paidAt = new Date();
          await order.save();
        }
      }
    }

    // Always return 200 OK to Paystack so they stop retrying
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
