import { fetcher } from "./client";

// --- TYPES ---

// Matches the item structure required by your Order Model
export type CartItem = {
  productId: string;
  variantId: string;
  name: string;
  size: string;
  quantity: number;
  price: number;
  image?: string;
};

// Matches the Shipping Address structure in your Order Model
export type ShippingDetails = {
  fullName: string;
  email: string; // Add email to shipping details as well for convenience
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
};

// The payload sent to POST /api/payment/initialize
type PaymentInitData = {
  email: string;
  amount: number; // Total in Naira
  items: CartItem[];
  shippingAddress: ShippingDetails; // Backend needs this to save the order
  userId?: string; // Optional
};

// The response from POST /api/payment/initialize
type PaymentInitResponse = {
  message: string;
  data: {
    link: string; // The Paystack checkout URL
    reference: string; // The transaction reference
  };
};

// Define the Order type to match your order structure
type Order = {
  id: string;
  userId: string;
  items: CartItem[];
  shippingAddress: ShippingDetails;
  totalAmount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  // Add other fields as needed
};

// The response from GET /api/payment/verify
type PaymentVerifyResponse = {
  status: "success" | "failed";
  order?: Order; // The full order object
  message?: string;
  error?: string;
};

// --- API METHODS ---

export const paymentApi = {
  /**
   * Initializes a transaction.
   * 1. Saves order to DB as 'Pending'
   * 2. Returns Paystack checkout link
   */
  initialize: (data: PaymentInitData) => {
    return fetcher<PaymentInitResponse>("/payment/initialize", {
      method: "POST",
      body: data,
    });
  },

  /**
   * Verifies a transaction status.
   * Called by the Callback Page after user returns from Paystack.
   */
  verify: (reference: string) => {
    return fetcher<PaymentVerifyResponse>(
      `/payment/verify?reference=${reference}`,
      {
        method: "GET",
      },
    );
  },
};
