import { Suspense } from "react";
import App from "./App";
import Loading from "./loading";
import { getCategory } from "./api/category/getCategory";

export const revalidate = 3600; // revalidate the data at most every hour
export const dynamic = "force-dynamic";

export default function Home() {
  const categoryInfo = getCategory(new Date().getSeconds());
  return (
    <Suspense fallback={<Loading />}>
      <App {...categoryInfo} />
    </Suspense>
  );
}
