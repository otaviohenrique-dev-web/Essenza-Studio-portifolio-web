"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Consultancy {
  title: string;
  slug: string;
  mainImage: string;
  colorPalette: { hex: string }[];
}

export function ConsultancySection({ consultancies }: { consultancies: Consultancy[] }) {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <section id="consultoria" className="bg-white py-32 border-t border-essenza-coffee/5">
      <div className="px-6 md:px-12 max-w-7xl mx-auto">
         
         {/* HEADER */}
         <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-6">
            <div className="text-center md:text-left mx-auto md:mx-0 max-w-3xl">
               <span className="text-essenza-clay text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
                  Interiores & Styling
               </span>
               <h2 className="text-4xl md:text-7xl font-poiret text-essenza-coffee mb-6">
                 Consultorias
               </h2>
            </div>

            {/* TOGGLE */}
            <div className="flex items-center gap-2 bg-essenza-coffee/5 p-1 rounded-full mx-auto md:mx-0">
              <button
                onClick={() => setView("grid")}
                className={`p-2 rounded-full transition-all duration-300 ${
                  view === "grid" ? "bg-white shadow-md text-essenza-clay" : "text-essenza-coffee/40 hover:text-essenza-coffee"
                }`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 10v-4h-4v4h4zm6 0v-4h-4v4h4zm-6 6v-4h-4v4h4zm6 0v-4h-4v4h4z" />
                  <path d="M4 4h16v16h-16z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                </svg>
              </button>
              <button
                onClick={() => setView("list")}
                className={`p-2 rounded-full transition-all duration-300 ${
                  view === "list" ? "bg-white shadow-md text-essenza-clay" : "text-essenza-coffee/40 hover:text-essenza-coffee"
                }`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 6h10v2h-10zM8 11h10v2h-10zM8 16h10v2h-10z" />
                  <path d="M4 6h2v2h-2zM4 11h2v2h-2zM4 16h2v2h-2z" />
                </svg>
              </button>
            </div>
         </div>

         {/* LISTA DE CONSULTORIAS */}
         <div className={view === "grid" 
           ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12"
           : "flex flex-col gap-6"
         }>
            {consultancies.map((consultancy) => (
              <Link 
                href={`/consultoria/${consultancy.slug}`} 
                key={consultancy.slug} 
                className={`group relative transition-all duration-500 ${
                  view === "grid" ? "flex flex-col" : "flex flex-row items-center gap-6 bg-essenza-soft/30 p-4 rounded-lg hover:bg-essenza-soft"
                }`}
              >
                <div className={`relative overflow-hidden transition-all duration-700 ${
                  view === "grid" 
                    ? "w-full aspect-2/3 rounded-t-full bg-essenza-soft"
                    : "w-20 h-20 md:w-32 md:h-32 rounded-full shrink-0" 
                }`}>
                  {consultancy.mainImage && (
                    <Image
                      src={consultancy.mainImage}
                      alt={consultancy.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      // --- QUALIDADE PREMIUM ---
                      quality={90}
                      // Sizes ajustado dinamicamente para Grid (25vw) ou Lista (10vw)
                      sizes={
                        view === "grid" 
                          ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          : "(max-width: 768px) 20vw, 10vw"
                      }
                    />
                  )}
                  {view === "grid" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-essenza-coffee/0 group-hover:bg-essenza-coffee/20 transition-all duration-500">
                      <span className="px-5 py-3 bg-white/95 backdrop-blur-md text-[9px] uppercase font-bold tracking-[0.2em] opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 text-essenza-coffee shadow-lg">
                        Ver Detalhes
                      </span>
                    </div>
                  )}
                </div>

                <div className={view === "grid" ? "mt-8 text-center" : "text-left flex-1"}>
                  <h3 className={`font-josefin uppercase tracking-wider group-hover:text-essenza-clay transition-colors ${
                     view === "grid" ? "text-lg" : "text-lg md:text-2xl"
                  }`}>
                    {consultancy.title}
                  </h3>
                  <div className={`flex gap-1.5 mt-4 ${view === "grid" ? "justify-center" : "justify-start"}`}>
                     {consultancy.colorPalette?.slice(0, 5).map((color, i) => (
                       <div key={i} className="w-2 h-2 rounded-full ring-1 ring-essenza-coffee/10" style={{ backgroundColor: color.hex }} />
                     ))}
                  </div>
                </div>
              </Link>
            ))}
         </div>
      </div>
    </section>
  );
}