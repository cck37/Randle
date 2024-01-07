import {
  Attribute,
  CorrectResponse,
  Guess,
  GuessAttributeResponse,
} from "@/app/types";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { Theme, useTheme } from "@mui/material/styles";

const compareStrings = (a: string, b: string): number =>
  a.toUpperCase() < b.toUpperCase()
    ? -1
    : a.toUpperCase() > b.toUpperCase()
    ? 1
    : 0;

const guessValueTrim = (attr: GuessAttributeResponse): string =>
  attr.attributeType === "multipart"
    ? attr.value.split(",").filter(Boolean).join(", ")
    : attr.value;

//TODO: Safer to use attributeType but whatever. Cant assume all data is bad data
const guessResToStyle = (res: CorrectResponse, theme: Theme): any => {
  const { isCorrect } = res;

  if ("isPartial" in res && res.isPartial) {
    return {
      color: isCorrect
        ? theme.palette.success.main
        : res.isPartial
        ? theme.palette.warning.main
        : theme.palette.error.main,
    };
  } else if ("isAbove" in res || "isAbove" in res) {
    const arrow = res.isAbove ? "↓" : "↑";
    return {
      color: isCorrect ? theme.palette.success.main : theme.palette.error.main,
      "&::after": {
        content: `" ${isCorrect ? "" : arrow}"`,
      },
    };
  } else {
    return {
      color: isCorrect ? theme.palette.success.main : theme.palette.error.main,
    };
  }
};

export function GuessesTable(props: {
  attributes: Attribute[];
  guesses: Guess[];
}) {
  const { attributes, guesses } = props;

  // Sort both in the same order so they hopefully line up
  // ...or just install data grid
  attributes.sort((a, b) => compareStrings(a.name, b.name));
  guesses.forEach((guess) =>
    guess.data.sort((a, b) => compareStrings(a.name, b.name))
  );

  const theme = useTheme();
  return (
    <TableContainer component={Paper}>
      {guesses.length > 0 ? (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Guess</TableCell>
              {attributes.map((attr) => (
                <TableCell align="right" key={attr.id}>
                  {attr.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {guesses.map((guess) => (
              <TableRow
                key={guess.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {guess.name}
                </TableCell>
                {guess.data.map((attr) => (
                  <TableCell
                    align="right"
                    key={`${guess.id}-${attr.name}`}
                    sx={guessResToStyle(attr.res, theme)}
                  >
                    {guessValueTrim(attr)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <></>
      )}
    </TableContainer>
  );
}
