import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import ClientLayout from "@/components/layout/client-layout";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://delicemy.com"),
  title: {
    default: "DeliceMy - Artisan Chocolate Experiences by Alexa Dell",
    template: "%s | DeliceMy",
  },
  description:
    "Premium chocolate services in Chisinau, Moldova. Master chocolatier Olesea Kolomiets offers classes, events, custom designs, and unforgettable chocolate experiences.",
  keywords: [
    "chocolate",
    "chocolatier",
    "Chisinau",
    "Moldova",
    "chocolate classes",
    "chocolate events",
    "custom chocolate",
    "DeliceMy",
    "Alexa Dell",
    "Olesea Kolomiets",
  ],
  authors: [{ name: "Alexa Dell", url: "https://delicemy.com" }],
  creator: "DeliceMy",
  publisher: "DeliceMy",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    title: "DeliceMy - Artisan Chocolate Experiences",
    description:
      "Premium chocolate services in Chisinau. From classes to custom creations, experience the art of chocolate.",
    url: "https://delicemy.com",
    siteName: "DeliceMy",
    images: [
      {
        url: "https://delicemy.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DeliceMy - Artisan Chocolate",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "DeliceMy - Artisan Chocolate Experiences",
    description: "Premium chocolate services in Chisinau, Moldova",
    creator: "@delicemy",
    images: ["https://delicemy.com/twitter-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png" },
      { url: "/apple-icon-180x180.png", sizes: "180x180", type: "image/png" },
    ],
  },

  manifest: "/site.webmanifest",

  alternates: {
    canonical: "https://delicemy.com",
    languages: {
      "en-US": "https://delicemy.com",
      "ro-MD": "https://delicemy.com/ro",
      "ru-MD": "https://delicemy.com/ru",
    },
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
        className={`${playfair.variable} ${inter.variable} antialiased bg-gradient-to-br from-[#FFF9F5] via-white to-[#F8F5F0] min-h-screen`}
      >
        <ClientLayout>{children}</ClientLayout>
        <Footer />
      </body>
    </html>
  );
}
