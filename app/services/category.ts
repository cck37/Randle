import { api } from "../adapters/api";

export const getCategory = async (date: string, category?: string) => {
  const searchParams = new URLSearchParams({
    date: date,
  });
  if (category) {
    searchParams.set("category", category);
  }
  const queryString = searchParams.toString();
  const data = await api.get(`category?${queryString}`);
  return await data.json();
};

export const getCategories = async (date: string) => {
  const searchParams = new URLSearchParams({
    date: date,
  });
  const data = await api.get(`category/all?${searchParams}`);
  return await data.json();
};
