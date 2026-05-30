import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/CustomCursor";
import { SmoothScroll } from "@/components/SmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CACOYANNIS LIMITED | Premium Web Design Studio",
  description:
    "CACOYANNIS LIMITED is a premium web design studio crafting bespoke digital experiences with meticulous attention to detail and refined aesthetics.",
  openGraph: {
    title: "CACOYANNIS LIMITED | Premium Web Design Studio",
    description:
      "Crafting bespoke digital experiences with meticulous attention to detail and refined aesthetics.",
    type: "website",
    locale: "en_GB",
    siteName: "CACOYANNIS LIMITED",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <CustomCursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
