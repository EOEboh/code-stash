import mongoose, { Document, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String },
    emailAddress: {
      type: String,
      required: true,
      unique: true,
    },
    image: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const User =
  mongoose.models.User ?? mongoose.model<Document>("User", UserSchema);

export default User;
