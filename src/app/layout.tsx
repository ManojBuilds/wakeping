import ConvexClientProvider from "@/components/ConvexClientProvider";
import { NoiseEffect } from "@/components/effects/noise-effect";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WakePing",
  description: "Keep your services alive",
  icons: {
    icon: "/convex.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-zinc-900 selection:text-white`}
      >
        <ClerkProvider dynamic>
          <ConvexClientProvider>
            <NoiseEffect />
            {children}
          </ConvexClientProvider>
          <Toaster position="top-right" richColors theme="light" />
        </ClerkProvider>
      </body>
    </html>
  );
}
