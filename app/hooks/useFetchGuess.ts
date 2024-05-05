import { useState } from "react";
import { getGuessAnswer } from "../services/guess";
import { Guess } from "../types";

export const useFetchGuess = (initialGuessState: any) => {
  const [guessState, setGuessState] = useState<any>(initialGuessState);
  const [guessResponse, setGuessRepsonse] = useState<Guess>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getGuessResponse = (query: string) => {
    setIsLoading(true);
    return getGuessAnswer(query, Date.now().toString()).then(
      (apiResponse: Guess) => {
        setGuessRepsonse(apiResponse);
        setGuessState((prevState: any) => ({
          ...prevState,
          results: [apiResponse, ...prevState.results],
          isGuessCorrect:
            apiResponse?.data.every((attr) => attr.res.isCorrect) ?? false,
          possibleGuesses: prevState.possibleGuesses.filter(
            (g: Guess) => g.name !== apiResponse?.name
          ),
        }));
        setIsLoading(false);
      }
    );
  };
  return { getGuessResponse, guessResponse, guessState, isLoading };
};
