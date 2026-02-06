import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";

// --- Interfaces de Tipagem ---
interface Project {
  _id: string;
  title: string;
  category: string;
  slug: string;
  imageUrl: string;
}

interface Consultancy {
  _id: string;
  title: string;
  slug: string;
  imageUrl: string;
  colorPalette: { hex: string }[]; // Apenas o HEX para o preview
}

// --- Queries do Sanity ---
const PROJECTS_QUERY = `*[_type == "project"] | order(_createdAt desc) [0...6] {
  _id,
  title,
  category,
  "slug": slug.current,
  "imageUrl": mainImage.secure_url
}`;

const CONSULTANCY_QUERY = `*[_type == "consultancy"] | order(_createdAt desc) [0...6] {
  _id,
  title,
  "slug": slug.current,
  "imageUrl": mainImage.secure_url,
  "colorPalette": colorPalette[]{ hex }
}`;

export default async function Home() {
  // Fetch em paralelo (muito rápido)
  const [projects, consultancies] = await Promise.all([
    client.fetch<Project[]>(PROJECTS_QUERY),
    client.fetch<Consultancy[]>(CONSULTANCY_QUERY),
  ]);

  return (
    <main className="min-h-screen bg-essenza-soft pb-24">
      
      {/* 1. HEADER HERO */}
      <header className="py-20 md:py-32 px-6 text-center bg-white mb-16 shadow-sm border-b border-essenza-sand">
        <div className="max-w-3xl mx-auto space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold text-essenza-coffee tracking-tighter uppercase font-josefin">
            Essenza Studio
          </h1>
          <p className="text-lg md:text-2xl font-poiret text-essenza-clay tracking-[0.2em]">
            Arquitetura & Interiores
          </p>
        </div>
      </header>

      {/* 2. SEÇÃO: PROJETOS (Arquitetura) */}
      {projects.length > 0 && (
        <section className="px-6 md:px-12 max-w-400 mx-auto mb-32">
          <div className="flex items-end justify-between mb-10 border-b border-essenza-coffee/10 pb-4">
            <h2 className="text-3xl font-poiret text-essenza-coffee tracking-widest">
              Obras & Projetos
            </h2>
            <span className="text-xs font-bold text-essenza-clay uppercase tracking-wider hidden md:block">
              Arquitetura Residencial e Comercial
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Link key={project._id} href={`/projeto/${project.slug}`} className="group">
                <article>
                  {/* Visual: Horizontal (4:3) */}
                  <div className="relative aspect-4/3 overflow-hidden rounded-sm bg-gray-100 mb-4">
                    {project.imageUrl && (
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-essenza-clay uppercase tracking-widest">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-josefin font-semibold text-essenza-coffee group-hover:underline decoration-1 underline-offset-4 decoration-essenza-clay">
                      {project.title}
                    </h3>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 3. SEÇÃO: CONSULTORIAS (Moodboards) */}
      {consultancies.length > 0 && (
        <section className="px-6 md:px-12 max-w-400 mx-auto">
          <div className="flex items-end justify-between mb-10 border-b border-essenza-coffee/10 pb-4">
            <h2 className="text-3xl font-poiret text-essenza-coffee tracking-widest">
              Consultorias
            </h2>
            <span className="text-xs font-bold text-essenza-olive uppercase tracking-wider hidden md:block">
              Moodboards & Curadoria
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {consultancies.map((consultancy) => (
              <Link key={consultancy._id} href={`/consultoria/${consultancy.slug}`} className="group">
                <article className="flex flex-col h-full">
                  
                  {/* Visual: Vertical (Pinterest Style 3:4) */}
                  <div className="relative aspect-3/4 overflow-hidden rounded-lg bg-gray-100 shadow-sm transition-shadow duration-300 group-hover:shadow-md">
                    {consultancy.imageUrl && (
                      <Image
                        src={consultancy.imageUrl}
                        alt={consultancy.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    )}
                    
                    {/* Diferencial: Bolinhas de cor SOBRE a imagem no canto inferior */}
                    {consultancy.colorPalette && (
                      <div className="absolute bottom-3 right-3 flex -space-x-2">
                        {consultancy.colorPalette.slice(0, 3).map((color, idx) => (
                          <div
                            key={idx}
                            className="w-4 h-4 rounded-full border border-white shadow-sm"
                            style={{ backgroundColor: color.hex }}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-3 text-center md:text-left">
                    <h3 className="text-sm md:text-base font-josefin font-medium text-essenza-coffee">
                      {consultancy.title}
                    </h3>
                  </div>

                </article>
              </Link>
            ))}
          </div>
        </section>
      )}

    </main>
  );
}