import { forwardRef, useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import Close from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

import { useTheme } from "@mui/material/styles";
import ShareIcon from "@mui/icons-material/Share";
import { CountDownTimer } from "./CountDownTimer";

const resultToText = (results: any) => {
  return results.map((res: any) =>
    res.data
      .map((attr: any) =>
        attr.res.isCorrect ? "🟩" : attr.res.isPartial ?? false ? "🟨" : "🟥"
      )
      .join(" ")
  );
};

const generateHashtags = (results: any) => {
  let hashtags = ["#Randle"];
  switch (results.length) {
    case 1:
      hashtags.push("#IProbablyCheated");
      break;
    case 2:
      hashtags.push("#ImBetterThanYou");
      break;
    case 3:
      hashtags.push("#DontBotherTrying");
      break;
    case 4:
      hashtags.push("#YouSuck");
      break;
    case 5:
      hashtags.push("#NotEvenCloseBaby");
      break;
    case 6:
      hashtags.push("#NotEvenFarIfImBeingHonest");
      break;
    case 7:
      hashtags.push("#HardButFair");
      break;
    default:
      hashtags.push("#Bullshit");
  }
  return hashtags.join(" ");
};

const resultsToShare = (results: any, title: string) => {
  return `${title}\nGot it in: ${results.length}\n${resultToText(results).join(
    "\n"
  )}\n${generateHashtags(results)}`;
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
    const [snackOpen, setSnackOpen] = useState<boolean>(false);
    const handleClose = () => setOpen(false);
    const handleShare = () => {
      navigator.clipboard.writeText(resultsToShare(results, title));
      setSnackOpen(true);
      handleClose();
    };
    const theme = useTheme();
    return (
      <>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-you-win-title"
          aria-describedby="modal-modal-you-win-result"
        >
          <DialogTitle
            id="you-win-modal-it-alert-title"
            sx={{
              color: theme.palette.success.main,
              textAlign: "center",
              fontSize: theme.typography.h1.fontSize,
              fontFamily: theme.typography.h1.fontFamily,
            }}
          >
            You did it!
          </DialogTitle>
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: theme.palette.primary.main,
            }}
          >
            <Close />
          </IconButton>
          <DialogContent id="you-win-modal-result">
            <Stack direction="column" alignItems="center" gap={2}>
              <Typography
                variant="h2"
                sx={{
                  color: theme.typography.h1.color,
                  textAlign: "center",
                  fontSize: theme.typography.h1.fontSize,
                  fontFamily: theme.typography.h1.fontFamily,
                }}
              >
                {title}
              </Typography>
              <Typography variant="h3">{results[0].name}</Typography>
              <Box maxHeight="30vh" sx={{ overflowY: "scroll" }}>
                {resultToText(results).map((res: any, idx: number) => (
                  <Typography key={idx} variant="h5">
                    {res}
                  </Typography>
                ))}
              </Box>
              <Typography variant="h4">Got it in: {results.length}</Typography>
              <CountDownTimer />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleShare} variant="contained">
              <ShareIcon /> Share
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={snackOpen}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={() => setSnackOpen(false)}
          message="Copied to clipboard. Prove your superiority"
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => setSnackOpen(false)}
            >
              <Close fontSize="small" />
            </IconButton>
          }
        />
      </>
    );
  }
);
