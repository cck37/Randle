"use client";
import Button from "@mui/material/Button";

export function NavButton(props: { text: string; href: string }) {
  const { text, href } = props;
  return (
    <Button
      onClick={() => (window.location.href = href)}
      sx={{ my: 2, display: "block", color: "white" }}
    >
      {text}
    </Button>
  );
}
