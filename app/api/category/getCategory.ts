import { CategoryResponse } from "@/app/types";
import static_data from "@/app/data";

let lastRevalidation: number = new Date().getTime();

export const revalidate = 3600; // revalidate the data at most every hour

export function getCategory(): CategoryResponse {
  const currTime = new Date().getTime();

  // Revalidate if the specified duration has passed
  if (currTime - lastRevalidation >= revalidate * 1000) {
    // Fetch category data from static data
    const categories = static_data;

    // Get category for today
    const currDay = new Date().getDate();
    const currCategoryIndex = currDay % categories.length;

    // Update the last revalidation time
    lastRevalidation = currTime;

    return categories[currCategoryIndex];
  }

  // If revalidation is not required, return the previously fetched data
  return static_data[new Date().getDate() % static_data.length];
}
