import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { BackgroundCanvas } from "../(discovery)/discovery/components/BackgroundCanvas";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cosalove",
  description: "High-integrity alignment platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
          {children}
      </body>
    </html>
  );
}