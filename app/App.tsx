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

import { CategoryResponse, Guess, GuessResponse, PossibleGuess } from "./types";
import ThemeRegistry from "./components/ThemeRegistry/ThemeRegistry";
import { CountdownProvider } from "./components/CountdownContext";
import { CountDownTimer } from "./components/CountDownTimer";
import { flushSync } from "react-dom";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import { useLocalStorage } from "./hooks/useLocaleStorage";
import { timestampToDate } from "./api/utils";

type GuessState = {
  possibleGuesses: PossibleGuess[];
  query: string;
  results: Guess[];
  isGuessCorrect: boolean;
  isGuessQueryLoading: boolean;
};

type StorageState = {
  timeStamp: number;
  category: CategoryResponse;
  guess: GuessState;
};

const isValidStorage = (
  storageItem: StorageState
): storageItem is StorageState =>
  !!storageItem &&
  timestampToDate(storageItem?.timeStamp).toDateString() ===
    timestampToDate(Date.now()).toDateString();

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
  const correctRef = useRef<HTMLUListElement | null>(null);
  const { width, height } = useWindowSize();
  const [previousSession, setPreviousSession] = useLocalStorage("session");

  useEffect(() => {
    const fetchData = async () => {
      // TODO: Don't send Date.now; just get the date value from the API
      const res = await fetch(`/api/category?date=${Date.now()}`);
      const categoryResponse: CategoryResponse = await res.json();
      const { items, theme: themeOptions } = categoryResponse;
      const guessState: GuessState = {
        possibleGuesses: items,
        query: "",
        results: [],
        isGuessCorrect: false,
        isGuessQueryLoading: false,
      };

      // Set session state
      setCategoryState(categoryResponse);
      setGuessState(guessState);

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

      // Save state to LS
      // setPreviousSession({
      //   timeStamp: Date.now(),
      //   category: categoryResponse,
      //   guess: guessState,
      // });
    };

    // if (isValidStorage(previousSession)) {
    //   const { category, guess } = previousSession;
    //   setCategoryState(category);
    //   setGuessState({
    //     ...guess,
    //     isGuessQueryLoading: false,
    //   });
    //   const theme = createTheme(category.theme);
    //   setTheme(responsiveFontSizes(theme));
    // } else {
    fetchData();
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { possibleGuesses, results, isGuessCorrect, isGuessQueryLoading } =
    guessState;

  async function fetchGuessResponse({
    query,
  }: {
    query: string;
  }): Promise<void> {
    setGuessState((prevState) => ({ ...prevState, isGuessQueryLoading: true }));

    try {
      // Sending seconds from epoc to API b/c I can't figure out how API caching works in next
      const queryString = new URLSearchParams({
        guess: query,
        date: Date.now().toString(),
      }).toString();
      const res = await fetch(`/api/guess?${queryString}`);
      const guessResponse: Guess = await res.json();

      console.log(previousSession, guessState, guessResponse);
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

      console.log(previousSession, guessState, guessResponse);
      // setPreviousSession({
      //   ...previousSession,
      //   guess: guessState,
      // });
      console.log(previousSession, guessState, guessResponse);

      if (guessResponse.data.every((attr) => attr.res.isCorrect)) {
        flushSync(() => {
          console.log("Scroll dammit");
          correctRef.current?.lastElementChild?.scrollIntoView();
        });
      }
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

  const handleGuess = useCallback(async (query: string) => {
    if (query) {
      await fetchGuessResponse({ query });
    }
  }, []);

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
                {categoryState ? (
                  <>
                    <Typography
                      variant="h1"
                      sx={{ paddingY: "1rem", textAlign: "center" }}
                    >
                      {categoryState.title}
                    </Typography>
                    <GuessBar
                      title={categoryState.title}
                      possibleGuesses={possibleGuesses}
                      handleGuess={handleGuess}
                      shouldDisable={isGuessCorrect || isGuessQueryLoading}
                    />
                    <CountDownTimer />
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
