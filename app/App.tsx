"use client";
import { useState, useEffect, useCallback } from "react";
import {
  Container,
  CssBaseline,
  Stack,
  Typography,
  createTheme,
  Grid,
} from "@mui/material";

import { GuessesTable } from "./components/GuessesTable";
import { GuessBar } from "./components/GuessBar";
import { CorrectGuess } from "./components/CorrectGuess";

import { CategoryResponse, GuessResponse, PossibleGuesses } from "./types";
import ThemeRegistry from "./components/ThemeRegistry/ThemeRegistry";

type GuessState = {
  possibleGuesses: PossibleGuesses[];
  query: string;
  results: GuessResponse[];
  isGuessCorrect: boolean;
  isGuessQueryLoading: boolean;
};

export default function App(props: CategoryResponse) {
  const { theme: themeOptions, title, attributes, items } = props;

  const [guessState, setGuessState] = useState<GuessState>({
    possibleGuesses: items,
    query: "",
    results: [],
    isGuessCorrect: false,
    isGuessQueryLoading: false,
  });

  const { possibleGuesses, results, isGuessCorrect, isGuessQueryLoading } =
    guessState;
  const theme = createTheme(themeOptions);

  async function fetchGuessResponse(query: string): Promise<void> {
    setGuessState((prevState) => ({ ...prevState, isGuessQueryLoading: true }));

    try {
      const res = await fetch(`/api/guess?guess=${query}`, {
        next: { revalidate: 60 },
      });
      const guessResponse: GuessResponse = await res.json();

      setGuessState((prevState) => ({
        ...prevState,
        isGuessQueryLoading: false,
        results: [...prevState.results, guessResponse],
        isGuessCorrect:
          guessResponse.data.every((attr) => attr.isCorrect) ?? false,
        possibleGuesses: prevState.possibleGuesses.filter(
          (g) => g.name !== query
        ),
      }));
    } catch (error) {
      console.error("Error fetching guess response:", error);
    }
  }

  const handleReset = useCallback(() => {
    setGuessState((prevState) => ({
      ...prevState,
      results: [],
      isGuessCorrect: false,
      query: "",
      possibleGuesses: items,
    }));
  }, [items]);

  const handleGuess = useCallback((query: string) => {
    if (query) {
      fetchGuessResponse(query);
    }
  }, []);

  return (
    <ThemeRegistry themeOptions={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Grid
          container
          direction="column"
          alignItems="center"
          sx={{
            width: "100%",
          }}
        >
          <Grid
            item
            sx={{
              width: "100%",
            }}
          >
            <Stack
              spacing={3}
              direction="column"
              alignItems="center"
              sx={{
                width: "100%",
              }}
            >
              <Typography variant="h1">{title}</Typography>
              <GuessBar
                title={title}
                possibleGuesses={possibleGuesses}
                handleGuess={handleGuess}
                shouldDisable={isGuessCorrect || isGuessQueryLoading}
              />
              <GuessesTable attributes={attributes} guesses={results} />
            </Stack>
          </Grid>
          <Grid item>
            {isGuessCorrect ? (
              <CorrectGuess handleReset={handleReset} />
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
      </Container>
    </ThemeRegistry>
  );
}
