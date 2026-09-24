import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"], weight: "500", variable: "--font-dm-sans" });

export const metadata: Metadata = {
  title: "yolobun studios",
  description: "yolobun studios: creative, community, music, idek, vibes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased ${dmSans.variable}`}>{children}</body>
    </html>
  );
}
