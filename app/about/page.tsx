"use client";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Logo from "../components/Logo";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { GuessesTable } from "../components/GuessesTable";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import useTheme from "@mui/material/styles/useTheme";
import ShareIcon from "@mui/icons-material/Share";

export default function About() {
  const theme = useTheme();
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      gap={3}
    >
      <Typography variant="h3">This is Randle</Typography>
      <ArrowDownwardIcon sx={{ fontSize: 40 }} />
      <Logo width={100} />
      <Typography variant="subtitle1">
        {
          "Randle is also a game where try to guess a new item based on hints from your previous guesses."
        }
      </Typography>
      <Typography variant="body1">
        Kind of like Wordle but instead getting hints on letters, you gain
        information about attributes in a category. And unlike Wordle, the
        category changes each day.
      </Typography>
      <Typography variant="body1">
        A category could be{" "}
        <span style={{ fontFamily: "Bebas Neue, sans-serif", color: "white" }}>
          MOVIES{" "}
        </span>
        ,{" "}
        <span
          style={{ fontFamily: "Harry Potter, sans-serif", color: "#c9bc75" }}
        >
          Harry Potter
        </span>
        ,{" "}
        <span
          style={{
            fontFamily:
              "Disney, Droid Sans, system-ui, Avenir, Helvetica, Arial, sans-serif",
            color: "#2196F3",
          }}
        >
          Animated Disney Movies
        </span>
        , and more. Stop by daily for a unique challenge.
      </Typography>
      <Typography variant="body1">
        Heavy inspirtion from sites like{" "}
        <Link href="https://loldle.net/">Loldle</Link> and{" "}
        <Link href="https://pokedle.net/">Pokedle</Link>.
      </Typography>
      <Typography variant="body1">
        {"You can gain 4 different types of info:"}
      </Typography>
      <Typography variant="body1">
        {"Text fields which will be"}
        <span style={{ color: theme.palette.success.main }}> green </span>
        {"if the answer is correct and"}
        <span style={{ color: theme.palette.error.main }}> red </span>
        {"if the answer is incorrect"}
      </Typography>
      <GuessesTable
        attributes={[
          { name: "Could eat me whole?", id: 1, attributeType: "string" },
        ]}
        guesses={[
          {
            name: "Hippo",
            id: 1,
            data: [
              {
                id: 1,
                attributeId: 1,
                name: "Could eat me whole?",
                value: "Yes",
                attributeType: "string",
                res: { isCorrect: true },
              },
            ],
          },
          {
            name: "Segull",
            id: 3,
            data: [
              {
                id: 1,
                attributeId: 1,
                name: "Could eat me whole?",
                value: "No",
                attributeType: "string",
                res: { isCorrect: false },
              },
            ],
          },
        ]}
      />
      <Typography variant="body1">
        {"Numeric or date fields will also be colored and will have"}
        <span style={{ color: theme.palette.error.main }}>{" ↓ "}</span>
        or
        <span style={{ color: theme.palette.error.main }}>{" ↑ "}</span>
        {
          "if the answer is incorrect and the correct answer is lower or higher respectively"
        }
      </Typography>
      <GuessesTable
        attributes={[
          { name: "Number of species", id: 1, attributeType: "number" },
          { name: "Date I last saw one", id: 2, attributeType: "date" },
        ]}
        guesses={[
          {
            name: "Hippo",
            id: 1,
            data: [
              {
                id: 1,
                attributeId: 1,
                name: "Number of species",
                value: "2",
                attributeType: "number",
                res: { isCorrect: true, isAbove: false },
              },
              {
                id: 2,
                attributeId: 2,
                name: "Date I last saw one",
                value: "1634028000000",
                attributeType: "date",
                res: { isCorrect: true, isAbove: false },
              },
            ],
          },
          {
            name: "Shark",
            id: 2,
            data: [
              {
                id: 1,
                attributeId: 1,
                name: "Number of species",
                value: "400",
                attributeType: "number",
                res: { isCorrect: false, isAbove: false },
              },
              {
                id: 2,
                attributeId: 2,
                name: "Date I last saw one",
                value: "1534016000000",
                attributeType: "date",
                res: { isCorrect: false, isAbove: true },
              },
            ],
          },
          {
            name: "Lion",
            id: 3,
            data: [
              {
                id: 1,
                attributeId: 1,
                name: "Number of species",
                value: "1",
                attributeType: "number",
                res: { isCorrect: false, isAbove: true },
              },
              {
                id: 2,
                attributeId: 2,
                name: "Date I last saw one",
                value: "1664029000000",
                attributeType: "date",
                res: { isCorrect: false, isAbove: false },
              },
            ],
          },
        ]}
      />
      <Typography variant="body1">
        {"Multipart fields will be"}
        <span style={{ color: theme.palette.success.main }}>{" green "}</span>
        {"if the answer is correct, "}
        <span style={{ color: theme.palette.warning.main }}>{" yellow "}</span>
        {"if the answer is partially correct and"}
        <span style={{ color: theme.palette.error.main }}>{" red "}</span>
        {"if the answer is incorrect"}
      </Typography>
      <GuessesTable
        attributes={[
          { name: "Can live in...", id: 1, attributeType: "multipart" },
        ]}
        guesses={[
          {
            name: "Hippo",
            id: 1,
            data: [
              {
                id: 1,
                attributeId: 1,
                name: "Can live in...",
                value: "Land, Water",
                attributeType: "multipart",
                res: { isCorrect: true, isPartial: false },
              },
            ],
          },
          {
            name: "Shark",
            id: 2,
            data: [
              {
                id: 1,
                attributeId: 1,
                name: "Can live in...",
                value: "Water",
                attributeType: "multipart",
                res: { isCorrect: false, isPartial: true },
              },
            ],
          },
          {
            name: "Segull",
            id: 3,
            data: [
              {
                id: 1,
                attributeId: 1,
                name: "Can live in...",
                value: "Air",
                attributeType: "multipart",
                res: { isCorrect: false, isPartial: false },
              },
            ],
          },
        ]}
      />
      <Typography variant="body1">
        <Box display="flex" alignItems="center" sx={{ flexWrap: "wrap" }}>
          If you win, you can share your results with the{" "}
          <ShareIcon sx={{ paddingX: "2px" }} />
          button. Your result will be on your clipboard.
        </Box>
      </Typography>
      <Typography variant="body1">Good luck and have fun.</Typography>
    </Stack>
  );
}
