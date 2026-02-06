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
  metadataBase: new URL('https://essenza-studio-portifolio-web.vercel.app'), 
  
  title: {
    default: "Essenza Studio | Arquitetura & Interiores",
    template: "%s | Essenza Studio" 
  },
  // Descrição Global (Google) - Mais completa
  description: "Descubra a arquitetura sensorial do Essenza Studio. Projetos de alto padrão e consultorias de interiores que unem minimalismo, materiais naturais e identidade única para transformar sua forma de viver.",
  
  authors: [{ name: "Otávio Henrique", url: "https://www.linkedin.com/in/otaviohenrique-dev/" }],
  creator: "Otávio Henrique",
  
  openGraph: {
    title: "Essenza Studio | Arquitetura & Interiores",
    // Descrição do Card (WhatsApp/LinkedIn) - Expandida para >100 caracteres
    description: "Especialistas em arquitetura sensorial e design de interiores. Conheça nosso portfólio de projetos que equilibram estética minimalista, conforto e materiais naturais. Solicite sua proposta.",
    url: "https://essenza-studio-portifolio-web.vercel.app",
    siteName: "Essenza Studio",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Essenza Studio - Projetos Exclusivos",
      },
    ],
  },
  
  twitter: {
    card: "summary_large_image",
    title: "Essenza Studio",
    description: "Arquitetura Sensorial & Interiores. Projetos que unem minimalismo e identidade.",
    images: ["/og-image.png"],
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