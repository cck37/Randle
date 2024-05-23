import { NextRequest, NextResponse } from "next/server";
import { CategoryResponse } from "@/app/types";
import { getCategory } from "./getCategory";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const timestamp = Number(searchParams.get("date"));
  if (timestamp < 0 || Number.isNaN(searchParams.get("date")))
    return NextResponse.json(
      {
        error: "No date provided or date is invalid",
      },
      {
        status: 400,
      }
    );
  const categoryName = searchParams.get("category");

  const data: CategoryResponse = categoryName
    ? await getCategory(timestamp, categoryName)
    : await getCategory(timestamp);

  return NextResponse.json(data);
}
