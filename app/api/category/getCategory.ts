import { CategoryResponse } from "@/app/types";
import static_data from "@/app/data";

export const revalidate = 3600; // revalidate the data at most every hour

export function getCategory(): CategoryResponse {
  // fetch category data from static data
  const categories = static_data;

  // Get category for today
  const currDay = new Date().getDate();
  const currCategoryIndex = currDay % categories.length;
  const currCategory: CategoryResponse = categories[currCategoryIndex];
  return currCategory;
}
