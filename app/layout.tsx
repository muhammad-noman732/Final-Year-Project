import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fee Management System",
  description: "University Registration & Fee Management System",
};

import { StoreProvider } from "@/store/provider";
import "@/bones/registry";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-50`}>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
