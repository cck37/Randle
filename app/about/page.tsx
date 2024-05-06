"use client";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Logo from "../components/Logo";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { GuessesTable } from "../components/GuessesTable";
import { Link, useTheme } from "@mui/material";

export default function About() {
  const theme = useTheme();
  return (
    <Box display="flex" width="100%" justifyContent="center">
      <Stack
        alignItems="center"
        justifyContent="center"
        width={{ xs: "90%", sm: "calc(50% - 20px)", md: "calc(33% - 20px)" }}
        textAlign="center"
      >
        <Paper>
          <Typography variant="h3">This is Randle</Typography>
          <ArrowDownwardIcon sx={{ fontSize: 40 }} />
        </Paper>
        <Logo width={100} />
        <Paper>
          <Typography variant="body1">
            Randle is also a game where you guess the attributes of a category.{" "}
            <br />
            Kind of like Wordle but instead getting hints on letters, you gain
            information about attributes in a category. Heavy inspirtion from
            sites like <Link href="https://loldle.net/">Loldle</Link> and{" "}
            <Link href="https://pokedle.net/">Pokedle</Link>.
            <br />
          </Typography>
        </Paper>
        <Paper>
          <Typography variant="body1">
            {"You can gain 4 different types of info:"}
          </Typography>
        </Paper>
        <Stack spacing={3} direction="column" alignItems="center">
          <Typography variant="body1">
            {"String fields will be in"}
            <Typography
              variant="body1"
              sx={{ color: theme.palette.success.main }}
            >
              green
            </Typography>
            {"if the answer is correct and"}
            <Typography
              variant="body1"
              sx={{ color: theme.palette.error.main }}
            >
              red
            </Typography>
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
        </Stack>
        <Stack spacing={3} direction="column" alignItems="center">
          <Typography variant="body1">
            {"Numeric or date fields will show"}
            <Typography
              variant="body1"
              sx={{ color: theme.palette.error.main }}
            >
              {"↓ or ↑"}
            </Typography>
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
        </Stack>
        <Stack spacing={3} direction="column" alignItems="center">
          <Typography variant="body1">
            {"Multipart fields will be in"}{" "}
            <Typography
              variant="body1"
              sx={{ color: theme.palette.success.main }}
            >
              green
            </Typography>{" "}
            {"if the answer is correct and"}{" "}
            <Typography
              variant="body1"
              sx={{ color: theme.palette.warning.main }}
            >
              yellow
            </Typography>{" "}
            {"if the answer is partially correct and"}
            <Typography
              variant="body1"
              sx={{ color: theme.palette.error.main }}
            >
              red
            </Typography>{" "}
            {"if the answer is incorrect"}
          </Typography>
          <GuessesTable
            attributes={[
              { name: "Number of species", id: 1, attributeType: "number" },
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
        </Stack>
        <Typography variant="body1">
          If you win, you can share your results with the share button. Your
          result will be on your clipboard.
        </Typography>
        <Typography variant="body1">
          Good luck and have fun. If you have any suggestions or issues, please
          reachout to me on{" "}
          <Link href="https://github.com/cck37/Randle/issues">
            Github issues
          </Link>{" "}
          or <Link href="mailto:ckennedy0323@gmail.com">email</Link>.
        </Typography>
      </Stack>
    </Box>
  );
}
