"use client";

import { usePathname } from "next/navigation";
import PublicNavbar from "./Navbar"; // Your PUBLIC website navbar

export default function NavbarWrapper() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  // 1. If we are on an Admin page, we might not want ANY navbar
  // (because AdminLayout usually has its own Sidebar).
  if (isAdmin) {
    return null;
  }

  // 2. Otherwise, show the Public Navbar
  return <PublicNavbar />;
}
