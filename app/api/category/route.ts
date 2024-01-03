import { NextRequest, NextResponse } from "next/server";
import { CategoryResponse } from "@/app/types";
import { getCategory } from "./getCategory";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const date = parseInt(searchParams.get("date") ?? "1");
  const data: CategoryResponse = await getCategory(date);

  return NextResponse.json(data);
}
