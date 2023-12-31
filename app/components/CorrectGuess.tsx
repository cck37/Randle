import { Button, Typography, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export function CorrectGuess(props: { handleReset: () => void }) {
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
      <Typography variant="h2" sx={{ color: theme.palette.success.main }}>
        You did it!
      </Typography>
      <Button onClick={handleReset}>Try again?</Button>
    </Stack>
  );
}
