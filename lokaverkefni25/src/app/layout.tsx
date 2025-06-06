import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/header";
import { OrderProvider } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`flex flex-col ${geistSans.variable} ${geistMono.variable} antialiased mx-auto w-full h-full`}
      >
        <OrderProvider>
          <div className="w-full min-w-full">
            <Header />
          </div>
          <div className="w-full">{children}</div>
        </OrderProvider>
      </body>
    </html>
  );
}
