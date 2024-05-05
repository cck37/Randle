import { forwardRef, useState } from "react";
import {
  Button,
  Typography,
  Stack,
  Modal,
  Box,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ShareIcon from "@mui/icons-material/Share";
import { Close } from "@mui/icons-material";
import { CountDownTimer } from "./CountDownTimer";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: ".5px solid #0000007a",
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
};

const resultToText = (results: any) => {
  return results.map((res: any) =>
    res.data
      .map((attr: any) =>
        attr.res.isCorrect ? "🟩" : attr.res.isPartial ?? false ? "🟨" : "🟥"
      )
      .join(" ")
  );
};

const resultsToShare = (results: any, title: string) => {
  return `${title}\nGot it in: ${results.length}\n${resultToText(results).join(
    "\n"
  )}\n#Randle #ImBetterThanYou #YouSuck #YouLost #YouCantBeatMe #YouCantWin #YouCantGuess #YouCantDoIt`;
};

type Props = {
  results: any;
  title: string;
};
export const CorrectGuess = forwardRef<HTMLUListElement, Props>(
  function CorrectGuess(
    props: {
      results: any;
      title: string;
    },
    ref
  ) {
    const { results, title } = props;
    const [open, setOpen] = useState<boolean>(true);
    const handleClose = () => setOpen(false);
    const handleShare = () => {
      navigator.clipboard.writeText(resultsToShare(results, title));
      handleClose();
    };
    const theme = useTheme();
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-you-win-title"
        aria-describedby="modal-modal-you-win-result"
      >
        <Box sx={style}>
          <Stack direction="column" alignItems="center" gap={1}>
            <Typography
              variant="h1"
              sx={{ color: theme.palette.success.main }}
              ref={ref}
              id="modal-modal-you-win-title"
            >
              You did it!
            </Typography>
            <IconButton
              onClick={handleClose}
              sx={{
                position: "fixed",
                top: 0,
                right: 0,
                zIndex: 2000,
              }}
            >
              <Close />
            </IconButton>
            <hr style={{ width: "100%" }} />
            <Typography variant="h1">{title}</Typography>
            <Typography variant="h3">{results[0].name}</Typography>
            <Box>
              {resultToText(results)
                .reverse()
                .map((res: any, idx: number) => (
                  <Typography key={idx} variant="h4">
                    {res}
                  </Typography>
                ))}
            </Box>
            <Typography variant="h4">Got it in: {results.length}</Typography>
            <CountDownTimer />
            <Button onClick={handleShare} variant="contained">
              <ShareIcon /> Share
            </Button>
          </Stack>
        </Box>
      </Modal>
    );
  }
);
