import type { Metadata } from "next";
import "./globals.css";

// NOT all fonts get added here...
import "@fontsource/bebas-neue";
import "@fontsource/bluu-next";
import ThemeRegistry from "./components/ThemeRegistry/ThemeRegistry";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { NavButton } from "./components/NavButton";

import NavMenu from "./components/NavMenu";
import Logo from "./components/Logo";
import GitHubIcon from "@mui/icons-material/GitHub";
import X from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

const headerLinks = [
  { text: "Home", href: "/" },
  { text: "What is this?", href: "/about" },
  { text: "Choose Category", href: "/choose" },
];
const footerLinks = [
  {
    text: "Github",
    href: "https://github.com/cck37/Randle",
    icon: <GitHubIcon />,
  },
  { text: "X", href: "https://twitter.com/elonmusk", icon: <X /> },
  {
    text: "LinkedIn",
    href: "https://www.linkedin.com/in/chris-kennedy-00879182/",
    icon: <LinkedInIcon />,
  },
];

export const metadata: Metadata = {
  title: "Randle",
  description: "Wordle but new category each day",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <ThemeRegistry>
          <AppBar position="fixed" sx={{ zIndex: 2 }}>
            <Toolbar sx={{ backgroundColor: "background.paper" }}>
              {/* Med sized layout */}
              <Box sx={{ mr: 1, display: { xs: "none", md: "flex" } }}>
                <Logo width={30} />
              </Box>
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Randle
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {headerLinks.map(({ text, href }) => (
                  <NavButton key={text + "-" + href} text={text} href={href} />
                ))}
              </Box>

              {/* Xs sized layout */}
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <NavMenu items={headerLinks} />
              </Box>
              <Box sx={{ mr: 1, display: { xs: "flex", md: "none" } }}>
                <Logo width={30} />
              </Box>
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
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
          <Box component="main" sx={{ p: 3 }}>
            <Toolbar />
            {children}
          </Box>
          <Box
            component="footer"
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              backgroundColor: "background.paper",
              flex: "0 0 50px",
              marginTop: "auto",
            }}
          >
            <ButtonGroup variant="text" color="primary">
              {footerLinks.map(({ text, href, icon }) => (
                <Button
                  key={text + href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={text}
                >
                  {icon}
                </Button>
              ))}
            </ButtonGroup>
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
