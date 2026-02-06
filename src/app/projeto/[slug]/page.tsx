import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

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
  const project = await client.fetch<ProjectDetails>(PROJECT_QUERY, { slug });

  if (!project) notFound();

  return (
    <main className="min-h-screen bg-essenza-soft text-essenza-coffee pb-24">
      
      {/* NAV SIMPLES */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 mix-blend-difference text-white md:mix-blend-normal md:text-essenza-coffee bg-gradient-to-b from-black/50 to-transparent md:bg-none">
        <Link href="/" className="flex items-center gap-2 group w-fit">
          <span className="font-poiret text-xl tracking-widest group-hover:-translate-x-1 transition-transform">
            ←
          </span>
          <span className="font-bold tracking-widest text-xs uppercase opacity-0 group-hover:opacity-100 transition-opacity">
            Voltar
          </span>
        </Link>
      </nav>

      {/* HERO SECTION - Fullscreen no Mobile */}
      <header className="relative w-full h-[70vh] md:h-[85vh]">
        {project.mainImage && (
          <Image
            src={project.mainImage}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        )}
        {/* Gradiente para leitura do texto */}
        <div className="absolute inset-0 bg-gradient-to-t from-essenza-coffee/90 via-transparent to-transparent opacity-80" />
        
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
        
        {/* COLUNA ESQUERDA: Ficha Técnica (Sobe no mobile se quiser, mas aqui mantive lateral) */}
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
        <article className="lg:col-span-8 prose prose-lg prose-p:text-essenza-coffee/80 prose-headings:font-josefin prose-headings:text-essenza-coffee order-1 lg:order-2">
          <PortableText value={project.description} />
        </article>
      </div>

      {/* GALERIA */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="max-w-[1800px] mx-auto px-4 md:px-6 mt-32">
          <h2 className="font-poiret text-3xl md:text-4xl text-center mb-16 text-essenza-clay tracking-widest">
            Galeria do Projeto
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            {project.gallery.map((imgUrl, index) => (
              <div 
                key={index} 
                className={`relative w-full overflow-hidden rounded-sm bg-gray-100 ${
                  // Lógica para grid irregular (Masonry fake): a cada 3 fotos, uma ocupa largura total
                  index % 3 === 0 ? "aspect-[16/9] md:col-span-2" : "aspect-[3/4]"
                }`}
              >
                <Image
                  src={imgUrl}
                  alt={`Detalhe ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition duration-[1.5s] ease-in-out"
                  sizes="(max-width: 768px) 100vw, 80vw"
                />
              </div>
            ))}
          </div>
        </section>
      )}

    </main>
  );
}