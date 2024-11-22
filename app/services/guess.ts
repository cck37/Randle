import { api } from "../adapters/api";
import { fudgeDate } from "../hooks/utils";

export const getGuessAnswer = (guess: string, category?: string) => {
  const queryString = new URLSearchParams({
    guess,
    date: Date.now().toString(),
  });
  if (category) {
    queryString.append("category", category);
  }
  return api.get(`guess?${queryString}`).then((data) => data.json());
};
