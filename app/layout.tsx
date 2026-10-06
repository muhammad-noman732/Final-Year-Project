import type { Metadata } from "next";
import { DM_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from 'next/script'

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
  metadataBase: new URL("https://uni-sync.tech"),
  title: {
    default: "UniSync - University Fee Management System | GCUF",
    template: "%s | UniSync - University Fee Management System",
  },
  description: "UniSync is the official intelligent university fee management and student registration platform for GC University Faisalabad (GCUF). Features real-time challan verification, online payments, role-based dashboards, and automated reconciliation.",
  keywords: [
    "UniSync",
    "GCUF",
    "GCUF Fee Management",
    "University Fee Management System",
    "Student Fee Portal",
    "Online Fee Payment",
    "GC University Faisalabad",
    "Challan Verification",
    "Higher Education ERP",
    "Fee Challan System",
    "Student Registration Portal",
  ],
  authors: [{ name: "UniSync GCUF Team" }],
  creator: "UniSync",
  publisher: "GC University Faisalabad",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/logo.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://uni-sync.tech",
    title: "UniSync - University Fee Management System | GCUF",
    description: "Intelligent University Registration & Fee Management System for GC University Faisalabad. Streamline fee collection, track payments, and verify challans in real time.",
    siteName: "UniSync",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "UniSync Education Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UniSync - University Fee Management System | GCUF",
    description: "Intelligent University Registration & Fee Management System for GC University Faisalabad.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
          <Script src="https://scripts.simpleanalyticscdn.com/latest.js"  />
        <StoreProvider>
          <ThemeApplier />
          {children}
          <Toaster position="top-right" richColors closeButton />
        </StoreProvider>
      </body>
    </html>
  );
}



