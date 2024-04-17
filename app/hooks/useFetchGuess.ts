import { useState } from "react";
import { getGuessAnswer } from "../services/guess";
import { Guess } from "../types";

export const useFetchGuess = () => {
  const [guessResponse, setGuessRepsonse] = useState<Guess>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getGuessResponse = (query: string) => {
    setIsLoading(true);
    return getGuessAnswer(query, Date.now().toString()).then(
      (apiResponse: Guess) => {
        setIsLoading(false);
        setGuessRepsonse(apiResponse);
      }
    );
  };
  return { getGuessResponse, guessResponse, isLoading };
};
