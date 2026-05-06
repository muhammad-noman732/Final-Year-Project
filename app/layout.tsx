import type { Metadata } from "next";
import { DM_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://uni-ync.vercel.app"),
  title: {
    default: "UniSync | GCUF Fee Management",
    template: "%s | UniSync",
  },
  description: "Next-generation University Registration & Fee Management System for GCUF. Streamlined, secure, and intelligent academic administration.",
  keywords: ["GCUF", "University Management", "Fee Management", "Student Portal", "UniSync"],
  authors: [{ name: "UniSync Team" }],
  creator: "UniSync",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://uni-ync.vercel.app",
    title: "UniSync | GCUF Fee Management",
    description: "Intelligent University Registration & Fee Management System",
    siteName: "UniSync",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 1200,
        alt: "UniSync Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UniSync | GCUF Fee Management",
    description: "Intelligent University Registration & Fee Management System",
    images: ["/logo.png"],
  },
};

import { StoreProvider } from "@/store/provider";
import { ThemeApplier } from "@/components/layout/ThemeApplier";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${geistMono.variable} font-sans antialiased bg-background min-h-[100dvh] text-foreground`}>
        <StoreProvider>
          <ThemeApplier />
          {children}
          <Toaster position="top-right" richColors closeButton />
        </StoreProvider>
      </body>
    </html>
  );
}
