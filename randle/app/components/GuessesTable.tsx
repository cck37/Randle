import { Attribute, GuessResponse } from "@/app/types";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";

export function GuessesTable(props: {
  attributes: Attribute[];
  guesses: GuessResponse[];
}) {
  const { attributes, guesses } = props;
  const theme = useTheme();
  return (
    <TableContainer component={Paper}>
      {guesses.length > 0 ? (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Guess</TableCell>
              {attributes.map((attr) => (
                <TableCell align="right" key={attr.name}>
                  {attr.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {guesses.map((guess) => (
              <TableRow
                key={guess.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {guess.name}
                </TableCell>
                {guess.data.map((attr) => (
                  <TableCell
                    align="right"
                    key={`${guess.name}-${attr.value}`}
                    style={{
                      color: `${
                        attr.isCorrect
                          ? theme.palette.success.main
                          : theme.palette.error.main
                      }`,
                    }}
                  >
                    {attr.value}
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
