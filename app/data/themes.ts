import { Box, ThemeOptions } from "@mui/material";

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
      color: "#FF5722",
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
    mode: "dark",
    primary: {
      main: "#6e67ae",
    },
    secondary: {
      main: "#c9bc75",
      contrastText: "#faf6f0",
    },
    background: {
      default: "#313345",
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
      main: "#6CC314",
      contrastText: "#FFF",
    },
    secondary: {
      main: "#6CC314",
      contrastText: "#FFF",
    },
    background: {
      default: "#FF6700",
      paper: "#363636",
    },
    text: {
      primary: "#FFF",
      secondary: "#FF6700",
      disabled: "#666666",
    },
  },
  typography: {
    fontFamily:
      "Roboto, Droid Sans, system-ui, Avenir, Helvetica, Arial, sans-serif",
    h1: {
      fontFamily: "Sponge Bob, Bangers, sans-serif",
      color: "#6CC314",
    },
    h5: {
      color: "#6CC314",
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
    fontFamily:
      "Nunito, Droid Sans, system-ui, Avenir, Helvetica, Arial, sans-serif",
    h1: {
      fontFamily:
        "Disney, Droid Sans, system-ui, Avenir, Helvetica, Arial, sans-serif",
      color: "#2196F3",
    },
  },
};

const fastFood: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#ffc107",
    },
    secondary: {
      main: "#fff",
    },
    background: {
      default: "#da291c",
      paper: "#fcf9f8",
    },
    text: {
      primary: "#000",
      secondary: "#da291c",
      disabled: "#CCCCCC",
    },
    success: {
      main: "#3da842",
    },
    error: {
      main: "#f71505",
    },
  },
  typography: {
    fontFamily: "Helvetica, Arial, sans-serif",
    h1: {
      color: "#fff",
      fontFamily: "Bebas Neue, Helvetica, Arial, sans-serif",
    },
  },
};

export const cereal: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#222",
    },
    secondary: {
      main: "#FF2400",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#ffe600",
      paper: "#f7f5f0",
    },
    text: {
      primary: "#222",
      secondary: "#FF2400",
      disabled: "#CCCCCC",
    },
  },
  typography: {
    fontFamily: "Lato, Helvetica, Arial, sans-serif",
    h1: {
      fontFamily: "Cheerio, Lato, Helvetica, Arial, sans-serif",
      color: "#222",
    },
    h6: {
      color: "#222",
    },
  },
};

export const modestMouse: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#EFCAC9",
      contrastText: "#222",
    },
    secondary: {
      main: "#222",
      contrastText: "#F8FDEB",
    },
    background: {
      default: "#9CB188",
      paper: "#F8FDEB",
    },
    text: {
      primary: "#222",
    },
    warning: {
      main: "#FEBC20",
    },
    error: {
      main: "#FF6F61",
    },
    success: {
      main: "#76C7A1",
    },
  },
  typography: {
    fontFamily: "Roboto, system-ui, Avenir, Helvetica, Arial, sans-serif",
    h1: {
      color: "#F8FDEB",
    },
    h6: {
      color: "#F8FDEB",
    },
  },
};

export const themes: Record<string, ThemeOptions> = {
  movies,
  harry,
  animatedTv,
  animatedDisneyMovies,
  fastFood,
  cereal,
  modestMouse,
};
