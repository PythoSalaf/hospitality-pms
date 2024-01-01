import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lendsqr",
  description: "This is a financial management app",
};
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const avenirNext = localFont({
  src: "./AvenirNextFont.ttf",
  display: "swap",
  variable: "--font-avenir",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${avenirNext.variable} ${inter.className}`}>
        <div className="font-avenir">{children}</div>
      </body>
    </html>
  );
}
