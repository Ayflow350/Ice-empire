import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Collection from "@/models/Collection";

// 3. DELETE: Remove a collection
// Corresponds to: collectionApi.delete(id)
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;

    const deletedCollection = await Collection.findByIdAndDelete(id);

    if (!deletedCollection) {
      return NextResponse.json(
        { error: "Collection not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: "Collection deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json(
      { error: "Failed to delete collection" },
      { status: 500 },
    );
  }
}

// 4. PATCH: Update a collection
// Corresponds to: collectionApi.update(id, data)
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;

    // Based on your client API, this receives JSON, not FormData
    const body = await req.json();

    const updatedCollection = await Collection.findByIdAndUpdate(
      id,
      body,
      { new: true }, // Return the updated document
    );

    if (!updatedCollection) {
      return NextResponse.json(
        { error: "Collection not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(updatedCollection);
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json(
      { error: "Failed to update collection" },
      { status: 500 },
    );
  }
}
