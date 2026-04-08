import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import StoreProvider from "@/src/lib/StoreProvider";

import "./globals.css";
import Navbar from "@/src/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-Learning",
  description: "An App to consume the knowledge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <StoreProvider>
        <Navbar />
        {children}
        </StoreProvider>
      </body>
    </html>
  );
}
