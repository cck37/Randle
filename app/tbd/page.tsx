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
          <Typography variant="h1">TBD</Typography>
          <Typography variant="h3">Hopefully cool stuff soon</Typography>
        </Paper>
      </Stack>
    </Box>
  );
}
