import { connectDB } from "@/app/lib/connectDB";
import Snippet from "@/app/models/SnippetSchema";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const snippets = await Snippet.find();
  return NextResponse.json(snippets);
}
