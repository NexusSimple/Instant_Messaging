import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
  } catch (error: any) {
    console.log("[MESSAGES]", error);
    return new NextResponse("Error", { status: 500 });
  }
}