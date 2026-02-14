import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function must be named "middleware" and exported
export function middleware(request: NextRequest) {
  // 1. Get the token from cookies
  const token = request.cookies.get("auth_token")?.value;

  // 2. Define which paths need protection
  // You can add more paths here (e.g., /api/products/create)
  const isProtectedPath = request.nextUrl.pathname.startsWith("/admin");

  // 3. Logic: If trying to access admin without a token, redirect to login
  if (isProtectedPath && !token) {
    const loginUrl = new URL("/auth/signin", request.url);
    // Optional: Add ?from=... to redirect back after login
    loginUrl.searchParams.set("from", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 4. Allow the request to continue
  return NextResponse.next();
}

// 5. Config: Tell Next.js which paths triggers this middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes) -> We handle API auth checks inside the route handlers usually,
     *   but you can add '/api/admin/:path*' here if you want to protect backend routes too.
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - auth (login/signup pages)
     */
    "/admin/:path*",
    // "/api/products/create", // Uncomment if you want to block API calls too
  ],
};
