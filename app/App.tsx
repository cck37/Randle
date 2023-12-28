"use client";
import { useState, useEffect, useCallback } from "react";
import {
  Container,
  Stack,
  Typography,
  Grid,
  createTheme,
  Theme,
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

export default function App() {
  const [theme, setTheme] = useState<Theme>();
  const [categoryState, setCategoryState] = useState<CategoryResponse>({
    title: "",
    attributes: [],
    items: [],
    theme: {}
  });
  const [guessState, setGuessState] = useState<GuessState>({
    possibleGuesses: [],
    query: "",
    results: [],
    isGuessCorrect: false,
    isGuessQueryLoading: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/category?date=${new Date().getDate()}`);
      const categoryResponse: CategoryResponse = await res.json();
      const { title, attributes, items, theme: themeOptions } = categoryResponse;
      setCategoryState(categoryResponse);
      setGuessState({
        possibleGuesses: items,
        query: "",
        results: [],
        isGuessCorrect: false,
        isGuessQueryLoading: false,
      })

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
      setTheme(createTheme(themeOptions));
    }

    fetchData();
  }, [])


  const { possibleGuesses, results, isGuessCorrect, isGuessQueryLoading } =
    guessState;

  async function fetchGuessResponse(query: string): Promise<void> {
    setGuessState((prevState) => ({ ...prevState, isGuessQueryLoading: true }));

    try {
      const res = await fetch(`/api/guess?guess=${query}&date=${new Date().getDate()}`);
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
    }));
  }, []);

  const handleGuess = useCallback((query: string) => {
    if (query) {
      fetchGuessResponse(query);
    }
  }, []);

  // Don't attempt to register the theme if we don't have one
  if (theme) {
    return (
      <ThemeRegistry theme={createTheme(theme)}>
        <Container component="main" maxWidth="md">
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
                <Typography variant="h1">{categoryState.title}</Typography>
                <GuessBar
                  title={categoryState.title}
                  possibleGuesses={possibleGuesses}
                  handleGuess={handleGuess}
                  shouldDisable={isGuessCorrect || isGuessQueryLoading}
                />
                <GuessesTable attributes={categoryState.attributes} guesses={results} />
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
  } else {
    return null; // replace with skeleton
  }
}
