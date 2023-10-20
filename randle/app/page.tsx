import App from "./App";
import { getCategory } from "./api/category/route";
import { CategoryResponse } from "./types";

export default async function Home() {
  const categoryInfo: CategoryResponse = await getCategory();
  return <App {...categoryInfo} />;
}
