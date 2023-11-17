//github.com/mui/material-ui/blob/master/examples/material-ui-nextjs-ts/src/components/ThemeRegistry/ThemeRegistry.tsx
"use client";
import * as React from "react";
import { Theme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import NextAppDirEmotionCacheProvider from "./EmotionCache";
import defaultTheme from "./theme";

export default function ThemeRegistry({
  children,
  theme = defaultTheme,
}: {
  children: React.ReactNode;
  theme?: Theme;
}) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
