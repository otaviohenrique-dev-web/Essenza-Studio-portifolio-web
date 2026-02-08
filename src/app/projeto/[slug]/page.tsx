import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectGallery } from "@/components/ProjectGallery"; // <--- Importe o novo componente

interface ProjectDetails {
  title: string;
  category: string;
  mainImage: string;
  gallery: string[];
  description: any;
  infos: {
    year: number;
    location: string;
    area: number;
    status: string;
  };
}

const PROJECT_QUERY = `*[_type == "project" && slug.current == $slug][0] {
  title,
  category,
  "mainImage": mainImage.secure_url,
  "gallery": gallery[].secure_url, 
  description,
  infos
}`;

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  const project = await client.fetch<ProjectDetails>(
    PROJECT_QUERY, 
    { slug }, 
    { next: { revalidate: 60 } }
  );

  if (!project) notFound();

  return (
    <main className="min-h-screen bg-essenza-soft text-essenza-coffee pb-24 font-josefin">
      
      {/* NAV INTERNA PREMIUM */}
      <nav className="fixed top-0 left-0 w-full z-100 px-6 py-6 md:px-12 md:py-8 flex justify-between items-center text-white mix-blend-difference pointer-events-none">
        <Link 
          href="/" 
          className="pointer-events-auto text-xl md:text-2xl font-bold tracking-[0.3em] uppercase hover:opacity-70 transition-opacity"
        >
          Essenza
        </Link>
        <Link 
          href="/#projetos" 
          className="pointer-events-auto flex items-center gap-3 group transition-opacity"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] group-hover:text-essenza-clay transition-colors">
            Voltar
          </span>
          <div className="w-8 h-px bg-white group-hover:bg-essenza-clay group-hover:w-12 transition-all duration-500" />
        </Link>
      </nav>

      {/* HERO SECTION */}
      <header className="relative w-full h-[70vh] md:h-[85vh]">
        {project.mainImage && (
          <Image
            src={project.mainImage}
            alt={project.title}
            fill
            className="object-cover"
            priority
            quality={90}
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-essenza-coffee/90 via-transparent to-transparent opacity-80" />
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-20">
          <div className="max-w-7xl mx-auto">
            <span className="block font-poiret text-essenza-sand text-lg md:text-2xl tracking-widest mb-2 border-l-2 border-essenza-clay pl-3">
              {project.category}
            </span>
            <h1 className="text-4xl md:text-7xl font-bold text-white uppercase tracking-tight">
              {project.title}
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* COLUNA ESQUERDA: Ficha Técnica */}
        <aside className="lg:col-span-4 lg:sticky lg:top-24 h-fit order-2 lg:order-1">
          <div className="bg-white p-8 md:p-10 rounded-sm shadow-sm border-t-4 border-essenza-clay">
            <h3 className="font-poiret text-2xl mb-8 text-essenza-clay">Ficha Técnica</h3>
            <ul className="space-y-6">
              {[
                { label: "Localização", value: project.infos?.location },
                { label: "Ano", value: project.infos?.year },
                { label: "Área", value: project.infos?.area ? `${project.infos.area}m²` : null },
                { label: "Status", value: project.infos?.status },
              ].map((item, idx) => (
                item.value && (
                  <li key={idx} className="flex flex-col border-b border-essenza-sand pb-3 last:border-0">
                    <span className="text-xs uppercase tracking-widest text-essenza-coffee/50 mb-1">
                      {item.label}
                    </span>
                    <span className="font-semibold text-lg">{item.value}</span>
                  </li>
                )
              ))}
            </ul>
          </div>
        </aside>

        {/* COLUNA DIREITA: Texto Descritivo */}
        <article className="lg:col-span-8 prose prose-lg prose-p:text-essenza-coffee/80 prose-headings:font-josefin prose-headings:text-essenza-coffee order-1 lg:order-2 max-w-none text-justify">
          <PortableText value={project.description} />
        </article>
      </div>

      {/* --- GALERIA INTERATIVA (Novo Componente) --- */}
      <ProjectGallery 
        images={project.gallery} 
        title={project.title} 
      />

    </main>
  );
}