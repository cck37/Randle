"use client";
import { useState, useEffect, useCallback } from "react";
import {
  Container,
  CssBaseline,
  Stack,
  Typography,
  ThemeProvider,
  createTheme,
  Grid,
} from "@mui/material";

import { GuessesTable } from "./components/GuessesTable";
import { GuessBar } from "./components/GuessBar";
import { CorrectGuess } from "./components/CorrectGuess";
import { ResponsiveAppBar } from "./components/ResponsiveAppBar";

import { CategoryResponse, GuessResponse, PossibleGuesses } from "./types";

function App(props: CategoryResponse) {
  const { theme: themeOptions, title, attributes, items } = props;
  const theme = createTheme(themeOptions);

  // FIX: Combine state??
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
        // Fetch data when the query changes
        if (query) {
          setIsGuessQueryLoading(true);
          // Fetch Data
          const res = await fetch(`/api/guess?guess=${query}`, {
            next: { revalidate: 60 },
          });
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
    fetchData();
  }, [query]);

  const handleReset = useCallback(() => {
    setResults([]);
    setIsGuessCorrect(false);
    setQuery("");
    setPossibleGuesses(items);
  }, [items]);

  return (
    <ThemeProvider theme={theme}>
      <ResponsiveAppBar />
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Grid
          container
          direction="column"
          alignItems="center"
          sx={{
            width: "100%",
            height: "100vh",
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
                handleGuess={setQuery}
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
    </ThemeProvider>
  );
}

export default App;
