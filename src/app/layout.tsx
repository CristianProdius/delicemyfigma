import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

import NavigationHeader from "@/components/header";
import Footer from "@/components/footer";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { getStrapiMetadata } from "@/lib/strapi-server";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Generate metadata from Strapi
export async function generateMetadata(): Promise<Metadata> {
  // Get the default locale metadata from Strapi
  const metadata = await getStrapiMetadata('ru');
  return metadata;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased bg-gradient-to-br from-[#FFF9F5] via-white to-[#F8F5F0] min-h-screen`}
      >
        <LanguageProvider>
          <NavigationHeader />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}