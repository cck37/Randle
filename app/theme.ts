import { CategoryResponse } from "./types";
import { getCategory } from "./api/category/getCategory";

export const themeOptions = async () => {
  // Capture the theme
  const { theme: themeOptions }: CategoryResponse = await getCategory();
  return themeOptions;
};
