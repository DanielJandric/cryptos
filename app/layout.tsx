import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import BackToTop from "@/components/BackToTop";
import GuidedTour from "@/components/GuidedTour";
import LanguageInit from "@/components/LanguageInit";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bitcoin-cycles.local"),
  title: {
    default: "Cycles Bitcoin 1064/364 – Analyse et Projections",
    template: "%s | Cycles Bitcoin 1064/364",
  },
  description:
    "Application d'analyse des cycles Bitcoin selon le modèle 1064/364 jours. Graphiques, comparaisons, compte à rebours et insights.",
  keywords: [
    "Bitcoin",
    "Cycles",
    "1064",
    "364",
    "Crypto",
    "Analyse technique",
    "Modèle",
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Cycles Bitcoin",
  },
  openGraph: {
    title: "Cycles Bitcoin 1064/364 – Analyse et Projections",
    description:
      "Analyse visuelle des cycles historiques de Bitcoin et projection du cycle en cours selon le modèle 1064/364.",
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cycles Bitcoin 1064/364 – Analyse et Projections",
    description:
      "Graphiques interactifs et insights sur les cycles Bitcoin (1064/364).",
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0b1220",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-slate-300`}
      >
        <a id="top" />
        <LanguageInit />
        <Navbar />
        {children}
        <GuidedTour />
        <BackToTop />
      </body>
    </html>
  );
}
