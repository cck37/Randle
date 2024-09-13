import React from "react";
import Typography from "@mui/material/Typography";
import { GuessBar } from "./GuessBar";
import { GuessesTable } from "./GuessesTable";
import { StorageState } from "../types";
import { Button } from "@mui/material";

interface GuessBodyProps {
  previousSession: StorageState;
  handleGuess: (guess: string) => void;
  isFetchGuessLoading: boolean;
  handleReset?: () => void;
}

const GuessBody: React.FC<GuessBodyProps> = ({
  previousSession,
  handleGuess,
  isFetchGuessLoading,
}) => {
  return (
    <>
      <Typography variant="h1" sx={{ paddingY: "1rem", textAlign: "center" }}>
        {previousSession.category.title}
      </Typography>
      <GuessBar
        title={previousSession.category.title}
        possibleGuesses={previousSession.guess.possibleGuesses}
        handleGuess={handleGuess}
        shouldDisable={
          previousSession.guess.isGuessCorrect || isFetchGuessLoading
        }
      />
      <Typography variant="h6">
        Par: {Math.floor(previousSession.category.items.length * 0.1)}
      </Typography>
      <GuessesTable
        attributes={previousSession.category.attributes}
        guesses={previousSession.guess.results}
      />
    </>
  );
};

export default GuessBody;
