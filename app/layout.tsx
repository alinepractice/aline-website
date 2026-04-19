import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import ScrollArc from "./ScrollArc";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["200", "300", "400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aline Practice",
  description:
    "Flexibility, Independence, Bravery, Safe Choices — a values-based, relational framework designed to support connection, communication, and growth.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={sourceSans.className}>
        <ScrollArc />
        {children}
      </body>
    </html>
  );
}
