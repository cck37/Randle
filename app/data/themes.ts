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

const animatedTv: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#FF6700",
    },
    secondary: {
      main: "#6CC314",
    },
    background: {
      default: "#FFFFFF",
      paper: "#E6E6E6",
    },
    text: {
      primary: "#000000",
      secondary: "#333333",
      disabled: "#666666",
    },
  },
  typography: {
    fontFamily: "Roboto",
    h1: {
      fontFamily: "Sponge Bob, Bangers, sans-serif",
    },
  },
};

const animatedDisneyMovies: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#2196F3",
    },
    secondary: {
      main: "#efbeb7",
    },
    background: {
      default: "#121212",
      paper: "#1E1E1E",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#CCCCCC",
      disabled: "#999999",
    },
  },
  typography: {
    fontFamily: "Nunito",
    h1: {
      fontFamily: "Disney, sans-serif",
    },
  },
};

export const themes: Record<string, ThemeOptions> = {
  movies,
  harry,
  animatedTv,
  animatedDisneyMovies,
};
