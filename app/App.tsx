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
  const [categoryPar, setCategoryPar] = useState<number>(0); // HACK: Should be part of the response from the API

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
    if (!isFetchCategoryLoading && isValidStorage(previousSession, category)) {
      const currTheme = createTheme(previousSession.category.theme);
      setTheme(responsiveFontSizes(currTheme));

      setCategoryPar(getPar(category.items.length)); // HACK: Move to API response
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

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      const isTimestampYesterday =
        new Date(previousSession?.timeStamp ?? 0).toDateString() ===
        yesterday.toDateString();
      setPreviousSession({
        timeStamp: Date.now(),
        category: category,
        guess: emptyGuessState,
        streak: isTimestampYesterday ? previousSession?.streak || 0 : 0,
      });
      setGuessState(emptyGuessState);

      setTheme(responsiveFontSizes(currTheme));
      setCategoryPar(getPar(category.items.length)); // HACK: Move to API response
    }
  }, [
    category,
    previousSession,
    setPreviousSession,
    isFetchCategoryLoading,
    setGuessState,
  ]);

  // Remove last guess from possible guesses
  useEffect(() => {
    if (previousSession.guess.results === guess.results || isFetchGuessLoading)
      return;

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
        prevState.guess.results.length + 1 < categoryPar
          ? prevState.streak + 1
          : prevState.streak,
    }));
  }, [
    guess,
    setPreviousSession,
    isFetchGuessLoading,
    previousSession.guess.results,
    categoryPar,
  ]);

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
                  isValidStorage(previousSession, category)) &&
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
