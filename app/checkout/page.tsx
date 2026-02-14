"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  MapPin,
  CreditCard,
  ChevronRight,
  Loader2,
  CheckCircle,
  XCircle,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { paymentApi, ShippingDetails } from "@/lib/api/payment";

// Define the steps of the checkout process
type CheckoutStep = "SHIPPING" | "REVIEW" | "VERIFYING" | "SUCCESS" | "FAILED";

// --- RENDER: ORDER SUMMARY SIDEBAR ---
// Define a CartItem type based on your cart structure
type CartItem = {
  uniqueId: string;
  name: string;
  image?: string;
  color?: string;
  size?: string;
  price: number;
  quantity: number;
};

type OrderSummaryProps = {
  cartItems: CartItem[];
  cartTotal: number;
  SHIPPING_COST: number;
  GRAND_TOTAL: number;
};

const OrderSummary: React.FC<OrderSummaryProps> = ({
  cartItems,
  cartTotal,
  SHIPPING_COST,
  GRAND_TOTAL,
}) => (
  <div className="bg-zinc-900/30 border border-white/10 p-6 rounded-sm h-fit sticky top-24">
    <h3 className="text-sm font-bold uppercase tracking-widest mb-6 border-b border-white/10 pb-4">
      Order Summary
    </h3>
    <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar mb-6">
      {cartItems.map((item: CartItem) => (
        <div key={item.uniqueId} className="flex gap-4">
          <div className="w-12 h-16 bg-black border border-white/10 relative shrink-0">
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover opacity-80"
              />
            )}
            <span className="absolute -top-2 -right-2 w-4 h-4 bg-zinc-700 text-[10px] flex items-center justify-center rounded-full text-white">
              {item.quantity}
            </span>
          </div>
          <div className="flex-1">
            <h4 className="text-xs font-bold uppercase text-white line-clamp-1">
              {item.name}
            </h4>
            <p className="text-[10px] text-zinc-500 uppercase mt-1">
              {item.color} / {item.size}
            </p>
          </div>
          <span className="text-xs font-mono text-zinc-300">
            ${(item.price * item.quantity).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
    <div className="space-y-2 border-t border-white/10 pt-4 text-xs text-zinc-400">
      <div className="flex justify-between">
        <span>Subtotal</span>
        <span>${cartTotal.toLocaleString()}</span>
      </div>
      <div className="flex justify-between">
        <span>Shipping</span>
        <span>${SHIPPING_COST.toLocaleString()}</span>
      </div>
    </div>
    <div className="flex justify-between items-end border-t border-white/10 pt-4 mt-4">
      <span className="text-sm font-bold uppercase text-white">Total</span>
      <span className="text-xl font-mono text-white">
        ${GRAND_TOTAL.toLocaleString()}
      </span>
    </div>
  </div>
);

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { cartItems, cartTotal, clearCart } = useCart();

  // --- STATE ---
  const [step, setStep] = useState<CheckoutStep>("SHIPPING");
  const [isProcessing, setIsProcessing] = useState(false);
  const verifyAttempted = useRef(false); // Prevent double-fire in React Strict Mode

  // Shipping State
  const [shipping, setShipping] = useState<ShippingDetails>({
    fullName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
  });

  // Calculate Totals
  const SHIPPING_COST = 2500; // Flat rate
  const GRAND_TOTAL = cartTotal + SHIPPING_COST;

  // =========================================================
  // 1. LOGIC: HANDLE RETURN FROM PAYSTACK (VERIFICATION)
  // =========================================================
  useEffect(() => {
    const reference = searchParams.get("reference");

    // If URL has a reference, we are returning from Paystack
    if (reference && !verifyAttempted.current) {
      verifyAttempted.current = true;

      const verifyTransaction = async () => {
        setStep("VERIFYING");
        try {
          const res = await paymentApi.verify(reference);

          if (res.status === "success") {
            clearCart(); // Clear the cart context
            setStep("SUCCESS");
          } else {
            setStep("FAILED");
          }
        } catch (error) {
          console.error("Verification Error", error);
          setStep("FAILED");
        }
      };

      verifyTransaction();
    }
    // If no reference and cart is empty, kick user out (unless they just succeeded)
    else if (
      cartItems.length === 0 &&
      step !== "SUCCESS" &&
      step !== "VERIFYING"
    ) {
      router.push("/Collection"); // Or shop page
    }
  }, [searchParams, cartItems, clearCart, router, step]);

  // =========================================================
  // 2. HANDLERS
  // =========================================================

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handleGoToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !shipping.fullName ||
      !shipping.email ||
      !shipping.address ||
      !shipping.phone
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    setStep("REVIEW");
    window.scrollTo(0, 0);
  };

  const handlePaystackInit = async () => {
    setIsProcessing(true);
    try {
      // Initialize payment with backend
      const response = await paymentApi.initialize({
        email: shipping.email,
        amount: GRAND_TOTAL,
        items: cartItems,
        shippingAddress: shipping,
      });

      // Redirect to Paystack
      if (response.data?.link) {
        window.location.href = response.data.link;
      } else {
        alert("Could not initialize payment.");
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Init Error:", error);
      alert("Payment initialization failed.");
      setIsProcessing(false);
    }
  };

  // =========================================================
  // 3. RENDER HELPERS
  // =========================================================

  // --- RENDER: LOADING / VERIFYING STATE ---
  if (step === "VERIFYING") {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin w-12 h-12 text-zinc-500" />
        <h2 className="text-xl font-bold uppercase tracking-widest">
          Verifying Payment
        </h2>
        <p className="text-zinc-500 text-sm">
          Please do not close this window...
        </p>
      </div>
    );
  }

  // --- RENDER: SUCCESS STATE ---
  if (step === "SUCCESS") {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6 p-6">
        <CheckCircle className="w-20 h-20 text-green-500" />
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-black uppercase tracking-tighter">
            Order Confirmed
          </h1>
          <p className="text-zinc-400">Thank you for securing your artifact.</p>
        </div>
        <div className="bg-zinc-900 border border-white/10 p-6 rounded-sm w-full max-w-md">
          <div className="flex justify-between text-sm text-zinc-300 mb-4">
            <span>Payment Status</span>
            <span className="text-green-400 font-bold uppercase">Paid</span>
          </div>
          <p className="text-xs text-zinc-500 text-center">
            A confirmation email has been sent to your inbox.
          </p>
        </div>
        <button
          onClick={() => router.push("/")}
          className="bg-white text-black px-8 py-3 text-xs font-bold uppercase tracking-widest"
        >
          Return to Archives
        </button>
      </div>
    );
  }

  // --- RENDER: FAILED STATE ---
  if (step === "FAILED") {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6 p-6">
        <XCircle className="w-20 h-20 text-red-500" />
        <h1 className="text-3xl font-black uppercase tracking-tighter">
          Payment Failed
        </h1>
        <p className="text-zinc-400">We could not verify your transaction.</p>
        <button
          onClick={() => (window.location.href = "/checkout")}
          className="border border-white text-white px-8 py-3 text-xs font-bold uppercase tracking-widest"
        >
          Try Again
        </button>
      </div>
    );
  }

  // =========================================================
  // 4. MAIN RENDER (SHIPPING & PAYMENT FORMS)
  // =========================================================
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-zinc-500/30">
      {/* Header */}
      <div className="border-b border-white/10 sticky top-0 bg-black/90 backdrop-blur-md z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <h1 className="text-xl font-black tracking-[0.2em] uppercase">
            ICEEMPIRE
          </h1>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
            <ShieldCheck size={14} /> Secure Checkout
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* LEFT: Forms */}
          <div className="lg:col-span-7 space-y-8">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest mb-8">
              <span
                className={step === "SHIPPING" ? "text-white" : "text-zinc-500"}
              >
                1. Shipping
              </span>
              <ChevronRight size={14} className="text-zinc-700" />
              <span
                className={step === "REVIEW" ? "text-white" : "text-zinc-500"}
              >
                2. Payment
              </span>
            </div>

            {/* STEP 1: SHIPPING FORM */}
            {step === "SHIPPING" && (
              <form
                onSubmit={handleGoToPayment}
                className="animate-in fade-in slide-in-from-left-4 duration-500"
              >
                <h2 className="text-xl font-bold uppercase mb-6 flex items-center gap-3">
                  <MapPin className="text-zinc-500" /> Shipping Details
                </h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                      required
                      name="fullName"
                      value={shipping.fullName}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="FULL NAME"
                    />
                    <input
                      required
                      type="email"
                      name="email"
                      value={shipping.email}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="EMAIL"
                    />
                  </div>
                  <input
                    required
                    name="address"
                    value={shipping.address}
                    onChange={handleInputChange}
                    className="input-field w-full"
                    placeholder="ADDRESS"
                  />
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <input
                      required
                      name="city"
                      value={shipping.city}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="CITY"
                    />
                    <input
                      required
                      name="state"
                      value={shipping.state}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="STATE"
                    />
                    <input
                      required
                      name="phone"
                      value={shipping.phone}
                      onChange={handleInputChange}
                      className="input-field col-span-2 md:col-span-1"
                      placeholder="PHONE"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-white text-black py-4 font-black uppercase tracking-widest hover:bg-zinc-200 transition-colors mt-4"
                  >
                    Continue to Payment
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: PAYMENT REVIEW */}
            {step === "REVIEW" && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-xl font-bold uppercase mb-6 flex items-center gap-3">
                  <CreditCard className="text-zinc-500" /> Payment
                </h2>

                {/* Info Card */}
                <div className="bg-zinc-900/50 border border-white/10 p-6 mb-8 rounded-sm">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xs font-bold uppercase text-zinc-400 tracking-widest">
                      Ship To:
                    </h3>
                    <button
                      onClick={() => setStep("SHIPPING")}
                      className="text-xs text-white underline"
                    >
                      Edit
                    </button>
                  </div>
                  <p className="text-sm text-white mb-1">{shipping.fullName}</p>
                  <p className="text-sm text-zinc-400">
                    {shipping.address}, {shipping.city}
                  </p>
                  <p className="text-sm text-zinc-400">{shipping.phone}</p>
                </div>

                <div className="pt-4">
                  <button
                    onClick={handlePaystackInit}
                    disabled={isProcessing}
                    className="w-full bg-green-600 text-white py-4 font-black uppercase tracking-widest hover:bg-green-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="animate-spin" /> Processing...
                      </>
                    ) : (
                      `Pay$${GRAND_TOTAL.toLocaleString()}`
                    )}
                  </button>
                  <p className="text-[10px] text-zinc-500 text-center mt-4">
                    Secured by Paystack.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Summary */}
          <div className="lg:col-span-5">
            <OrderSummary
              cartItems={cartItems}
              cartTotal={cartTotal}
              SHIPPING_COST={SHIPPING_COST}
              GRAND_TOTAL={GRAND_TOTAL}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .input-field {
          width: 100%;
          background-color: #18181b; /* zinc-900 */
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 1rem;
          font-size: 0.875rem;
          color: white;
          outline: none;
          transition: border-color 0.2s;
        }
        .input-field:focus {
          border-color: white;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #3f3f46;
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
}
