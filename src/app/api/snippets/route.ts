import { connectDB } from "@/app/lib/connectDB";
import Snippet from "@/app/models/SnippetSchema";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const snippets = await Snippet.find();
  return NextResponse.json(snippets);
}

export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();
  const snippet = await Snippet.create(data);
  return NextResponse.json(snippet, { status: 201 });
}
