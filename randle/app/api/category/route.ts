import { NextResponse } from "next/server";
import { CategoryResponse } from "@/app/types";
import { readFile } from "fs/promises";
import path from "path";

export async function getCategory(): Promise<CategoryResponse> {
  // fetch category data from static data
  const filePath = path.join(process.cwd(), "static_data.json");
  const categoriesRes = await readFile(filePath);
  const categories = JSON.parse(categoriesRes.toString());

  // Get category for today
  const currDay = new Date().getDate();
  const currCategoryIndex = currDay % categories.length;
  const currCategory = categories[currCategoryIndex];
  return currCategory;
}

export async function GET() {
  const data = await getCategory();

  return NextResponse.json(data);
}
