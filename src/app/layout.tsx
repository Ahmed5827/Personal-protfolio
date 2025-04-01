import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ahmed Chebbi - Portfolio",
  icons: {
    icon: "/icons8-coding-96.ico",
    shortcut: "/icons8-coding-96.ico",
    apple: "/icons8-coding-96.ico",
  },
  description: "Ahmed Chebbi's Personal Portfolio",
  keywords: [
    "Ahmed Chebbi",
    "Portfolio",
    "Web Developer",
    "Software Engineer",
    "Ahmed Chebbi Portfolio",
  ],
  authors: [
    {
      name: "Ahmed Chebbi"},
  ],
  creator: "Ahmed Chebbi",
  publisher: "Ahmed Chebbi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        
        <Navbar />
        <main className=" min-h-screen">{children}</main>
        
      </body>
    </html>
  );
}
