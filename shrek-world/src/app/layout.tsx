import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Chicle } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const chicle = Chicle({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-chicle",
});

export const metadata: Metadata = {
  title: "Shrek world",
  description: "Welcome to this beautiful app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="mx-auto">
      <body
        className={`flex flex-col justify-center ${geistSans.variable} ${geistMono.variable}  ${chicle.variable} antialiased `}
      >
        <Header/>
        {children}
      </body>
    </html>
  );
}
