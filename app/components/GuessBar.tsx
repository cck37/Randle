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

  return (
    <form
      onSubmit={(e: React.SyntheticEvent): void => {
        e.preventDefault();
        handleGuess(guess);
        setGuess("");
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{title}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={guess}
            label={title}
            onChange={handleChange}
            fullWidth
            disabled={shouldDisable}
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
