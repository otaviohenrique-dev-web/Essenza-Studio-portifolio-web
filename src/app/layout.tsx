import type { Metadata, Viewport } from "next";
import { Josefin_Sans, Poiret_One } from "next/font/google"; 
import "./globals.css";
import React from "react"; 

// --- Configuração das Fontes ---
const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-josefin",
  display: "swap",
});

const poiret = Poiret_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-poiret",
  display: "swap",
});

// --- 1. Configuração de Viewport ---
export const viewport: Viewport = {
  themeColor: "#4A2C21",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, 
};

// --- 2. Metadados Globais (SEO) ---
export const metadata: Metadata = {
  // Substitua pela URL final se necessário
  metadataBase: new URL('https://essenza-studio-portifolio-web.vercel.app'), 
  
  title: {
    default: "Essenza Studio | Arquitetura & Interiores",
    template: "%s | Essenza Studio" 
  },
  description: "Transforme espaços em experiências. Projetos de arquitetura de alto padrão e consultorias de interiores com identidade única.",
  
  // --- CRÉDITOS E AUTORIA ---
  authors: [{ name: "Otávio Henrique", url: "https://www.linkedin.com/in/otaviohenrique-dev/" }],
  creator: "Otávio Henrique",
  
  // --- OPEN GRAPH (WhatsApp, LinkedIn, Facebook) ---
  openGraph: {
    title: "Essenza Studio | Arquitetura & Interiores",
    description: "Confira nosso portfólio de obras e consultorias exclusivas.",
    url: "https://essenza-studio-portifolio-web.vercel.app",
    siteName: "Essenza Studio",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og-image.png", // <--- Corrigido para .png
        width: 1200,
        height: 630,
        alt: "Essenza Studio - Projetos Exclusivos",
      },
    ],
  },
  
  // --- TWITTER CARD (X) ---
  twitter: {
    card: "summary_large_image",
    title: "Essenza Studio",
    description: "Arquitetura Sensorial & Interiores.",
    images: ["/og-image.png"], // <--- Corrigido para .png
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body
        className={`${josefin.variable} ${poiret.variable} antialiased bg-essenza-soft text-essenza-coffee`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}