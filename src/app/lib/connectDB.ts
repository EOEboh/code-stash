import mongoose from "mongoose";

export default async function connectDB(): Promise<void> {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI as string);
    console.log("DB Connected!");
  } catch (error) {
    console.error("DB Connection Error", error);
  }
}
