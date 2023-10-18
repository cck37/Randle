import { Button, Typography, useTheme } from "@mui/material";

function CorrectGuess(props: { handleReset: () => void }) {
  const { handleReset } = props;
  const theme = useTheme();
  return (
    <>
      <Typography variant="h2" sx={{ color: theme.palette.success.main }}>
        You did it!
      </Typography>
      <Button onClick={handleReset}>Try again?</Button>
    </>
  );
}

export default CorrectGuess;
