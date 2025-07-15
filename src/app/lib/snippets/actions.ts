"use server";
import { connectDB } from "@/app/lib/connectDB";
import Snippet from "@/app/models/SnippetSchema";
import { SingleSnippetType } from "../definitions";

export async function addSnippetAction(snippetData: SingleSnippetType) {
  try {
    await connectDB();
    const isEditing = !!snippetData._id;

    const snippet = isEditing
      ? await Snippet.findByIdAndUpdate(snippetData._id, snippetData, {
          new: true,
        })
      : await Snippet.create(snippetData);

    // Normalize _id to id
    const normalized = {
      ...snippet.toObject(),
      id: snippet._id.toString(),
    };

    delete normalized._id;
    delete normalized.__v;

    return normalized;
  } catch (error) {
    console.error("Error adding snippet:", error);
    throw new Error(
      `Error adding snippet: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export async function deleteSnippetAction(id: string) {
  try {
    await connectDB();
    await Snippet.findByIdAndDelete(id);
  } catch (err) {
    console.error("Failed to delete snippet:", err);
    throw new Error("Deletion failed");
  }
}
