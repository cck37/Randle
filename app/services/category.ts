import { api } from "../adapters/api";

export const getCategory = (date: string, category?: string) => {
  const searchParams = new URLSearchParams({
    date: date,
  });
  category = "Modest Mouse Songs";
  if (category) {
    searchParams.set("category", category);
  }
  const queryString = searchParams.toString();
  return api.get(`/category?${queryString}`).then((data) => data.json());
};
