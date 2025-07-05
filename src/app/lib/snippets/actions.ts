"use server";
import { connectDB } from "@/app/lib/connectDB";
import Snippet from "@/app/models/SnippetSchema";
import { SingleSnippetType } from "../definitions";

export async function addSnippetAction(snippetData: SingleSnippetType) {
  await connectDB();
  const snippet = await Snippet.create(snippetData);
  return JSON.parse(JSON.stringify(snippet));
}
