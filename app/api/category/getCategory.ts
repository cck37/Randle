import { cache } from "react";
import { CategoryResponse } from "@/app/types";
import static_data from "@/app/data";

export const revalidate = 3600; // revalidate the data at most every hour

export const getCategory = cache((currDay: number): CategoryResponse => {
  // Fetch category data from static data
  const categories = static_data;

  // Get category for today
  const currCategoryIndex = currDay % categories.length;

  return categories[currCategoryIndex];
});
