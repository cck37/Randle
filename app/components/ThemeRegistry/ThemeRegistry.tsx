//github.com/mui/material-ui/blob/master/examples/material-ui-nextjs-ts/src/components/ThemeRegistry/ThemeRegistry.tsx
"use client";
import * as React from "react";
import { Theme } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import NextAppDirEmotionCacheProvider from "./EmotionCache";
import theme from "./theme";

export default function ThemeRegistry({
  themeOptions = theme,
  children,
}: {
  themeOptions?: Theme;
  children: React.ReactNode;
}) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
      <ThemeProvider theme={themeOptions}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
