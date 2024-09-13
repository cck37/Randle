import { NextRequest, NextResponse } from "next/server";
import { CategorySummaryResponse } from "@/app/types";
import { getCategories } from "./getCategories";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const timestamp = Number(searchParams.get("date"));

  if (timestamp < 0 || Number.isNaN(timestamp))
    return NextResponse.json(
      {
        error: "No date provided",
      },
      {
        status: 400,
      }
    );

  const data: CategorySummaryResponse[] = await getCategories(timestamp);

  return NextResponse.json(data);
}
