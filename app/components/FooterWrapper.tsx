"use client"; // This is required to use the pathname hook

import { usePathname } from "next/navigation";
import Footer from "./footer";

export default function FooterWrapper() {
  const pathname = usePathname();

  // List of paths where you want the footer HIDDEN
  const hiddenPaths = ["/"];

  // If the current path is in the hidden list, return nothing
  if (hiddenPaths.includes(pathname)) {
    return null;
  }

  // Otherwise, show the footer
  return <Footer />;
}
