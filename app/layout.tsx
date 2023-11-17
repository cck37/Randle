import { useContext } from "react";
import type { Metadata } from "next";
import "./globals.css";

// All fonts get added here...
import "@fontsource/bebas-neue";
import ThemeRegistry from "./components/ThemeRegistry/ThemeRegistry";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { NavButton } from "./components/NavButton";

import NavMenu from "./components/NavMenu";
import Logo from "./components/Logo";

const LINKS = [
  { text: "Standard", href: "/" },
  { text: "What is this?", href: "/about" },
  { text: "???", href: "/about" },
];

export const metadata: Metadata = {
  title: "Randle",
  description: "Yea... I guess",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <AppBar position="fixed" sx={{ zIndex: 2 }}>
            <Toolbar sx={{ backgroundColor: "background.paper" }}>
              {/* Med sized layout */}
              <Box sx={{ mr: 1, display: { xs: "none", md: "flex" } }}>
                <Logo />
              </Box>
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
                // placeholder styling while i figure what font to use
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Randle
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {LINKS.map(({ text, href }) => (
                  <NavButton key={text + "-" + href} text={text} href={href} />
                ))}
              </Box>

              {/* Xs sized layout */}
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <NavMenu items={LINKS} />
              </Box>
              <Box sx={{ mr: 1, display: { xs: "flex", md: "none" } }}>
                <Logo />
              </Box>
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
                // placeholder styling while i figure what font to use
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Randle
              </Typography>
            </Toolbar>
          </AppBar>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
            }}
          >
            <Toolbar />
            {children}
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
