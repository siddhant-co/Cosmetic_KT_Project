// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono, Josefin_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ServersideComponent/Navbar/NavbarComponent"; // Correct import path for Navbar
import ReduxProviderWrapper from "@/store/providers/ReduxProviderWrapper"; // Correct import path for ReduxProviderWrapper
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cosmectics",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${josefinSans.variable} antialiased`}
      >
        <ReduxProviderWrapper>
          <Toaster position="top-right" />
          {/* CRITICAL CHANGE: Navbar and children (main content) are now wrapped by LoggedInCartProvider */}
          {/* This ensures that NavbarIconsWrapper and CartPage have access to the LoggedInCartContext */}
          <Navbar />
          <main className="pt-0">{children}</main>
        </ReduxProviderWrapper>
      </body>
    </html>
  );
}
