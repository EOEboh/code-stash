// This file is used to connect to MongoDB using Mongoose.
// src/app/lib/connectDB.ts
import mongoose from "mongoose";

const MONGO_DB_URI = process.env.MONGO_DB_URI as string;

if (!MONGO_DB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}
interface MongooseGlobal {
  mongoose?: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

const globalWithMongoose = global as typeof global & MongooseGlobal;

const cached = globalWithMongoose.mongoose || { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGO_DB_URI, {
        bufferCommands: false,
      })
      .then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
