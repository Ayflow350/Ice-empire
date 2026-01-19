import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies(); // Wait for the promise to resolve
  cookieStore.delete("auth_token");

  return NextResponse.json({ message: "Logged out successfully" });
}
