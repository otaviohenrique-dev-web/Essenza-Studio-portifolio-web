import type { Metadata, Viewport } from "next";
import { Josefin_Sans, Poiret_One } from "next/font/google"; 
import "./globals.css";
import React from "react"; 

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

// 1. Configuração de Viewport (Cor da barra do navegador no celular)
export const viewport: Viewport = {
  themeColor: "#4A2C21", // Cor 'Coffee' do tema
  width: "device-width",
  initialScale: 1,
};

// 2. Metadados Globais (O que aparece no Google/WhatsApp se não tiver nada específico)
export const metadata: Metadata = {
  metadataBase: new URL('https://essenza-studio.vercel.app'), // Trocaremos pela URL final depois
  title: {
    default: "Essenza Studio | Arquitetura Sensorial",
    template: "%s | Essenza Studio" // Ex: "Sala Boho | Essenza Studio"
  },
  description: "Portfólio de arquitetura e design de interiores focado em bem-estar, texturas naturais e identidade única.",
  openGraph: {
    title: "Essenza Studio",
    description: "Arquitetura Sensorial & Interiores.",
    url: "https://essenzastudio.com.br",
    siteName: "Essenza Studio",
    locale: "pt_BR",
    type: "website",
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