import { Typography, Stack } from "@mui/material";
import { useCountdownToMidnight } from "../hooks/useCountdownToMidnight";

// Format seconds into HH:MM:SS
const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(remainingSeconds).padStart(2, "0")}`;
};

export const CountDownTimer = () => {
  const timeUntilMidnight = useCountdownToMidnight();
  return (
    <Stack direction="column" alignItems="center">
      <Typography variant="h5">Time Until Next Category*</Typography>
      <Typography variant="h5">{formatTime(timeUntilMidnight)}</Typography>
      <Typography variant="subtitle1">*midnight EST</Typography>
    </Stack>
  );
};
