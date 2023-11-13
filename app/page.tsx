import { Suspense } from "react";
import App from "./App";
import Loading from "./loading";
import { getCategory } from "./api/category/getCategory";

export const dynamic = "force-dynamic";

export default function Home() {
  const categoryInfo = getCategory(new Date().getDate());
  return (
    <Suspense fallback={<Loading />}>
      <App {...categoryInfo} />
    </Suspense>
  );
}
