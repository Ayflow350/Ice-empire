import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICollection extends Document {
  title: string; // "Midnight Vanguard"
  subtitle: string; // "Men's Outerwear"
  dropCode: string; // "DROP 01"
  status: "Active" | "Draft" | "Archived";
  imageUrl: string; // Cloudinary URL
  releaseDate: Date;
  itemCount: number; // Virtual or cached count of products in this collection
  createdAt: Date;
  updatedAt: Date;
}

const CollectionSchema = new Schema<ICollection>(
  {
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, required: true },
    dropCode: { type: String, required: true, unique: true, uppercase: true },
    status: {
      type: String,
      enum: ["Active", "Draft", "Archived"],
      default: "Draft",
    },
    imageUrl: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    itemCount: { type: Number, default: 0 }, // We can update this when products are added
  },
  { timestamps: true }
);

// Prevent model recompilation error in Next.js
const Collection: Model<ICollection> =
  mongoose.models.Collection ||
  mongoose.model<ICollection>("Collection", CollectionSchema);

export default Collection;
