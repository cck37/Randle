import { useEffect, useState } from "react";
import { getCategory } from "../services/category";
import { CategoryResponse } from "../types";

export const useFetchCategory = (category?: string) => {
  const [categoryResponse, setCategoryResponse] = useState<CategoryResponse>({
    id: -1,
    title: "",
    theme: {},
    items: [],
    attributes: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    setIsLoading(true);
    getCategory(Date.now().toString(), category).then(
      (apiResponse: CategoryResponse) => {
        setCategoryResponse(apiResponse);
        setIsLoading(false);
      }
    );
  }, [category]);

  return { categoryResponse, isLoading };
};
