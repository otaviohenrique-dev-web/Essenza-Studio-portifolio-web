import type { Metadata } from "next";
// Importando as fontes do Google via Next.js
import { Josefin_Sans, Poiret_One } from "next/font/google"; 
import "./globals.css";
// Importação explícita do React para tipagem segura
import React from "react"; 

// Configurando Josefin Sans (Fonte Principal)
const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"], // Pesos variados para títulos e textos
  variable: "--font-josefin",
  display: "swap", // Melhor performance de carregamento
});

// Configurando Poiret One (Detalhes e Subtítulos)
const poiret = Poiret_One({
  subsets: ["latin"],
  weight: "400", // Poiret só tem peso 400
  variable: "--font-poiret",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Essenza Studio - Arquitetura & Interiores",
  description: "Portfólio de arquitetura residencial, comercial e consultorias.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${josefin.variable} ${poiret.variable} antialiased`}
        // suppressHydrationWarning aqui ignora erros causados por extensões (bis_skin_checked)
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}