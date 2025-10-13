import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RevealInit from "@/components/RevealInit";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "TravelPulsa - Your Travel & Pulsa Solution",
  description: "TravelPulsa adalah platform terdepan untuk kebutuhan perjalanan dan top-up pulsa dengan harga terbaik dan pelayanan terpercaya.",
  keywords: "travel, pulsa, booking, top-up, perjalanan, tiket, hotel",
  authors: [{ name: "TravelPulsa Team" }],
  openGraph: {
    title: "TravelPulsa - Your Travel & Pulsa Solution",
    description: "Platform terdepan untuk kebutuhan perjalanan dan top-up pulsa",
    type: "website",
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' }
    ],
    shortcut: '/favicon.png',
    apple: '/icons/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.variable} font-sans antialiased`}>
        <RevealInit />
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}