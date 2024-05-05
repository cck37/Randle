"use client";
import { useState, useEffect, useRef } from "react";
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

import { Guess, StorageState } from "./types";
import ThemeRegistry from "./components/ThemeRegistry/ThemeRegistry";
import { CountdownProvider } from "./components/CountdownContext";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import { useLocalStorage } from "./hooks/useLocaleStorage";
import { timestampToDate } from "./api/utils";
import { useFetchGuess } from "./hooks/useFetchGuess";
import { useFetchCategory } from "./hooks/useFetchCategory";

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
};

const isValidStorage = (
  storageItem: StorageState
): storageItem is StorageState =>
  !!storageItem &&
  timestampToDate(storageItem?.timeStamp).toDateString() ===
    timestampToDate(Date.now()).toDateString();

export default function App() {
  const [theme, setTheme] = useState<Theme>();
  const { categoryResponse: category, isLoading: isFetchCategoryLoading } =
    useFetchCategory();
  const correctRef = useRef<HTMLUListElement | null>(null);
  const { width, height } = useWindowSize();
  const [previousSession, setPreviousSession] = useLocalStorage(
    "session",
    defaultStorage
  );
  const {
    getGuessResponse,
    guessState: guess,
    isLoading: isFetchGuessLoading,
  } = useFetchGuess(previousSession.guess);

  // TODO: Refactor this into a custom hook
  // Load the theme from storage if it exists otherwise update the session with the theme
  useEffect(() => {
    if (isValidStorage(previousSession)) {
      const currTheme = createTheme(previousSession.category.theme);
      setTheme(responsiveFontSizes(currTheme));
    } else if (!isFetchCategoryLoading) {
      const { items, theme: themeOptions } = category;
      const currTheme = createTheme(themeOptions);
      setPreviousSession({
        timeStamp: Date.now(),
        category: category,
        guess: {
          possibleGuesses: items,
          query: "",
          results: [],
          isGuessCorrect: false,
          isGuessQueryLoading: false,
        },
      });

      setTheme(responsiveFontSizes(currTheme));
    }
  }, [
    category,
    guess,
    previousSession,
    setPreviousSession,
    isFetchCategoryLoading,
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
    }));

    // if (guess?.data.every((attr) => attr.res.isCorrect)) {
    //   flushSync(() => {
    //     console.log("Scroll dammit");
    //     correctRef.current?.lastElementChild?.scrollIntoView();
    //   });
    // }
  }, [guess, setPreviousSession]);

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
              <Stack spacing={3} direction="column" alignItems="center">
                {(!isFetchCategoryLoading || isValidStorage(previousSession)) &&
                Object.keys(previousSession.guess).length ? (
                  <>
                    <Typography
                      variant="h1"
                      sx={{ paddingY: "1rem", textAlign: "center" }}
                    >
                      {previousSession.category.title}
                    </Typography>
                    <GuessBar
                      title={previousSession.category.title}
                      possibleGuesses={previousSession.guess.possibleGuesses}
                      handleGuess={handleGuess}
                      shouldDisable={
                        previousSession.guess.isGuessCorrect ||
                        isFetchGuessLoading
                      }
                    />
                    <GuessesTable
                      attributes={previousSession.category.attributes}
                      guesses={previousSession.guess.results}
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
              {!isFetchCategoryLoading &&
              !isFetchGuessLoading &&
              previousSession.guess.isGuessCorrect ? (
                <>
                  <Confetti width={width} height={height} recycle={false} />
                  <CorrectGuess
                    ref={correctRef}
                    results={previousSession.guess.results}
                    title={previousSession.category.title}
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
