"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ConsultancyMoodboardProps {
  images: string[];
}

export function ConsultancyMoodboard({ images }: ConsultancyMoodboardProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Bloqueio de scroll e atalhos de teclado
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setSelectedIndex(null);
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "ArrowLeft") prevImage();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "auto";
      };
    }
  }, [selectedIndex]);

  const nextImage = () => {
    setSelectedIndex((prev) => 
      prev === null ? null : (prev + 1) % images.length
    );
  };

  const prevImage = () => {
    setSelectedIndex((prev) => 
      prev === null ? null : (prev - 1 + images.length) % images.length
    );
  };

  if (!images || images.length === 0) return null;

  return (
    <section className="w-full bg-white py-24 border-t border-essenza-coffee/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Cabeçalho do Moodboard */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <h2 className="text-6xl md:text-8xl font-josefin text-essenza-coffee/10 font-bold uppercase select-none leading-none">
            Mood<br/>Board
          </h2>
          <div className="md:text-right max-w-md">
            <span className="text-xs font-bold text-essenza-clay uppercase tracking-[0.3em] block mb-2">
              Atmosfera Visual
            </span>
            <p className="font-poiret text-xl text-essenza-coffee">
              Texturas, formas e sentimentos que compõem a alma do projeto.
            </p>
          </div>
        </div>

        {/* Grid Interativo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {images.map((img, idx) => (
            <div 
              key={idx} 
              onClick={() => setSelectedIndex(idx)}
              className={`relative w-full overflow-hidden rounded-sm bg-essenza-soft group cursor-zoom-in ${
                // Mantém o destaque da primeira imagem (Grid Irregular)
                idx === 0 ? "aspect-square sm:col-span-2 sm:row-span-2" : "aspect-3/4"
              }`}
            >
              <Image
                src={img}
                alt={`Inspiração Moodboard ${idx + 1}`}
                fill
                className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                sizes={idx === 0 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                quality={90}
              />
              
              {/* Overlay de Hover */}
              <div className="absolute inset-0 bg-essenza-coffee/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Ícone de Zoom */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 bg-white/20 backdrop-blur-md p-2 rounded-full">
                <span className="text-white text-xs">🔍</span>
              </div>
            </div>
          ))}
        </div>

        {/* --- LIGHTBOX (MODAL FULLSCREEN) --- */}
        {selectedIndex !== null && (
          <div className="fixed inset-0 z-200 bg-essenza-coffee/95 backdrop-blur-xl flex items-center justify-center animate-fadeIn">
            
            {/* Fechar */}
            <button 
              onClick={() => setSelectedIndex(null)}
              className="absolute top-6 right-6 z-50 text-white/50 hover:text-white transition-colors p-4"
            >
              <span className="text-4xl font-poiret">✕</span>
            </button>

            {/* Imagem Fullscreen */}
            <div className="relative w-full h-full max-w-7xl max-h-[85vh] mx-6 md:mx-12">
              <Image
                src={images[selectedIndex]}
                alt="Fullscreen Moodboard"
                fill
                className="object-contain"
                quality={100}
                priority
              />
            </div>

            {/* Navegação */}
            <button 
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 md:left-8 text-white/30 hover:text-white transition-colors p-4"
            >
              <span className="text-4xl md:text-6xl font-poiret">←</span>
            </button>
            
            <button 
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 md:right-8 text-white/30 hover:text-white transition-colors p-4"
            >
              <span className="text-4xl md:text-6xl font-poiret">→</span>
            </button>

            {/* Contador */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 text-xs font-bold uppercase tracking-[0.3em]">
              {selectedIndex + 1} / {images.length}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}