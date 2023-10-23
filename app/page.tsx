//"use client";
//import { useEffect, useState } from "react";
import App from "./App";
//import { CategoryResponse } from "./types";
import { getCategory } from "./api/category/getCategory";

export default function Home() {
  const categoryInfo = getCategory(); // Hopefully this funciton response isn't cached?
  // Have to fetch since it changes daily
  // const [categoryInfo, setCategoryInfo] = useState<CategoryResponse>();
  // useEffect(() => {
  //   async function fetchData() {
  //     const res = await fetch("/api/category", {
  //       next: { revalidate: 10000 },
  //     });

  //     setCategoryInfo(await res.json());
  //   }
  //   fetchData();
  // }, []);
  return categoryInfo && <App {...categoryInfo} />;
}
