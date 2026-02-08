"use client"; // Necessário para usar useState e interatividade

import { useState, useEffect } from "react";
import Image from "next/image";

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Bloqueia o scroll da página quando o modal está aberto
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
      
      // Adiciona suporte a teclado (ESC e Setas)
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
    <section className="w-full bg-white py-32 border-t border-essenza-coffee/5 mt-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Cabeçalho da Galeria */}
        <div className="flex flex-col items-center mb-24 text-center">
          <span className="text-essenza-clay text-xs font-bold uppercase tracking-[0.4em] mb-4">
            Imersão Visual
          </span>
          <h2 className="font-poiret text-5xl md:text-6xl text-essenza-coffee mb-6">
            Detalhes & Atmosfera
          </h2>
          <div className="w-12 h-px bg-essenza-coffee/20" />
        </div>

        {/* Grid Editorial */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 auto-rows-fr">
          {images.map((imgUrl, index) => {
            const isCinematic = index % 3 === 0;

            return (
              <div 
                key={index} 
                onClick={() => setSelectedIndex(index)}
                className={`relative overflow-hidden group cursor-zoom-in rounded-sm bg-gray-100 ${
                  isCinematic 
                    ? "col-span-1 md:col-span-2 aspect-video md:aspect-21/9" 
                    : "aspect-4/5"
                }`}
              >
                <Image
                 src={imgUrl}
                  alt={`Detalhe ${title} - ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                  quality={90}
                  sizes={isCinematic ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
                />
                
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700" />
                
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  <span className="text-white text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-md bg-white/10 px-3 py-1 border border-white/20">
                    Ampliar +
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- LIGHTBOX (MODAL FULLSCREEN) --- */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-200 bg-essenza-coffee/95 backdrop-blur-xl flex items-center justify-center animate-fadeIn">
          
          {/* Botão Fechar */}
          <button 
            onClick={() => setSelectedIndex(null)}
            className="absolute top-6 right-6 z-50 text-white/50 hover:text-white transition-colors p-4"
          >
            <span className="text-4xl font-poiret">✕</span>
          </button>

          {/* Área da Imagem */}
          <div className="relative w-full h-full max-w-7xl max-h-[85vh] mx-6 md:mx-12">
            <Image
              src={images[selectedIndex]}
              alt={`Fullscreen ${title}`}
              fill
              className="object-contain"
              quality={100}
              priority
            />
          </div>

          {/* Navegação (Setas) */}
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
    </section>
  );
}