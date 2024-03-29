import { useCallback, useState } from "react";
import { Button, TextField, Autocomplete, Stack } from "@mui/material";
import { PossibleGuess } from "../types";
import { matchSorter } from "match-sorter";

const filterOptions = (
  options: string[],
  { inputValue }: { inputValue: string }
) => matchSorter(options, inputValue);

export function GuessBar(props: {
  title: string;
  possibleGuesses: PossibleGuess[];
  handleGuess: (query: string) => void;
  shouldDisable: boolean;
}) {
  const { title, possibleGuesses, handleGuess, shouldDisable } = props;
  const [guess, setGuess] = useState<string | null>("");
  const onSubmit = useCallback(
    (e: React.SyntheticEvent): void => {
      e.preventDefault();
      handleGuess(guess ?? "");
      setGuess("");
    },
    [guess, handleGuess]
  );

  return (
    <form
      onSubmit={onSubmit}
      style={{
        width: "100%",
        marginTop: "0px",
        display: "flex",
        justifyContent: "space-evenly",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2 }}
        justifyContent="space-evenly"
        width={"50%"}
      >
        <Autocomplete
          id="guess-selection"
          value={guess}
          onChange={(event: any, newGuess: string | null) => {
            setGuess(newGuess);
          }}
          filterOptions={filterOptions}
          autoComplete
          includeInputInList
          filterSelectedOptions
          noOptionsText={`No ${title.toLowerCase()} found`}
          renderInput={(params) => (
            <TextField
              {...params}
              key={params.id}
              label="Your guess..."
              fullWidth
              disabled={shouldDisable}
              InputProps={{ ...params.InputProps }}
            />
          )}
          getOptionLabel={(option) => option}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          size="small"
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            "& label, button": {
              color: "text.primary",
              "&.Mui-focused": {
                color: "text.primary",
              },
            },
            minWidth: "150px",
          }}
          options={possibleGuesses.map((g) => g.name)}
        />
        <Button
          variant="contained"
          type="submit"
          sx={{ minWidth: "150px" }}
          disabled={shouldDisable}
        >
          Guess
        </Button>
      </Stack>
    </form>
  );
}
