import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";
import User from "@/models/User";

export async function POST(req: Request) {
  const timestamp = new Date().toISOString();

  try {
    console.log(`\n--- 🏁 [AUTH_REGISTER_START] ${timestamp} ---`);

    // 1. Connection Logging
    console.log("⏳ [DB]: Attempting connection...");
    await connectDB();
    console.log("✅ [DB]: Connection established.");

    // 2. Parse and Log Request Body (Safety: No password logged)
    const body = await req.json();
    const { name, email, password } = body;
    console.log("📩 [REQUEST_BODY]:", {
      name,
      email,
      hasPassword: !!password,
      passwordLength: password?.length,
    });

    // 3. Validation Logging
    if (!name || !email || !password) {
      console.warn("⚠️ [VALIDATION_ERROR]: Missing required fields.");
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // 4. Duplicate Check Logging
    console.log(`🔍 [DB_QUERY]: Checking if user ${email} exists...`);
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.warn(
        `⚠️ [AUTH_CONFLICT]: Registration denied. User ${email} already exists.`,
      );
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 },
      );
    }

    // 5. Password Hashing Logging
    console.log("🔐 [SECURITY]: Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log("🔐 [SECURITY]: Hash generated successfully.");

    // 6. User Creation Logging
    console.log("👤 [DB_ACTION]: Creating user record...");
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    console.log(
      `✅ [REGISTRATION_SUCCESS]: User created with ID: ${newUser._id}`,
    );
    console.log(`--- 🔚 [AUTH_REGISTER_END] ---\n`);

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 },
    );
  } catch (error: unknown) {
    // --- EXPLICIT ERROR LOGGING: SEE EVERYTHING ---
    console.error(`\n❌ [CRITICAL_REGISTRATION_ERROR] ${timestamp}`);
    console.error("--------------------------------------------------");
    if (error instanceof Error) {
      console.error(`Error Type:    ${error.name || "Unknown Error"}`);
      console.error(`Error Message: ${error.message}`);
      // This shows you exactly which line of code failed
      console.error("Stack Trace:");
      console.error(error.stack);
      return NextResponse.json(
        {
          error: "Registration failed",
          debug: error.message, // Sending message to frontend can help debug, remove for production
        },
        { status: 500 },
      );
    } else if (typeof error === "object" && error !== null && "code" in error) {
      // Handle MongoDB errors with code property
      console.error(`Error Code:    ${error.code}`);
      return NextResponse.json(
        {
          error: "Registration failed",
          debug: String(error),
        },
        { status: 500 },
      );
    } else {
      console.error("Unknown error:", error);
      return NextResponse.json(
        {
          error: "Registration failed",
          debug: String(error),
        },
        { status: 500 },
      );
    }
    console.error("--------------------------------------------------\n");
  }
}
