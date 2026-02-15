"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  ArrowLeft,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { authApi } from "@/lib/api/auth";
import { useAuth } from "../context/AuthContext";

// --- 1. SEPARATE THE FORM COMPONENT ---
function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  // State
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Check for "registered=true" in URL
  useEffect(() => {
    if (searchParams.get("registered")) {
      setSuccessMsg("Account established. Please identify yourself.");
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const data = await authApi.signin({
        email: formData.email,
        password: formData.password,
      });

      login(data.user);

      if (data.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/Collection"); // Or "/"
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Access denied. Verify credentials.");
      } else {
        setError("Access denied. Verify credentials.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-neutral-950 text-white font-sans selection:bg-white/20">
      {/* LEFT: THE ATMOSPHERE */}
      <div className="hidden lg:flex w-7/12 relative overflow-hidden bg-black items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-neutral-800 via-black to-black opacity-60"></div>
        <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
        <div className="relative z-10 select-none">
          <h1 className="text-[15vw] leading-[0.8] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-neutral-700 to-black opacity-40">
            ICE
          </h1>
        </div>
        <div className="absolute bottom-20 left-20 border-l border-white/20 pl-6">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500 mb-2">
            Collection 2025
          </p>
          <p className="text-xl font-serif italic text-white/80">
            &quot;Silence is the ultimate luxury.&quot;
          </p>
        </div>
      </div>

      {/* RIGHT: THE ACCESS PORTAL */}
      <div className="w-full lg:w-5/12 flex flex-col justify-center px-8 md:px-20 xl:px-32 relative z-20 bg-neutral-950 border-l border-white/5">
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] text-neutral-500 uppercase mb-12 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
            Back
          </Link>

          <div className="mb-12 space-y-4">
            <span className="inline-block w-8 h-[2px] bg-white/20 mb-4"></span>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-white tracking-tight">
              Client Access
            </h2>
            <p className="text-neutral-500 text-sm font-light tracking-wide leading-relaxed max-w-sm">
              Welcome back. Your private wardrobe and exclusive drops await.
            </p>
          </div>

          {successMsg && (
            <div className="mb-8 p-4 bg-green-900/10 border border-green-900/30 flex items-center gap-3 text-green-400 text-xs tracking-wide">
              <CheckCircle2 size={16} />
              {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="relative group">
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                required
                className="peer w-full bg-transparent border-b border-neutral-800 py-4 text-sm tracking-widest text-white placeholder-transparent focus:outline-none focus:border-white transition-all duration-500"
                placeholder="Email"
              />
              <label className="absolute left-0 -top-3 text-[10px] text-neutral-500 uppercase tracking-widest transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-neutral-600 peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-white">
                Email Address
              </label>
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-700 ease-out"></div>
            </div>

            <div className="relative group">
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                required
                className="peer w-full bg-transparent border-b border-neutral-800 py-4 text-sm tracking-widest text-white placeholder-transparent focus:outline-none focus:border-white transition-all duration-500"
                placeholder="Password"
              />
              <label className="absolute left-0 -top-3 text-[10px] text-neutral-500 uppercase tracking-widest transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-neutral-600 peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-white">
                Password
              </label>
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-700 ease-out"></div>
            </div>

            <div className="flex justify-between items-center">
              {error ? (
                <div className="flex items-center gap-2 text-red-400 text-[10px] tracking-wide">
                  <AlertCircle size={12} />
                  {error}
                </div>
              ) : (
                <div></div>
              )}
              <Link
                href="#"
                className="text-[10px] uppercase tracking-widest text-neutral-600 hover:text-white transition-colors"
              >
                Recover Password
              </Link>
            </div>

            <button
              disabled={isLoading}
              className="w-full relative overflow-hidden group bg-white text-black py-5 text-xs font-bold tracking-[0.25em] uppercase transition-all hover:bg-neutral-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 flex items-center justify-center gap-4">
                {isLoading ? (
                  <Loader2 className="animate-spin w-4 h-4" />
                ) : (
                  <>
                    Enter
                    <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" />
                  </>
                )}
              </span>
            </button>
          </form>

          <div className="mt-16 text-center lg:text-left">
            <p className="text-xs text-neutral-600 font-light tracking-wide">
              No account?{" "}
              <Link
                href="/signup"
                className="text-white hover:text-neutral-300 transition-colors ml-2 font-normal border-b border-white/20 pb-0.5 hover:border-white"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 2. WRAP WITH SUSPENSE (MAIN EXPORT) ---
export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <Loader2 className="animate-spin text-neutral-500" />
        </div>
      }
    >
      <SignInForm />
    </Suspense>
  );
}
