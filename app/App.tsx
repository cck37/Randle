"use client";
import { useState, useEffect } from "react";
import {
  Container,
  Stack,
  Grid,
  createTheme,
  Theme,
  responsiveFontSizes,
} from "@mui/material";

import { CorrectGuess } from "./components/CorrectGuess";

import { Guess, StorageState } from "./types";
import ThemeRegistry from "./components/ThemeRegistry/ThemeRegistry";
import { CountdownProvider } from "./components/CountdownContext";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import { useLocalStorage } from "./hooks/useLocaleStorage";
import { useFetchGuess } from "./hooks/useFetchGuess";
import { useFetchCategory } from "./hooks/useFetchCategory";
import { getPar, isValidStorage } from "./utils";
import { MainSkeleton } from "./components/MainSkeleton";
import GuessBody from "./components/GuessBody";

const defaultStorage: StorageState = {
  timeStamp: 0,
  category: {
    id: -1,
    title: "",
    theme: {},
    items: [],
    attributes: [],
  },
  guess: {
    possibleGuesses: [],
    query: "",
    results: [],
    isGuessCorrect: false,
    isGuessQueryLoading: false,
  },
  streak: 0,
};

export default function App(props: { categoryTitle?: string }) {
  const { categoryTitle } = props;
  const [theme, setTheme] = useState<Theme>();
  const { categoryResponse: category, isLoading: isFetchCategoryLoading } =
    useFetchCategory(categoryTitle);
  const { width, height } = useWindowSize();
  const [previousSession, setPreviousSession] = useLocalStorage(
    categoryTitle ? `session-${categoryTitle}` : "session",
    defaultStorage
  );
  const {
    getGuessResponse,
    guessState: guess,
    isLoading: isFetchGuessLoading,
    setGuessState,
  } = useFetchGuess(previousSession.guess, categoryTitle);

  // TODO: Refactor this into a custom hook
  // Load the theme from storage if it exists otherwise update the session with the theme
  useEffect(() => {
    if (
      !isFetchCategoryLoading &&
      isValidStorage(previousSession, category.title)
    ) {
      const currTheme = createTheme(previousSession.category.theme);
      setTheme(responsiveFontSizes(currTheme));
    } else if (!isFetchCategoryLoading) {
      const { items, theme: themeOptions } = category;
      const currTheme = createTheme(themeOptions);
      const emptyGuessState = {
        possibleGuesses: items,
        query: "",
        results: [],
        isGuessCorrect: false,
        isGuessQueryLoading: false,
      };

      setPreviousSession({
        timeStamp: Date.now(),
        category: category,
        guess: emptyGuessState,
        streak: previousSession?.streak || 0, // if we have a streak from a previous day, carry it over
      });
      setGuessState(emptyGuessState);

      setTheme(responsiveFontSizes(currTheme));
    }
  }, [
    category,
    previousSession,
    setPreviousSession,
    isFetchCategoryLoading,
    setGuessState,
  ]);

  useEffect(() => {
    if (!guess.results.length) return;

    setPreviousSession((prevState: StorageState) => ({
      ...prevState,
      guess: {
        ...guess,
        possibleGuesses: prevState.guess.possibleGuesses.filter(
          (guesses) =>
            !guess.results.map((g: Guess) => g.name).includes(guesses.name)
        ),
      },
      streak:
        guess.isGuessCorrect &&
        prevState.guess.results.length + 1 < getPar(category.items.length)
          ? prevState.streak + 1
          : prevState.streak,
    }));
  }, [category, guess, setPreviousSession]); // FIX: Category.items.length should be stable but seems shitty to not have the whole category object as a dependency

  const handleGuess = (query: string) => {
    getGuessResponse(query);
  };
  return (
    <ThemeRegistry theme={theme}>
      <CountdownProvider>
        <Container component="main" maxWidth="xl" sx={{ px: 0 }}>
          <Grid container direction="column">
            <Grid
              item
              sx={{
                width: "100%",
              }}
            >
              <Stack spacing={2} direction="column" alignItems="center">
                {(!isFetchCategoryLoading ||
                  isValidStorage(previousSession, category.title)) &&
                Object.keys(previousSession.guess).length ? (
                  <GuessBody
                    previousSession={previousSession}
                    handleGuess={handleGuess}
                    isFetchGuessLoading={isFetchGuessLoading}
                  />
                ) : (
                  <MainSkeleton />
                )}
              </Stack>
            </Grid>
            <Grid item>
              {!isFetchCategoryLoading &&
              !isFetchGuessLoading &&
              previousSession.guess.isGuessCorrect ? (
                <>
                  <Confetti width={width} height={height} recycle={false} />
                  <CorrectGuess
                    results={previousSession.guess.results}
                    category={previousSession.category}
                    isChosenCategory={!!categoryTitle}
                    streak={previousSession.streak}
                  />
                </>
              ) : (
                <></>
              )}
            </Grid>
          </Grid>
        </Container>
      </CountdownProvider>
    </ThemeRegistry>
  );
}
