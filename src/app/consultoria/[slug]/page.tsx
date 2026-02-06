import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// --- TIPAGEM ---
interface ConsultancyDetails {
  title: string;
  mainImage: string;
  colorPalette: { name: string; hex: string }[];
  moodboardImages: string[];
  verdict: any;
}

const CONSULTANCY_QUERY = `*[_type == "consultancy" && slug.current == $slug][0] {
  title,
  "mainImage": mainImage.secure_url,
  "colorPalette": colorPalette[]{ name, hex },
  "moodboardImages": moodboardImages[].secure_url,
  verdict
}`;

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

  // Verificação de segurança para arrays (evita erros se vier vazio)
  const hasMoodboard = data.moodboardImages && data.moodboardImages.length > 0;
  const hasPalette = data.colorPalette && data.colorPalette.length > 0;

  return (
    <div className="min-h-screen bg-essenza-soft text-essenza-coffee pb-20">
      
      {/* --- 1. NAVBAR (Fixa no topo, simples e funcional) --- */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-white/80 backdrop-blur-md border-b border-essenza-coffee/10">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-essenza-coffee hover:opacity-60 transition-opacity"
        >
          <span className="text-xl">←</span>
          <span className="text-xs font-bold uppercase tracking-[0.2em]">Voltar</span>
        </Link>
        <div className="text-xs font-bold uppercase tracking-[0.2em] opacity-50">
          Essenza Studio
        </div>
      </nav>

      <main className="pt-17.5"> {/* Padding-top compensa a navbar fixa */}

        {/* --- 2. HERO SECTION (Sem sobreposições malucas) --- */}
        <header className="w-full max-w-350 mx-auto p-4 md:p-8">
          <div className="relative w-full aspect-video md:aspect-21/9 rounded-sm overflow-hidden bg-gray-200">
            {data.mainImage ? (
              <Image
                src={data.mainImage}
                alt={data.title}
                fill
                className="object-cover"
                priority
                sizes="90vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                Sem Imagem de Capa
              </div>
            )}
            
            {/* Título sobre a imagem (com proteção de leitura) */}
            <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-6 md:p-12">
              <span className="text-white text-[10px] uppercase tracking-[0.4em] mb-2">
                Consultoria
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white uppercase font-serif tracking-tighter">
                {data.title}
              </h1>
            </div>
          </div>
        </header>

        {/* --- 3. CONTEÚDO E PALETA (Layout em Colunas) --- */}
        <section className="max-w-250 mx-auto px-6 py-16 flex flex-col gap-12">
          
          {/* Veredito */}
          <div className="text-center">
            <h2 className="text-3xl font-serif text-essenza-coffee mb-8 italic">
              O Veredito
            </h2>
            <div className="prose prose-lg mx-auto text-justify text-essenza-coffee/80 leading-relaxed">
              {data.verdict ? (
                <PortableText value={data.verdict} />
              ) : (
                <p className="text-center opacity-50">Descrição indisponível.</p>
              )}
            </div>
          </div>

          {/* Paleta de Cores (Bolinhas grandes e visíveis) */}
          {hasPalette && (
            <div className="bg-white p-8 rounded-sm border border-essenza-sand shadow-sm">
              <h3 className="text-center text-xs font-bold uppercase tracking-[0.3em] text-essenza-clay mb-8">
                Identidade Cromática
              </h3>
              <div className="flex flex-wrap justify-center gap-8">
                {data.colorPalette.map((color, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-3">
                    {/* O CSS inline garante que a cor apareça independente do Tailwind */}
                    <div 
                      className="w-16 h-16 rounded-full shadow-md border-2 border-white ring-1 ring-gray-200"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-[10px] uppercase font-bold text-essenza-coffee/60">
                      {color.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* --- 4. MOODBOARD (Grid Estável com Aspect Ratio) --- */}
        {hasMoodboard ? (
          <section className="w-full bg-white py-20 border-t border-essenza-coffee/5">
            <div className="max-w-350 mx-auto px-6">
              <div className="mb-12 text-center md:text-left">
                <h2 className="text-5xl md:text-8xl font-serif text-essenza-coffee opacity-10 font-bold uppercase select-none">
                  Mood<br className="hidden md:block"/>Board
                </h2>
                <p className="-mt-6 md:-mt-12 text-lg text-essenza-clay font-medium tracking-wide">
                  Inspirações & Texturas
                </p>
              </div>

              {/* GRID: Usando aspect-square para FORÇAR o navegador a dar espaço para a imagem */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.moodboardImages.map((img, idx) => (
                  <div 
                    key={idx} 
                    className="relative w-full aspect-3/4 bg-gray-100 overflow-hidden group rounded-sm"
                  >
                    <Image
                      src={img}
                      alt={`Moodboard ${idx}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : (
          /* Debug Visual caso não haja imagens */
          <div className="p-12 text-center border-t border-red-200 bg-red-50 text-red-500">
            ⚠ Nenhuma imagem de moodboard encontrada no CMS para este projeto.
          </div>
        )}

        {/* Footer Simples */}
        <div className="text-center py-20">
          <Link 
            href="/#contato"
            className="inline-block px-8 py-3 bg-essenza-coffee text-essenza-soft text-xs font-bold uppercase tracking-[0.2em] hover:bg-essenza-clay transition-colors"
          >
            Iniciar Projeto
          </Link>
        </div>

      </main>
    </div>
  );
}