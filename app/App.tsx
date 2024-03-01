"use client";
import { useState, useEffect, useCallback } from "react";
import {
  Container,
  Stack,
  Typography,
  Grid,
  createTheme,
  Theme,
  responsiveFontSizes,
  Skeleton,
} from "@mui/material";

import { GuessesTable } from "./components/GuessesTable";
import { GuessBar } from "./components/GuessBar";
import { CorrectGuess } from "./components/CorrectGuess";

import { CategoryResponse, Guess, PossibleGuess } from "./types";
import ThemeRegistry from "./components/ThemeRegistry/ThemeRegistry";

type GuessState = {
  possibleGuesses: PossibleGuess[];
  query: string;
  results: Guess[];
  isGuessCorrect: boolean;
  isGuessQueryLoading: boolean;
};

export default function App() {
  const [theme, setTheme] = useState<Theme>();
  const [categoryState, setCategoryState] = useState<CategoryResponse>();
  const [guessState, setGuessState] = useState<GuessState>({
    possibleGuesses: [],
    query: "",
    results: [],
    isGuessCorrect: false,
    isGuessQueryLoading: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/category?date=${new Date().toISOString()}`);
      const categoryResponse: CategoryResponse = await res.json();
      const { items, theme: themeOptions } = categoryResponse;
      setCategoryState(categoryResponse);
      setGuessState({
        possibleGuesses: items,
        query: "",
        results: [],
        isGuessCorrect: false,
        isGuessQueryLoading: false,
      });

      /***
       * FIX: Not ideal but whatever...
       * Similar to what's described here: https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
       * When I tried to put it all on the server (dynamic theme and all) I get this:
       * Error: Not implemented.
        at eval (./app/components/ThemeRegistry/theme.ts:9:96)
        at (ssr)/./app/components/ThemeRegistry/theme.ts (C:\Users\Botnet2\Desktop\Skript Kiddy\Randle\.next\server\app\page.js:271:1)
        at __webpack_require__ (C:\Users\Botnet2\Desktop\Skript Kiddy\Randle\.next\server\webpack-runtime.js:33:42)  
        at eval (./app/components/ThemeRegistry/ThemeRegistry.tsx:12:64)
      \server\app\page.js:260:1)
        at __webpack_require__ (C:\Users\Botnet2\Desktop\Skript Kiddy\Randle\.next\server\webpack-runtime.js:33:42)
      */
      const theme = createTheme(themeOptions);
      setTheme(responsiveFontSizes(theme));
    };

    fetchData();
  }, []);

  const { possibleGuesses, results, isGuessCorrect, isGuessQueryLoading } =
    guessState;

  async function fetchGuessResponse(query: string): Promise<void> {
    setGuessState((prevState) => ({ ...prevState, isGuessQueryLoading: true }));

    try {
      const res = await fetch(
        `/api/guess?guess=${query}&date=${new Date().toISOString()}`
      );
      const guessResponse: Guess = await res.json();

      setGuessState((prevState) => ({
        ...prevState,
        isGuessQueryLoading: false,
        results: [guessResponse, ...prevState.results],
        isGuessCorrect:
          guessResponse.data.every((attr) => attr.res.isCorrect) ?? false,
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
      possibleGuesses: categoryState?.items ?? [],
    }));
  }, [categoryState]);

  const handleGuess = useCallback((query: string) => {
    if (query) {
      fetchGuessResponse(query);
    }
  }, []);

  return (
    <ThemeRegistry theme={theme}>
      <Container component="main" maxWidth="xl">
        <Grid container direction="column">
          <Grid
            item
            sx={{
              width: "100%",
            }}
          >
            <Stack spacing={3} direction="column" alignItems="center">
              {categoryState ? (
                <>
                  <Typography variant="h1">{categoryState.title}</Typography>
                  <GuessBar
                    title={categoryState.title}
                    possibleGuesses={possibleGuesses}
                    handleGuess={handleGuess}
                    shouldDisable={isGuessCorrect || isGuessQueryLoading}
                  />
                  <GuessesTable
                    attributes={categoryState.attributes}
                    guesses={results}
                  />
                </>
              ) : (
                <>
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    width={200}
                    height={100}
                  />
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    width={300}
                    height={50}
                  />
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    width={500}
                    height={150}
                  />
                </>
              )}
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
