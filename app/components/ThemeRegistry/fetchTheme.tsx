import { CategoryResponse } from "@/app/types";

export async function fetchTheme() {
  const res = await fetch("/api/category");
  const { theme: themeOptions }: CategoryResponse = await res.json();
  return themeOptions;
}
