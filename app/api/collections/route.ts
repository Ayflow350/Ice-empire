import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Collection from "@/models/Collection";
import { uploadToCloudinary } from "@/lib/cloudinary";

// 1. GET: Fetch all collections
// Corresponds to: collectionApi.getAll()
export async function GET() {
  try {
    await connectDB();
    const collections = await Collection.find().sort({ createdAt: -1 });
    return NextResponse.json(collections);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch collections" },
      { status: 500 },
    );
  }
}

// 2. POST: Create a new collection
// Corresponds to: collectionApi.create(formData)
export async function POST(req: Request) {
  try {
    await connectDB();
    const formData = await req.formData();

    // Extract Text Data
    const title = formData.get("title") as string;
    const subtitle = formData.get("subtitle") as string;
    const dropCode = formData.get("dropCode") as string;
    const status = formData.get("status") as string;
    const releaseDate = formData.get("releaseDate") as string;
    const imageFile = formData.get("image") as File | null;

    if (!title || !dropCode || !imageFile) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Upload Image
    const imageUrl = await uploadToCloudinary(
      imageFile,
      "clothing-store/collections",
    );

    // Create Record
    const newCollection = await Collection.create({
      title,
      subtitle,
      dropCode,
      status: status || "Draft",
      releaseDate: releaseDate ? new Date(releaseDate) : new Date(),
      imageUrl,
      itemCount: 0,
    });

    return NextResponse.json(newCollection, { status: 201 });
  } catch (error) {
    console.error("Collection Create Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
