import type { Metadata } from "next";
import { Inter, Playfair_Display, Cormorant_Garamond, Manrope, Geist } from "next/font/google";
import "./globals.css";
import { BackgroundLayer } from "@/components/global/BackgroundLayer";
import { CustomCursor } from "@/components/global/CustomCursor";
import { Navigation } from "@/components/global/Navigation";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const cormorant = Cormorant_Garamond({
  weight: ["300", "400"],
  subsets: ["latin"],
  variable: "--font-cormorant",
});

const manrope = Manrope({
  weight: ["200", "300", "400"],
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Our Little Universe",
  description: "Two people. One little universe.",
};

import { AuthProvider } from "@/components/global/AuthProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", inter.variable, playfair.variable, cormorant.variable, manrope.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <BackgroundLayer />
          <CustomCursor />
          <Navigation />
          <main className="flex-1 relative z-10 flex flex-col">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
