// models/Exhibition.ts
import mongoose from "mongoose";

const ExhibitionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: String, required: true }, // e.g., "OCT 2024"
    status: {
      type: String,
      enum: ["Archived", "Open Now", "Upcoming"],
      default: "Upcoming",
    },
    coordinates: { type: String, default: "0.0° N, 0.0° E" },
    image: { type: String, required: true }, // Cloudinary URL
    description: { type: String },
  },
  { timestamps: true },
);

// Prevent model recompilation in Next.js hot reload
const Exhibition =
  mongoose.models.Exhibition || mongoose.model("Exhibition", ExhibitionSchema);

export default Exhibition;
