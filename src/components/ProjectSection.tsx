"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Project {
  title: string;
  slug: string;
  category: string;
  mainImage: string;
}

export function ProjectSection({ projects }: { projects: Project[] }) {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <section id="projetos" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      
      {/* HEADER DA SEÇÃO */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-essenza-coffee/10 pb-6 gap-6">
        <div>
          <span className="text-essenza-clay text-xs font-bold uppercase tracking-[0.3em] mb-2 block">
            Portfólio
          </span>
          <h2 className="text-4xl md:text-6xl font-josefin text-essenza-coffee uppercase leading-none">
            Obras &<br/>Arquitetura
          </h2>
        </div>

        {/* TOGGLE BUTTONS */}
        <div className="flex items-center gap-2 bg-essenza-coffee/5 p-1 rounded-full">
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

      {/* LISTA DE PROJETOS */}
      <div className={`transition-all duration-500 ease-in-out ${
        view === "grid" 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20" 
          : "flex flex-col gap-8"
      }`}>
        {projects.map((project) => (
          <Link 
            href={`/projeto/${project.slug}`} 
            key={project.slug} 
            className={`group block transition-all duration-500 ${
              view === "list" ? "bg-white p-4 rounded-sm hover:shadow-lg flex items-center gap-6" : ""
            }`}
          >
            <div className={`relative overflow-hidden transition-all duration-700 ${
              view === "grid" 
                ? "w-full aspect-2/3 rounded-t-full bg-essenza-sand/30 mb-8 group-hover:shadow-2xl"
                : "w-24 h-24 md:w-48 md:h-32 rounded-sm shrink-0" 
            }`}>
              {project.mainImage && (
                <Image
                  src={project.mainImage}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  // --- QUALIDADE PREMIUM & FLUIDEZ ---
                  quality={90} 
                  // Lógica Inteligente de Tamanho:
                  // Se for GRID: Baixa imagem grande (33vw no desktop)
                  // Se for LISTA: Baixa imagem pequena (20vw no desktop), economizando dados mas mantendo nitidez
                  sizes={
                    view === "grid" 
                      ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      : "(max-width: 768px) 25vw, 20vw"
                  }
                />
              )}
              
              {view === "grid" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-all duration-500">
                  <span className="px-6 py-3 bg-white/95 backdrop-blur-md text-[10px] uppercase font-bold tracking-[0.2em] opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 text-essenza-coffee shadow-lg">
                    Ver Projeto
                  </span>
                </div>
              )}
            </div>
            
            <div className={view === "grid" ? "text-center" : "text-left flex-1"}>
              <h3 className={`font-josefin uppercase group-hover:text-essenza-clay transition-colors tracking-wide ${
                 view === "grid" ? "text-2xl" : "text-xl md:text-3xl"
              }`}>
                {project.title}
              </h3>
              <p className="text-[10px] font-bold uppercase tracking-widest text-essenza-coffee/40 mt-2">
                {project.category}
              </p>
              {view === "list" && (
                 <span className="hidden md:inline-block mt-4 text-[10px] border-b border-essenza-clay text-essenza-clay uppercase tracking-widest">
                    Ver Detalhes ↗
                 </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}