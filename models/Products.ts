import mongoose, { Schema, Document, Model } from "mongoose";

export interface IVariant {
  id: string;
  colorName: string;
  colorHex: string;
  imageUrl: string;
  stock: number;
}

export interface IProduct extends Document {
  name: string;
  slug: string;
  collectionName: string;
  description: string;
  price: number;
  originalPrice?: number;
  sizes: string[];
  variants: IVariant[];
  totalStock: number;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const VariantSchema = new Schema<IVariant>({
  id: { type: String },
  colorName: { type: String, required: true },
  colorHex: { type: String, required: true },
  imageUrl: { type: String },
  stock: { type: Number, required: true, default: 0, min: 0 },
});

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },
    collectionName: { type: String, required: true, index: true },
    description: { type: String },
    price: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number, min: 0 },
    sizes: { type: [String], default: [] },
    variants: [VariantSchema],
    totalStock: { type: Number, default: 0 },
    isArchived: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

// --- FIX: Add this line ---
export default Product;
