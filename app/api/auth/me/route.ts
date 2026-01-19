import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import connectDB from "@/lib/db";
import User from "@/models/User";

// 1. Define the specific shape of your Token Payload
interface DecodedToken extends JwtPayload {
  userId: string;
  role: string;
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ user: null });
    }

    // 2. Verify Token and cast to the specific interface
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

    await connectDB();
    const user = await User.findById(decoded.userId).select("-password"); // Exclude password

    if (!user) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    // If token verification fails (expired/invalid), return null
    return NextResponse.json({ user: null });
  }
}
