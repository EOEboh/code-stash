import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  provider: String,
  providerAccountId: String,
  type: String,
  access_token: String,
  expires_at: Number,
  token_type: String,
  scope: String,
  id_token: String,
});

AccountSchema.index({ provider: 1, providerAccountId: 1 }, { unique: true });

export const Account =
  mongoose.models.Account || mongoose.model("Account", AccountSchema);
