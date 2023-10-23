import { useState } from "react";
import {
  Button,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";

export function GuessBar(props: {
  title: string;
  possibleGuesses: PossibleGuessesType[];
  handleGuess: React.Dispatch<React.SetStateAction<string>>;
  shouldDisable: boolean;
}) {
  const { title, possibleGuesses, handleGuess, shouldDisable } = props;
  const [guess, setGuess] = useState<string>("");
  const handleChange = (event: SelectChangeEvent) => {
    setGuess(event.target.value as string);
  };

  // FIX: Warning: Prop `className` did not match
  // https://mui.com/material-ui/guides/server-rendering/
  // https://mui.com/material-ui/guides/next-js-app-router/

  return (
    <form
      onSubmit={(e: React.SyntheticEvent): void => {
        e.preventDefault();
        handleGuess(guess);
        setGuess("");
      }}
      style={{ width: "100%" }}
    >
      <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 1, sm: 2 }}>
        {/* TODO: Move to Autocomplete https://mui.com/material-ui/react-autocomplete/ */}
        <FormControl fullWidth>
          <InputLabel id="guess-selection-label">{title}</InputLabel>
          <Select
            labelId="guess-selection-label"
            id="guess-selection"
            value={guess}
            label={title}
            onChange={handleChange}
            fullWidth
            disabled={shouldDisable}
            inputProps={{ MenuProps: { disableScrollLock: true } }}
          >
            {possibleGuesses.map((guess) => (
              <MenuItem value={guess.name} key={guess.name}>
                {guess.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" type="submit">
          Guess
        </Button>
      </Stack>
    </form>
  );
}

type PossibleGuessesType = {
  name: string;
  attributes: Array<object>;
};
