import { forwardRef } from "react";
import { Button, Typography, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";

type Props = {
  handleReset: () => void;
};
export const CorrectGuess = forwardRef<HTMLUListElement, Props>(
  function CorrectGuess(
    props: {
      handleReset: () => void;
    },
    ref
  ) {
    const { handleReset } = props;
    const theme = useTheme();
    return (
      <Stack
        direction="column"
        alignItems="center"
        sx={{
          width: "100%",
        }}
      >
        <Typography
          variant="h2"
          sx={{ color: theme.palette.success.main }}
          ref={ref}
        >
          You did it!
        </Typography>
        <Button onClick={handleReset}>Try again?</Button>
      </Stack>
    );
  }
);
