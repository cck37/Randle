import { api } from "../adapters/api";

export const getGuessAnswer = (guess: string, date: string) => {
  const queryString = new URLSearchParams({
    guess,
    date: Date.now().toString(),
  }).toString();
  return api.get(`/guess?${queryString}`).then((data) => data.json());
};
