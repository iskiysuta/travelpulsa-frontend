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
  title: "TravelPulsa - Mitra Usaha Digital Anda",
  description: "Jadikan bisnis Anda lebih modern. Bersama kami, Anda bisa menjadi pusat pembayaran digital di lingkungan Anda, memberikan kemudahan bagi pelanggan dan keuntungan bagi Anda.",
  keywords: "travel, pulsa, booking, top-up, perjalanan, tiket, hotel",
  authors: [{ name: "TravelPulsa Team" }],
  openGraph: {
    title: "TravelPulsa - Mitra Usaha Digital Anda",
    description: "Jadikan bisnis Anda lebih modern. Bersama kami, Anda bisa menjadi pusat pembayaran digital di lingkungan Anda, memberikan kemudahan bagi pelanggan dan keuntungan bagi Anda.",
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