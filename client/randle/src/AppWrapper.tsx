import App from "./App";
import { Suspense } from "react";

function AppWrapper() {
  return (
    <Suspense fallback={<p>Loading user details...</p>}>
      <App />
    </Suspense>
  );
}

export default AppWrapper;
