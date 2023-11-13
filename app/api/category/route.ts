import { NextResponse } from "next/server";
import { CategoryResponse } from "@/app/types";
import { getCategory } from "./getCategory";

export async function GET() {
  const data: CategoryResponse = getCategory(new Date().getDate());

  return NextResponse.json(data);
}
