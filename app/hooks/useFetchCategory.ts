import { useEffect, useState } from "react";
import { getCategory } from "../services/category";
import { CategoryResponse } from "../types";

export const useFetchCategory = () => {
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
    getCategory(Date.now().toString(), "Modest Mouse Songs").then(
      (apiResponse: CategoryResponse) => {
        setCategoryResponse(apiResponse);
        setIsLoading(false);
      }
    );
  }, []);

  return { categoryResponse, isLoading };
};
