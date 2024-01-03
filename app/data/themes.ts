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
    }
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
            fontFamily: "Bebas Neue",
        },
        h2: {
            fontFamily: "Bebas Neue",
        },
        h3: {
            fontFamily: "Bebas Neue",
        },
        h4: {
            fontFamily: "Bebas Neue",
        },
        h5: {
            fontFamily: "Bebas Neue",
        },
    }
}

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
}

export const themes: Record<string, ThemeOptions> = { cars, movies, sneakers }