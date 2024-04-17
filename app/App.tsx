"use client";
import { useState, useEffect, useCallback, useRef } from "react";
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

import {
  CategoryResponse,
  Guess,
  GuessResponse,
  PossibleGuess,
  StorageState,
} from "./types";
import ThemeRegistry from "./components/ThemeRegistry/ThemeRegistry";
import { CountdownProvider } from "./components/CountdownContext";
import { CountDownTimer } from "./components/CountDownTimer";
import { flushSync } from "react-dom";
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
  const { categoryResponse, isLoading: isFetchCategoryLoading } =
    useFetchCategory();
  const {
    getGuessResponse,
    guessResponse,
    isLoading: isFetchGuessLoading,
  } = useFetchGuess();
  const correctRef = useRef<HTMLUListElement | null>(null);
  const { width, height } = useWindowSize();
  const [previousSession, setPreviousSession] = useLocalStorage(
    "session",
    defaultStorage
  );
  const { category, guess } = previousSession;

  useEffect(() => {
    if (isValidStorage(previousSession)) {
      const { category } = previousSession;
      const currTheme = createTheme(category.theme);
      setTheme(responsiveFontSizes(currTheme));
    } else {
      const { items, theme: themeOptions } = categoryResponse;
      const currTheme = createTheme(themeOptions);
      setPreviousSession({
        date: Date.now(),
        category: categoryResponse,
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
  }, [categoryResponse]);

  const handleReset = useCallback(() => {
    // setGuessState((prevState) => ({
    //   ...prevState,
    //   results: [],
    //   isGuessCorrect: false,
    //   query: "",
    //   possibleGuesses: categoryState?.items ?? [],
    // }));
  }, []);

  useEffect(() => {
    setPreviousSession((prevState: StorageState) => ({
      ...prevState,
      guess: {
        ...prevState.guess,
        isGuessQueryLoading: isFetchGuessLoading,
        results: [guessResponse, ...prevState.guess.results],
        isGuessCorrect:
          guessResponse?.data.every((attr) => attr.res.isCorrect) ?? false,
        possibleGuesses: prevState.guess.possibleGuesses.filter(
          (g) => g.name !== guessResponse?.name
        ),
      },
    }));

    if (guessResponse?.data.every((attr) => attr.res.isCorrect)) {
      flushSync(() => {
        console.log("Scroll dammit");
        correctRef.current?.lastElementChild?.scrollIntoView();
      });
    }
  }, [guessResponse, isFetchGuessLoading, setPreviousSession]);

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
                {!isFetchCategoryLoading ? (
                  <>
                    <Typography
                      variant="h1"
                      sx={{ paddingY: "1rem", textAlign: "center" }}
                    >
                      {category.title}
                    </Typography>
                    <GuessBar
                      title={category.title}
                      possibleGuesses={guess.possibleGuesses}
                      handleGuess={handleGuess}
                      shouldDisable={
                        guess.isGuessCorrect || isFetchGuessLoading
                      }
                    />
                    <CountDownTimer />
                    <GuessesTable
                      attributes={category.attributes}
                      guesses={guess.results.filter(Boolean)}
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
              {guess.isGuessCorrect ? (
                <>
                  <Confetti width={width} height={height} recycle={false} />
                  <CorrectGuess handleReset={handleReset} ref={correctRef} />
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
