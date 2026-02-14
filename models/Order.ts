import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    // --- Customer Info ---
    userId: {
      type: String,
      required: false,
    }, // Optional: If user is logged in

    email: {
      type: String,
      required: true,
    }, // Required: For guest checkout and receipts

    // --- Payment Details ---
    reference: {
      type: String,
      required: true,
      unique: true,
    }, // The unique ID generated for Paystack (e.g., ICE-170...)

    transactionId: {
      type: String,
    }, // Paystack's internal ID (saved after verification)

    amount: {
      type: Number,
      required: true,
    }, // Saved in NAIRA (e.g., 5000)

    currency: {
      type: String,
      default: "NGN",
    },

    status: {
      type: String,
      enum: ["Pending", "Success", "Failed"],
      default: "Pending",
    },

    // --- Cart Contents ---
    // We snapshot the data (name, price, image) so if the product
    // changes later, the order history remains accurate.
    items: [
      {
        productId: { type: String, required: true },
        variantId: { type: String, required: true }, // To track specific size/color
        name: { type: String }, // e.g., "Obsidian Hoodie"
        size: { type: String }, // e.g., "L"
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }, // Price at moment of purchase
        image: { type: String }, // Thumbnail URL
      },
    ],

    // --- Fulfillment ---
    shippingAddress: {
      fullName: String,
      address: String,
      city: String,
      state: String,
      zipCode: String,
      phone: String,
    },

    paidAt: { type: Date }, // Timestamp when payment was verified
  },
  { timestamps: true },
);

// Prevent Next.js from recompiling the model during hot-reloads
const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;
