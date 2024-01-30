import { useState, useEffect } from "react";
import { Button, TextField, Autocomplete, Stack } from "@mui/material";
import { PossibleGuess } from "../types";

export function GuessBar(props: {
  title: string;
  possibleGuesses: PossibleGuess[];
  handleGuess: (query: string) => void;
  shouldDisable: boolean;
}) {
  const { title, possibleGuesses, handleGuess, shouldDisable } = props;
  const [guess, setGuess] = useState<string>("");
  const [options, setOptions] = useState<PossibleGuess[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    if (inputValue === "") {
      setOptions(
        possibleGuesses
          .slice(0, 5)
          .sort((a, b) =>
            a.name.toLowerCase().localeCompare(b.name.toLowerCase())
          )
      );
    } else {
      setOptions(
        possibleGuesses.filter((o) =>
          o.name.toLowerCase().startsWith(inputValue.toLowerCase().trim())
        )
      );
    }
  }, [inputValue, possibleGuesses]);

  return (
    <form
      onSubmit={(e: React.SyntheticEvent): void => {
        e.preventDefault();
        handleGuess(guess);
        setGuess("");
      }}
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
          filterOptions={(x) => x}
          onChange={(event: any, newValue: string | null) => {
            setGuess(newValue ?? "");
          }}
          options={options.map((guess) => guess.name)}
          autoComplete
          includeInputInList
          filterSelectedOptions
          noOptionsText={`No ${title.toLowerCase()} found`}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Type here for your guess..."
              fullWidth
              disabled={shouldDisable}
              InputProps={{ ...params.InputProps }}
            />
          )}
          getOptionLabel={(option) => option}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          size="small"
          sx={{ width: "100%" }}
        />
        <Button variant="contained" type="submit">
          Guess
        </Button>
      </Stack>
    </form>
  );
}
