import { api } from "../adapters/api";

export const getCategory = (date: string) => {
  const queryString = new URLSearchParams({
    date: date,
  }).toString();
  return api.get(`/category?${queryString}`).then((data) => data.json());
};
