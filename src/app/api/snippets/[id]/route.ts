import { connectDB } from "@/app/lib/connectDB";
import Snippet from "@/app/models/SnippetSchema";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const data = await req.json();
  const snippet = await Snippet.findByIdAndUpdate(params.id, data, {
    new: true,
  });
  return NextResponse.json(snippet);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  await Snippet.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}
