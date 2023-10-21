"use client";
import { useState, useEffect } from "react";

import { GuessesTable } from "./components/GuessesTable";
import { GuessBar } from "./components/GuessBar";
import { CorrectGuess } from "./components/CorrectGuess";

import { CategoryResponse, GuessResponse, PossibleGuesses } from "./types";
import {
  Container,
  CssBaseline,
  Stack,
  Typography,
  ThemeProvider,
  createTheme,
} from "@mui/material";

function App(props: CategoryResponse) {
  const { theme: themeOptions, title, attributes, items } = props;
  const theme = createTheme(themeOptions);

  const [possibleGuesses, setPossibleGuesses] =
    useState<PossibleGuesses[]>(items);
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<GuessResponse[]>([]);
  const [isGuessCorrect, setIsGuessCorrect] = useState(false);
  const [isGuessQueryLoading, setIsGuessQueryLoading] = useState(false);

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        if (query) {
          setIsGuessQueryLoading(true);
          // Fetch Data
          const res = await fetch(`/api/guess?guess=${query}`);
          const guessResponse: GuessResponse = await res.json();

          setIsGuessQueryLoading(false);
          setResults((r: GuessResponse[]) => [...r, guessResponse]);
          setIsGuessCorrect(
            guessResponse.data.every((attr) => attr.isCorrect) ?? false
          );
          setPossibleGuesses((guesses: PossibleGuesses[]) =>
            guesses.filter((g) => g.name !== query)
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch data when the query changes
    fetchData();
  }, [query]);

  const handleReset = () => {
    setResults([]);
    setIsGuessCorrect(false);
    setQuery("");
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Stack spacing={3}>
          <Typography variant="h1">{title}</Typography>
          <GuessBar
            title={title}
            possibleGuesses={possibleGuesses}
            handleGuess={setQuery}
            shouldDisable={isGuessCorrect || isGuessQueryLoading}
          />
          <GuessesTable attributes={attributes} guesses={results} />
        </Stack>
        {isGuessCorrect ? <CorrectGuess handleReset={handleReset} /> : <></>}
      </Container>
    </ThemeProvider>
  );
}

export default App;
