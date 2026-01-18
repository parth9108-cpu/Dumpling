import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import AmbientNightAudio from "@/components/AmbientNightAudio";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Midnight Letters",
  description: "Every night at 12, a letter from my heart finds you."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen text-white antialiased">
        {children}
        <AmbientNightAudio />
      </body>
    </html>
  );
}
