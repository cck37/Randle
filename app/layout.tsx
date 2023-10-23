import type { Metadata } from "next";
import "./globals.css";

// All fonts get added here...
import "@fontsource/bebas-neue";

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
      <body>{children}</body>
    </html>
  );
}
