import { useEffect, useState } from "react";
import { getCategories } from "../services/category";
import { CategorySummaryResponse } from "../types";

export const useFetchCategories = () => {
  const [categoriesResponse, setCategoriesResponse] = useState<
    CategorySummaryResponse[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    setIsLoading(true);
    getCategories(Date.now().toString()).then(
      (apiResponse: CategorySummaryResponse[]) => {
        setCategoriesResponse(apiResponse);
        setIsLoading(false);
      }
    );
  }, []);

  return { categoriesResponse, isLoading };
};
