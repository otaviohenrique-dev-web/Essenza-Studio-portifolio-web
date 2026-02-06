import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// --- TIPAGEM ---
interface ConsultancyDetails {
  title: string;
  mainImage: string;
  colorPalette: { name: string; hex: string }[];
  moodboardImages: string[];
  verdict: any;
}

// --- QUERY PRINCIPAL ---
const CONSULTANCY_QUERY = `*[_type == "consultancy" && slug.current == $slug][0] {
  title,
  "mainImage": mainImage.secure_url,
  "colorPalette": colorPalette[]{ name, hex },
  "moodboardImages": moodboardImages[].secure_url,
  verdict
}`;

// --- GERAÇÃO DE METADADOS (SEO DINÂMICO) ---
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  
  // Busca rápida apenas para SEO
  const product = await client.fetch<{ title: string; mainImage: string }>(
    `*[_type == "consultancy" && slug.current == $slug][0]{ 
      title, 
      "mainImage": mainImage.secure_url
    }`,
    { slug }
  );

  if (!product) {
    return {
      title: "Consultoria não encontrada",
    };
  }

  return {
    title: product.title,
    description: `Confira os detalhes e inspirações da consultoria ${product.title} do Essenza Studio.`,
    openGraph: {
      title: `${product.title} | Essenza Studio`,
      description: "Arquitetura Sensorial & Interiores.",
      images: [
        {
          url: product.mainImage, // A foto que aparece no WhatsApp
          width: 1200,
          height: 630,
          alt: product.title,
        },
      ],
    },
  };
}

// --- COMPONENTE DA PÁGINA ---
export default async function ConsultancyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await client.fetch<ConsultancyDetails>(CONSULTANCY_QUERY, {
    slug,
  });

  if (!data) notFound();

  // Verificações de segurança
  const hasMoodboard = data.moodboardImages && data.moodboardImages.length > 0;
  const hasPalette = data.colorPalette && data.colorPalette.length > 0;

  return (
    <div className="min-h-screen bg-essenza-soft text-essenza-coffee selection:bg-essenza-clay selection:text-white pb-20">
      
      {/* --- 1. NAVBAR (Fixa no topo) --- */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-essenza-soft/90 backdrop-blur-md border-b border-essenza-coffee/5 transition-all">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-essenza-coffee hover:opacity-60 transition-opacity group"
        >
          <span className="font-poiret text-xl group-hover:-translate-x-1 transition-transform">←</span>
          <span className="text-xs font-bold uppercase tracking-[0.2em]">Voltar</span>
        </Link>
        <div className="hidden md:block text-xs font-bold uppercase tracking-[0.2em] opacity-40">
          Essenza Studio
        </div>
      </nav>

      <main className="pt-20"> {/* Padding compensa a navbar fixa */}

        {/* --- 2. HERO SECTION --- */}
        <header className="w-full max-w-350 mx-auto p-4 md:p-8">
          <div className="relative w-full aspect-video md:aspect-21/9 rounded-sm overflow-hidden bg-gray-200 shadow-sm">
            {data.mainImage ? (
              <Image
                src={data.mainImage}
                alt={data.title}
                fill
                className="object-cover"
                priority
                sizes="95vw"
                quality={90}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                Sem Imagem de Capa
              </div>
            )}
            
            {/* Título Overlay */}
            <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-6 md:p-12 transition-opacity hover:bg-black/20">
              <span className="text-white/80 text-[10px] md:text-xs uppercase tracking-[0.4em] mb-2 backdrop-blur-sm w-fit px-2 py-1 rounded-full border border-white/20">
                Consultoria de Interiores
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-josefin font-bold text-white uppercase tracking-tighter drop-shadow-lg">
                {data.title}
              </h1>
            </div>
          </div>
        </header>

        {/* --- 3. VEREDITO & PALETA --- */}
        <section className="max-w-225 mx-auto px-6 py-16 md:py-24 flex flex-col gap-16">
          
          {/* Texto do Veredito */}
          <div className="text-center">
            <h2 className="text-4xl font-poiret text-essenza-coffee mb-10 relative inline-block">
              O Veredito
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-px bg-essenza-clay"></span>
            </h2>
            <div className="prose prose-lg mx-auto text-justify text-essenza-coffee/80 leading-loose font-light prose-p:mb-6">
              {data.verdict ? (
                <PortableText value={data.verdict} />
              ) : (
                <p className="text-center opacity-50 italic">Descrição do conceito indisponível.</p>
              )}
            </div>
          </div>

          {/* Paleta de Cores */}
          {hasPalette && (
            <div className="bg-white p-8 md:p-12 rounded-sm border border-essenza-sand shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
              <h3 className="text-center text-xs font-bold uppercase tracking-[0.3em] text-essenza-clay mb-10">
                Identidade Cromática
              </h3>
              <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                {data.colorPalette.map((color, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-4 group cursor-default">
                    <div 
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full shadow-md border-4 border-white ring-1 ring-gray-100 transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-[10px] uppercase font-bold text-essenza-coffee/60 tracking-widest group-hover:text-essenza-coffee transition-colors">
                      {color.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* --- 4. MOODBOARD (Grid Estável) --- */}
        {hasMoodboard && (
          <section className="w-full bg-white py-24 border-t border-essenza-coffee/5">
            <div className="max-w-400 mx-auto px-6 md:px-12">
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

              {/* Grid Responsivo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {data.moodboardImages.map((img, idx) => (
                  <div 
                    key={idx} 
                    className={`relative w-full overflow-hidden rounded-sm bg-essenza-soft group ${
                      // Destaque para a primeira imagem (opcional)
                      idx === 0 ? "aspect-square sm:col-span-2 sm:row-span-2" : "aspect-3/4"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Inspiração Moodboard ${idx + 1}`}
                      fill
                      className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                      sizes={idx === 0 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                    />
                    {/* Overlay suave no hover */}
                    <div className="absolute inset-0 bg-essenza-coffee/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Final */}
        <div className="text-center py-24 px-4">
          <p className="font-poiret text-lg mb-6 text-essenza-coffee/70">Inspirado por este estilo?</p>
          <Link 
            href="/#contato"
            className="inline-block px-10 py-4 bg-essenza-coffee text-essenza-soft text-xs font-bold uppercase tracking-[0.25em] hover:bg-essenza-clay transition-colors shadow-lg hover:shadow-xl"
          >
            Solicitar Proposta
          </Link>
        </div>

      </main>
    </div>
  );
}