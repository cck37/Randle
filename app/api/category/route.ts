import { NextRequest, NextResponse } from "next/server";
import { CategoryResponse } from "@/app/types";
import { getCategory } from "./getCategory";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const dateString = searchParams.get("date");
  if (dateString && dateString.length <= 0)
    return NextResponse.json(
      {
        error: "No date provided",
      },
      {
        status: 400,
      }
    );

  const date = new Date(dateString ?? new Date());
  const data: CategoryResponse = await getCategory(date.getUTCDate());

  return NextResponse.json(data);
}
