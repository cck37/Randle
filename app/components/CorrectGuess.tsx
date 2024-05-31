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
import Divider from "@mui/material/Divider";

import { useTheme } from "@mui/material/styles";
import ShareIcon from "@mui/icons-material/Share";
import { CountDownTimer } from "./CountDownTimer";
import { CategoryResponse } from "../types";

const resultToText = (results: any) => {
  return results.map((res: any) =>
    res.data
      .map((attr: any) =>
        attr.res.isCorrect ? "🟩" : attr.res.isPartial ?? false ? "🟨" : "🟥"
      )
      .join(" ")
  );
};

const generateHashtags = (results: any, items: any) => {
  let hashtags = ["#Randle"];
  if (results.length === 1) hashtags.push("#IProbablyCheated");
  else if (results.length < Math.floor(items.length * 0.1))
    hashtags.push("#ImBetterThanYou");
  else if (results.length < Math.floor(items.length * 0.15))
    hashtags.push("#DontBotherTrying");
  else if (results.length < Math.floor(items.length * 0.19))
    hashtags.push("#NotEvenCloseBaby");
  else if (results.length < Math.floor(items.length * 0.2))
    hashtags.push("#YouSuck");
  else if (results.length < Math.floor(items.length * 0.3))
    hashtags.push("#NotEvenFarIfImBeingHonest");
  else if (results.length < Math.floor(items.length * 0.35))
    hashtags.push("#IAmBadAndIShouldFeelBad");
  if (results.length > Math.floor(items.length * 0.35))
    hashtags.push("#Bullshit");

  return hashtags.join(" ");
};

const resultsToShare = (results: any, title: string, items: any) => {
  return `${title}\nGot it in: ${results.length}\n${resultToText(results).join(
    "\n"
  )}\n${generateHashtags(results, items)}`;
};

type Props = {
  results: any;
  category: CategoryResponse;
};
export const CorrectGuess = forwardRef<HTMLUListElement, Props>(
  function CorrectGuess(
    props: {
      results: any;
      category: CategoryResponse;
    },
    ref
  ) {
    const { results, category } = props;
    const { title, items } = category;
    const [open, setOpen] = useState<boolean>(true);
    const [snackOpen, setSnackOpen] = useState<boolean>(false);
    const handleClose = () => setOpen(false);
    const handleShare = () => {
      navigator.clipboard.writeText(resultsToShare(results, title, items));
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
          sx={{
            "& .MuiDialog-paper": {
              width: "90vw",
              maxWidth: "600px",
            },
          }}
        >
          <DialogTitle
            id="you-win-modal-it-alert-title"
            variant="h1"
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
          <Divider />
          <DialogContent id="you-win-modal-result">
            <Stack direction="column" alignItems="center" gap={2}>
              <Typography
                variant="h2"
                sx={{
                  color: theme.palette.primary.main,
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
