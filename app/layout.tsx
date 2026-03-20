import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Blessing Bassey",
  description: "Blessing Bassey personal brand site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
