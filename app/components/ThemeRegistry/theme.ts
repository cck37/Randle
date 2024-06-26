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
    fontFamily: "Roboto mono, monospace",
  },
});

export default theme;
