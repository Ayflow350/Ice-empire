import mongoose from "mongoose";

// 1. Define the interface for the cached connection object
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// 2. Extend the NodeJS global type
// This tells TypeScript that 'global.mongoose' is a valid property
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

// 3. Retrieve or Initialize the cache
// Ensure 'cached' is always a MongooseCache to avoid 'possibly undefined' errors
const cached: MongooseCache = global.mongoose ?? { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

async function connectDB() {
  // 4. FIX: Check for MONGODB_URI inside the function
  // This prevents the build from crashing if the env var isn't loaded yet
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local",
    );
  }

  // 5. Return cached connection if available (Optimization)
  if (cached.conn) {
    return cached.conn;
  }

  // 6. If no connection promise exists, create a new one
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("✅ MongoDB Connected Successfully");
      return mongoose;
    });
  }

  // 7. Await the connection
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null; // Reset promise on failure so we can try again
    throw e;
  }

  return cached.conn;
}

export default connectDB;
