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
import Zoom from "@mui/material/Zoom";

import { Theme, useTheme } from "@mui/material/styles";

const guessHeaderStyle = {
  backgroundColor: "primary.main",
  color: "primary.contrastText",
  fontSize: "1rem",
};

const guessValueTrim = (attr: GuessAttributeResponse): string => {
  switch (attr.attributeType) {
    case "multipart":
      return attr.value.split(",").filter(Boolean).join(", ");
    case "date":
      return new Date(parseInt(attr.value)).toLocaleDateString();
    case "string":
    case "number":
    default:
      return attr.value;
  }
};

//TODO: Safer to use attributeType but whatever. Cant assume all data is bad data
const guessResToStyle = (res: CorrectResponse, theme: Theme): any => {
  const { isCorrect } = res;
  const baseStyle = {
    color: theme.palette.secondary.contrastText,
    borderColor: "divider",
    borderLeft: "1px solid !important",
  };

  if ("isPartial" in res && res.isPartial) {
    return {
      ...baseStyle,
      backgroundColor: isCorrect
        ? theme.palette.success.main
        : res.isPartial
        ? theme.palette.warning.main
        : theme.palette.error.main,
    };
  } else if ("isAbove" in res) {
    const arrow = res.isAbove ? "↑" : "↓";
    return {
      ...baseStyle,
      backgroundColor: isCorrect
        ? theme.palette.success.main
        : theme.palette.error.main,
      "&::after": {
        content: `" ${isCorrect ? "" : arrow}"`,
      },
    };
  } else {
    return {
      ...baseStyle,
      backgroundColor: isCorrect
        ? theme.palette.success.main
        : theme.palette.error.main,
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
  attributes.sort((a, b) => a.id - b.id);
  guesses.forEach((guess) =>
    guess.data.sort((a, b) => a.attributeId - b.attributeId)
  );

  const theme = useTheme();
  return (
    <TableContainer component={Paper}>
      <Table stickyHeader aria-label="result table">
        <TableHead>
          <TableRow>
            <TableCell sx={guessHeaderStyle}>Guess</TableCell>
            {attributes.map((attr) => (
              <TableCell align="left" key={attr.id} sx={guessHeaderStyle}>
                {attr.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        {guesses.length > 0 ? (
          <TableBody>
            {guesses.map((guess) => (
              <TableRow
                key={`row-${guess.id}`}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <Zoom in={true}>
                  <TableCell component="th" scope="row">
                    {guess.name}
                  </TableCell>
                </Zoom>
                {guess.data.map((attr, idx) => (
                  <Zoom
                    in={true}
                    key={`zoom-${guess.id}-${attr.name}`}
                    style={{ transitionDelay: `${500 * (idx + 1)}ms` }}
                  >
                    <TableCell
                      align="right"
                      key={`${guess.id}-${attr.name}`}
                      sx={guessResToStyle(attr.res, theme)}
                    >
                      {guessValueTrim(attr)}
                    </TableCell>
                  </Zoom>
                ))}
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <></>
        )}
      </Table>
    </TableContainer>
  );
}
