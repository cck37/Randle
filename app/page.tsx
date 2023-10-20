import App from "./App";
import { getCategory } from "./api/category/getCategory";
import { CategoryResponse } from "./types";

export default async function Home() {
  const categoryInfo: CategoryResponse = await getCategory();
  return <App {...categoryInfo} />;
}
