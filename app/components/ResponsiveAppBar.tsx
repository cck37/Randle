import { useState, useCallback } from "react";

import Image from "next/image";
import { redirect } from "next/navigation";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

import logo from "../logo.svg";

const pages = [
  { label: "Standard", route: "/" },
  { label: "What is this?", route: "/about" },
  { label: "???", route: "/about" },
];

export function ResponsiveAppBar() {
  // TODO: Replace with actual pages
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = useCallback(() => {
    setAnchorElNav(null);
  }, []);

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
          <Image src={logo} width={30} height={30} alt="Randall" />
        </Box>
        <Typography
          variant="h6"
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

        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            {pages.map(({ label, route }) => (
              <MenuItem
                key={label + "-" + route}
                onClick={() => (window.location.href = route)}
              >
                <Typography textAlign="center">{label}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Box sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
          <Image src={logo} width={50} height={50} alt="Randall" />
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
            flexGrow: 1,
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
          {pages.map(({ label, route }) => (
            <Button
              key={label + "-" + route}
              onClick={() => (window.location.href = route)}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
