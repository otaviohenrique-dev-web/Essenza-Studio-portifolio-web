import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        /* Esta linha abaixo impede que o erro de hidratação apareça no console */
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}