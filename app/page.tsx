"use client";
import { useEffect, useState } from "react";
import App from "./App";
import { CategoryResponse } from "./types";

export default function Home() {
  // Have to fetch since it changes daily
  const [categoryInfo, setCategoryInfo] = useState<CategoryResponse>();
  useEffect(() => {
    async function fetchData() {
      // You can await here
      const res = await fetch("/api/category", {
        next: { revalidate: 10000 },
      });

      setCategoryInfo(await res.json());
    }
    fetchData();
  }, []);
  return categoryInfo && <App {...categoryInfo} />;
}
