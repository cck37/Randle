import { ThemeOptions } from "@mui/material";

const cars: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#646cff",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#242424",
    },
    text: {
      primary: "rgba(255,255,255,0.87)",
    },
  },
  typography: {
    fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
  },
};

const movies: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#FF5722",
    },
    secondary: {
      main: "#2196F3",
    },
    error: {
      main: "#F44336",
    },
    background: {
      default: "#121212",
    },
    text: {
      primary: "#FFFFFF",
    },
  },
  typography: {
    h1: {
      fontFamily: "Bebas Neue, sans-serif",
    },
    h2: {
      fontFamily: "Bebas Neue, sans-serif",
    },
    h3: {
      fontFamily: "Bebas Neue, sans-serif",
    },
    h4: {
      fontFamily: "Bebas Neue, sans-serif",
    },
    h5: {
      fontFamily: "Bebas Neue, sans-serif",
    },
  },
};

const sneakers: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#915430",
    },
    secondary: {
      main: "#0b1b09",
    },
    error: {
      main: "#c34646",
    },
    background: {
      default: "#18091b",
    },
    text: {
      primary: "#fdfbfe",
    },
  },
  typography: {
    fontFamily: "Droid Sans, system-ui, Avenir, Helvetica, Arial, sans-serif",
  },
};

const harry: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#6e67ae",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#faf6f0",
      paper: "#313345",
    },
    text: {
      primary: "#c9bc75",
      secondary: "#000000",
      disabled: "#c9bc7561",
    },
  },
  typography: {
    fontFamily:
      "Bluu Next, Droid Sans, system-ui, Avenir, Helvetica, Arial, sans-serif",
    h1: {
      fontFamily: "Harry Potter, sans-serif",
    },
  },
};

export const themes: Record<string, ThemeOptions> = {
  cars,
  movies,
  sneakers,
  harry,
};
