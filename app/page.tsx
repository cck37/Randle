import { Suspense } from "react";
import App from "./App";
import Loading from "./loading";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <App />
    </Suspense>
  );
}
