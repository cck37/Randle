import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#8C7FAB",
    },
    secondary: {
      main: "#13D05A",
    },
  },
  typography: {
    h1: {
      fontFamily: "Droid Serif",
    },
  },
});

export default theme;
