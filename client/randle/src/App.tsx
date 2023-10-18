import "./App.css";
import { useState, useEffect } from "react";

import { GuessesTable } from "./components/GuessesTable";
import { GuessBar } from "./components/GuessBar";

import { CategoryResponse, GuessResponse } from "./types";
import {
  Container,
  CssBaseline,
  Stack,
  Typography,
  ThemeProvider,
  createTheme,
} from "@mui/material";

import fetchData from "./api/fetchData";
import CorrectGuess from "./components/CorrectGuess";
import api from "./api/apiWrapper";

const categoryRes = fetchData("/categories");

function App() {
  const {
    title,
    attributes,
    items,
    theme: themeOptions,
  } = categoryRes.read() as CategoryResponse;
  const theme = createTheme(themeOptions);

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
          const res = await api<GuessResponse>(`/guesses?guess=${query}`);

          setIsGuessQueryLoading(false);
          setResults((r: GuessResponse[]) => [...r, res]);
          setIsGuessCorrect(res.data.every((attr) => attr.isCorrect) ?? false);
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
            possibleGuesses={items}
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
