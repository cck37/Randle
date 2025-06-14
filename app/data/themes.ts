import { falloutBoySongs } from "@/prisma/data/falloutBoySongs";
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
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23c9bc7566'><path d='M10.67 21c-.35 0-.62-.31-.57-.66L11 14H7.5c-.88 0-.33-.75-.31-.78 1.26-2.23 3.15-5.53 5.65-9.93.1-.18.3-.29.5-.29.35 0 .62.31.57.66l-.9 6.34h3.51c.4 0 .62.19.4.66-3.29 5.74-5.2 9.09-5.75 10.05-.1.18-.29.29-.5.29'/></svg>")`,
          backgroundRepeat: "repeat",
          backgroundSize: "5%",
        },
      },
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
      main: "#ff0000",
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
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#da291c",
          backgroundImage:
            "linear-gradient(to right top, #ffcc00, #ffaa00, #ff8500, #ff5900, #ff0000);",
        },
      },
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

export const streetsOfSquan: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#1A2E5D",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#4D4D4D",
      contrastText: "#FFFFFF",
    },
    success: {
      main: "#4CAF50",
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#D32F2F",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#F3F4F6",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1A2E5D",
      secondary: "#4D4D4D",
    },
  },
  typography: {
    fontFamily:
      "Times New Roman, system-ui, Avenir, Helvetica, Arial, sans-serif",
    h1: {
      color: "#1A2E5D",
    },
    h6: {
      color: "#4D4D4D",
    },
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: "#1A2E5D",
          color: "#FFFFFF",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#1A2E5D",
            },
            "&:hover fieldset": {
              borderColor: "#1A2E5D",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#4D4D4D",
            },
          },
        },
      },
    },
  },
};

export const greenday: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#D32F2F",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#D32F2F",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#1C1C1C",
      paper: "#000000",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#63ba50",
    },
    warning: {
      main: "#FFA500",
    },
    error: {
      main: "#D32F2F",
    },
    success: {
      main: "#0B6623",
    },
  },
  typography: {
    fontFamily: "Roboto, system-ui, Avenir, Helvetica, Arial, sans-serif",
    h1: {
      color: "#FFFFFF",
      fontFamily: "Green Day, 'Courier New', monospace",
    },
    body1: {
      color: "#FFFFFF",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#0B6623",
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: "#076A2F",
          },
          fontWeight: "bold",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#333333",
          color: "#FFFFFF",
          border: "1px solid #D32F2F",
        },
      },
    },
  },
};

export const systemOfADown: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#8B0000",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#222222",
      contrastText: "#E0E0E0",
    },
    background: {
      default: "#1B1B1B",
      paper: "#000000",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B0B0B0",
    },
    warning: {
      main: "#D35400",
    },
    error: {
      main: "#DC1414",
    },
    success: {
      main: "#0B6623",
    },
  },
  typography: {
    fontFamily: "Roboto, system-ui, Avenir, Helvetica, Arial, sans-serif",
    h1: {
      color: "#FFFFFF",
      fontFamily: "Hollywood, Impact, sans-serif",
    },
    h6: {
      color: "#8B0000",
    },
    body1: {
      color: "#FFFFFF",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#8B0000",
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: "#AA0000",
          },
          fontWeight: "bold",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#000000",
          color: "#FFFFFF",
          border: "1px solid #8B0000",
        },
      },
    },
  },
};

export const modernBaseball: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#7a96bf",
      contrastText: "#2E2E2E",
    },
    secondary: {
      main: "#7D5840",
      contrastText: "#F6EEDB",
    },
    background: {
      default: "#BEC9d5",
      paper: "#FDF5E6",
    },
    text: {
      primary: "#2E2E2E",
      secondary: "#2E2E2E",
    },
    warning: {
      main: "#D9A357",
    },
    error: {
      main: "#A45245",
    },
    success: {
      main: "#A3C299",
    },
  },
  typography: {
    fontFamily: "Georgia, serif",
    h1: {
      fontFamily: "Old Standard TT, Georgia, serif",
      color: "#2E2E2E",
    },
    h6: {
      color: "#7D5840",
    },
  },
};

export const falloutBoy: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#9D1B1B",
      contrastText: "#FFD700",
    },
    secondary: {
      main: "#FFD700",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#2C2C2C",
      paper: "#3E3E3E",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#FFD700",
    },
    warning: {
      main: "#CF4900",
    },
    error: {
      main: "#7F1D1D",
    },
    success: {
      main: "#556B2F",
    },
  },
  typography: {
    fontFamily: "Helvetica Neue, Roboto, sans-serif",
    h1: {
      fontFamily: "Helvetica Neue, Roboto, sans-serif",
      color: "#FFD700",
      fontWeight: "bold",
      textTransform: "uppercase",
    },
    h6: {
      fontFamily: "Oswald, Roboto, sans-serif",
      color: "#D32F2F",
    },
  },
};

export const animalCrossing: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#3CBEA2",
      contrastText: "#000000",
    },
    secondary: {
      main: "#C48D3F",
      contrastText: "#000000",
    },
    background: {
      default: "#F9FAFB",
      paper: "#BD9155",
    },
    text: {
      primary: "#000000",
      secondary: "#4A90A4",
    },
    warning: {
      main: "#FFA500",
    },
    error: {
      main: "#D32F2F",
    },
    success: {
      main: "#9dffb0",
    },
  },
  typography: {
    fontFamily: "Qlarendon, Comic Sans MS, sans-serif",
    h1: {
      fontFamily: "Qlarendon Bold, Comic Sans MS, sans-serif",
      color: "#4A90A4",
    },
    h6: {
      color: "#C48D3F",
      fontWeight: "bold",
    },
    body1: {
      fontWeight: "bold",
    },
  },
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          backgroundColor: "#F9FAFB",
        },
      },
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
  streetsOfSquan,
  greenday,
  systemOfADown,
  modernBaseball,
  falloutBoy,
  animalCrossing,
};
