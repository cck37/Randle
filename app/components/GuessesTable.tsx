import { Attribute, Guess } from "@/app/types";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useTheme } from "@mui/material/styles";

const compareStrings = (a: string, b: string): number =>
  a.toUpperCase() < b.toUpperCase()
    ? -1
    : a.toUpperCase() > b.toUpperCase()
    ? 1
    : 0;

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
                    style={{
                      color: `${
                        attr.isCorrect
                          ? theme.palette.success.main
                          : theme.palette.error.main
                      }`,
                    }}
                  >
                    {attr.value ?? "N/A"}
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
