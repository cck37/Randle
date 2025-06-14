import { useCallback, useState } from "react";
import {
  Button,
  TextField,
  Autocomplete,
  Stack,
  Chip,
  Paper,
} from "@mui/material";
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
      if (!guess) return;
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
            backgroundColor: "background.paper",
            "& label, button": {
              color: "primary.main",
              "&.Mui-focused": {
                color: "primary.main",
              },
            },
            minWidth: "150px",
          }}
          options={possibleGuesses.map((g) => g.name)}
          // Because next.js https://stackoverflow.com/a/75968316
          renderOption={(props, option) => {
            return (
              <li {...props} key={option}>
                {option}
              </li>
            );
          }}
          renderTags={(tagValue, getTagProps) => {
            return tagValue.map((option, index) => (
              <Chip {...getTagProps({ index })} key={option} label={option} />
            ));
          }}
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
