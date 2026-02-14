import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";

// Import the WRAPPERS, not the direct components
import NavbarWrapper from "./components/NavbarWrapper";
import FooterWrapper from "./components/FooterWrapper";
import { CartProvider } from "./context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Iceempire",
  description: "High Fashion Brand",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 1. Header is INSIDE body */}

        <CartProvider>
          <NavbarWrapper />
          <AuthProvider>{children}</AuthProvider>
        </CartProvider>

        {/* 3. Footer is INSIDE body */}
        <FooterWrapper />
      </body>
    </html>
  );
}
