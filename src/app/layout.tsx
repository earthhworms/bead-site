import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "Bunny on a Bender | Handmade & Upcycled Rave Gear",
  description: "null",
};

const openSans = localFont({
  src: "../app/fonts/OpenSans.ttf",
  variable: "--open-sans",
  style: "normal",
  display: "swap",
});

const specialGothic = localFont({
  src: "../app/fonts/SpecialGothic.ttf",
  variable: "--special-gothic",
  style: "normal",
  display: "swap",
});

const bungee = localFont({
  src: "../app/fonts/Bungee.ttf",
  variable: "--bungee",
  style: "normal",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${openSans.variable} ${specialGothic.variable} ${bungee.variable}`}
      >
        <CartProvider>
          <Header />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}