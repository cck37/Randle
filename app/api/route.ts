import { NextResponse } from "next/server";
export async function GET() {
  const data = { hello: "how are you" };

  return NextResponse.json(data);
}
