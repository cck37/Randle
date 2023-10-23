import { NextResponse } from "next/server";
import { CategoryResponse } from "@/app/types";
import { getCategory } from "./getCategory";

export const revalidate = 10000; // ~3 hours??

export async function GET() {
  const data: CategoryResponse = getCategory();

  return NextResponse.json(data);
}
