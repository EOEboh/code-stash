import mongoose, { Schema, Document } from "mongoose";

export interface ISnippet extends Document {
  title: string;
  isFavorite: boolean;
  tags: string[];
  description: string;
  code: string;
  language: string;
  creationDate: string;
}

const SnippetSchema = new Schema<ISnippet>({
  title: { type: String, required: true },
  isFavorite: { type: Boolean, default: false },
  tags: [String],
  description: String,
  code: String,
  language: String,
  creationDate: String,
});

export default mongoose.models.Snippet ||
  mongoose.model<ISnippet>("Snippet", SnippetSchema);
