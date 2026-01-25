import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "Bunny on a Bender | Handmade & Upcycled Rave Gear",
  description: "null",
};

const openSans = localFont({
  src: "../app/fonts/OpenSans.ttf",
  variable: "--open-sans",
  style: "normal",
  weight: "600",
  display: "swap",
});

const specialGothic = localFont ({
  src: "../app/fonts/SpecialGothic.ttf",
  variable: "--special-gothic",
  style: "normal",
  display: "swap"
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} ${specialGothic.variable}`}>
        {children}
      </body>
    </html>
  );
}
