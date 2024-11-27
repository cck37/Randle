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
import copy from "copy-to-clipboard";

import { CountDownTimer } from "./CountDownTimer";
import { CategoryResponse } from "../types";
import { getPar } from "../utils";

const resultToText = (results: any) => {
  return results.map((res: any) =>
    res.data
      .map((attr: any) => {
        if (attr.res.isCorrect) return "🟩";
        else if (attr.res.isPartial ?? false) return "🟧";
        else if (
          Object.hasOwnProperty.call(attr.res, "isAbove") &&
          attr.res.isAbove
        )
          return "🔺";
        else if (
          Object.hasOwnProperty.call(attr.res, "isAbove") &&
          !attr.res.isAbove
        )
          return "🔻";
        else return "🟥";
      })
      .join(" ")
  );
};

const buildPercentOfInfoUsedString = (
  resultLength: number,
  itemLength: number
) => `#${Math.floor((resultLength / itemLength) * 100)}%OfInfoUsed`;

const generateHashtags = (results: any, items: any) => {
  let hashtags = ["#Randle"];
  if (results.length === 1) hashtags.push("#IProbablyCheated");
  else if (results.length < Math.floor(items.length * 0.02)) {
    hashtags.push("#GGEZ");
  } else if (results.length < Math.floor(items.length * 0.04)) {
    hashtags.push("#ImThatGuy");
  } else if (results.length < Math.floor(items.length * 0.09)) {
    hashtags.push("#NotEvenCloseBaby");
  } else if (results.length < Math.floor(items.length * 0.1)) {
    hashtags.push("#NotEvenFarIfImBeingHonest");
  } else if (results.length < Math.floor(items.length * 0.2)) {
    hashtags.push("#Rigged");
  } else if (results.length < Math.floor(items.length * 0.35)) {
    hashtags.push("#IAmBadAndIShouldFeelBad");
  } else {
    hashtags.push("#RipSame");
  }

  hashtags.push(buildPercentOfInfoUsedString(results.length, items.length));

  hashtags.push(`#Par${getPar(items.length)}`);

  return hashtags.join(" ");
};

const resultsToShare = (
  results: any,
  title: string,
  items: any,
  isChosenCategory: boolean,
  streak: number
) => {
  return `Randle${
    isChosenCategory ? "(Chosen Category Baby Mode)" : ""
  }: ${title} \nGot it in: ${results.length}\n${resultToText(results).join(
    "\n"
  )}\n${generateHashtags(results, items)}\nStreak:${Array(streak)
    .fill("🔥")
    .join("")}\nhttps://www.randle.day/${isChosenCategory ? "choose" : ""}`;
};

export const CorrectGuess = (props: {
  results: any;
  category: CategoryResponse;
  isChosenCategory: boolean;
  streak: number;
}) => {
  const { results, category, isChosenCategory, streak } = props;
  const { title, items } = category;
  const [open, setOpen] = useState<boolean>(true);
  const [snackOpen, setSnackOpen] = useState<boolean>(false);
  const handleClose = () => setOpen(false);
  const handleShare = () => {
    copy(resultsToShare(results, title, items, isChosenCategory, streak), {
      format: "text/plain",
      debug: true,
    });
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
            <Box maxHeight="30vh" sx={{ overflowY: "auto" }}>
              {resultToText(results).map((res: any, idx: number) => (
                <Typography key={idx} variant="h5">
                  {res}
                </Typography>
              ))}
            </Box>
            <Typography variant="h4">Got it in: {results.length}</Typography>
            {streak > 0 && (
              <Typography variant="h4">
                🔥 Under Par Streak: {streak} day{streak > 1 ? "s" : ""}
              </Typography>
            )}
            <CountDownTimer isChosenCategory={isChosenCategory} />
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
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
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
};
