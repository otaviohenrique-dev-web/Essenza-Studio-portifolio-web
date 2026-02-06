import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";

// --- 1. DEFINIÇÃO DE TIPOS E QUERIES ---
interface Project {
  title: string;
  slug: string;
  category: string;
  mainImage: string;
}

interface Consultancy {
  title: string;
  slug: string;
  mainImage: string;
  colorPalette: { hex: string }[];
}

interface HomeData {
  projects: Project[];
  consultancies: Consultancy[];
}

// Query Groq combinada para performance (1 request só)
const HOME_QUERY = `{
  "projects": *[_type == "project"]|order(_createdAt desc)[0...6]{
    title,
    "slug": slug.current,
    category,
    "mainImage": mainImage.secure_url
  },
  "consultancies": *[_type == "consultancy"]|order(_createdAt desc)[0...4]{
    title,
    "slug": slug.current,
    "mainImage": mainImage.secure_url,
    "colorPalette": colorPalette[]{ hex }
  }
}`;

export default async function Home() {
  const data = await client.fetch<HomeData>(HOME_QUERY);

  return (
    <div className="min-h-screen bg-essenza-soft text-essenza-coffee selection:bg-essenza-clay selection:text-white">
      
      {/* --- NAV ATUALIZADA (Com Link Admin Mobile e Desktop) --- */}
      <nav className="absolute top-0 w-full z-50 px-6 py-6 md:px-12 md:py-8 flex justify-between items-center text-white mix-blend-difference">
        <Link href="/" className="font-josefin text-2xl font-bold tracking-widest uppercase hover:opacity-80 transition-opacity">
          Essenza
        </Link>
        
        {/* --- 1. Link Admin para MOBILE (Só aparece em telas pequenas) --- */}
        <Link 
            href="/studio" 
            target="_blank"
            className="md:hidden opacity-30 hover:opacity-100 transition-opacity p-2"
            title="Admin Mobile"
        >
            <span className="text-sm">🔒</span>
        </Link>

        {/* --- 2. Menu DESKTOP (Com Link Admin Desktop) --- */}
        <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-[0.2em]">
          <Link 
            href="/sobre" 
            className="hover:text-essenza-clay transition-colors border-b border-transparent hover:border-essenza-clay pb-1"
          >
            O Estúdio
          </Link>
          <Link href="#projetos" className="hover:opacity-60 transition-opacity">Projetos</Link>
          <Link href="#consultoria" className="hover:opacity-60 transition-opacity">Consultoria</Link>
          <Link href="#contato" className="hover:opacity-60 transition-opacity">Contato</Link>
          
          {/* Link Admin Desktop */}
          <Link 
            href="/studio" 
            target="_blank"
            className="ml-4 opacity-30 hover:opacity-100 transition-opacity flex items-center gap-1 text-[10px]"
            title="Acesso Administrativo"
          >
            <span className="text-lg">🔒</span>
          </Link>
        </div>
      </nav>

      <main>
        
        {/* --- 2. HERO SECTION "IMPACT" --- */}
        <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
          {/* Background: Imagem Estática (preparada para vídeo futuro) */}
          <div className="absolute inset-0 z-0">
             {/* Placeholder Unsplash validado anteriormente */}
             <Image 
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2574&auto=format&fit=crop"
                alt="Essenza Hero"
                fill
                className="object-cover brightness-[0.6]"
                priority
                quality={90}
             />
             <div className="absolute inset-0 bg-black/20" /> 
          </div>

          {/* Texto Central Animado */}
          <div className="relative z-10 text-center px-4">
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-josefin font-bold text-white uppercase tracking-tighter drop-shadow-lg mb-6 animate-[fadeIn_1s_ease-out]">
              Essenza<br/><span className="font-poiret font-light text-4xl md:text-7xl tracking-widest block mt-2">Studio</span>
            </h1>
            <p className="text-white/80 text-xs md:text-sm font-bold uppercase tracking-[0.4em] max-w-lg mx-auto animate-[slideUp_1.2s_ease-out]">
              Arquitetura Sensorial & Interiores
            </p>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-12 animate-bounce">
             <div className="w-px h-12 bg-white/50 mx-auto mb-2"></div>
             <span className="text-white/50 text-[10px] uppercase tracking-[0.3em]">Discover</span>
          </div>
        </section>


        {/* --- 3. SEÇÃO PROJETOS (Arquitetura) --- */}
        <section id="projetos" className="py-24 px-6 md:px-12 max-w-450 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-essenza-coffee/10 pb-6">
            <div>
              <span className="text-essenza-clay text-xs font-bold uppercase tracking-[0.3em] mb-2 block">
                Portfólio
              </span>
              <h2 className="text-4xl md:text-6xl font-josefin text-essenza-coffee uppercase">
                Obras &<br/>Arquitetura
              </h2>
            </div>
            {/* Link para página de listagem completa de projetos (futuro) */}
            <button className="hidden md:block text-xs font-bold uppercase tracking-[0.2em] border-b border-essenza-coffee pb-1 hover:text-essenza-clay hover:border-essenza-clay transition-colors cursor-pointer">
              Ver Todos
            </button>
          </div>

          {/* Grid Horizontal / Misto */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {data.projects.length > 0 ? (
              data.projects.map((project) => (
                <Link 
                  href={`/projeto/${project.slug}`} 
                  key={project.slug} 
                  className="group block cursor-pointer"
                >
                  <div className="relative w-full aspect-4/3 overflow-hidden rounded-sm bg-gray-200 mb-6">
                    {project.mainImage && (
                      <Image
                        src={project.mainImage}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    )}
                    {/* Overlay Hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                  </div>
                  
                  <div className="flex justify-between items-start border-t border-essenza-coffee/20 pt-4 transition-all group-hover:border-essenza-clay">
                    <div>
                      <h3 className="text-xl md:text-2xl font-josefin uppercase group-hover:text-essenza-clay transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs font-bold uppercase tracking-widest text-essenza-coffee/50 mt-1">
                        {project.category}
                      </p>
                    </div>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-essenza-clay text-xl">↗</span>
                  </div>
                </Link>
              ))
            ) : (
              <p className="col-span-full text-center opacity-40 py-20">Em breve: Novos projetos.</p>
            )}
          </div>
          
          {/* Botão Mobile */}
          <div className="mt-12 md:hidden text-center">
             <button className="inline-block text-xs font-bold uppercase tracking-[0.2em] border border-essenza-coffee px-6 py-3">
              Ver Todos os Projetos
            </button>
          </div>
        </section>


        {/* --- 4. SEÇÃO CONSULTORIA (Design de Interiores) --- */}
        <section id="consultoria" className="bg-white py-24 border-t border-essenza-coffee/5">
          <div className="px-6 md:px-12 max-w-450 mx-auto">
             <div className="text-center mb-20 max-w-3xl mx-auto">
               <span className="text-essenza-olive text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
                  Interiores & Styling
               </span>
               <h2 className="text-4xl md:text-7xl font-poiret text-essenza-coffee mb-6">
                 Consultorias
               </h2>
               <p className="text-essenza-coffee/70 font-light leading-relaxed">
                 Transformações ágeis e curadoria de decoração focada em bem-estar e identidade.
                 Soluções online e presenciais para renovar seu espaço.
               </p>
             </div>

             {/* Grid Vertical */}
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {data.consultancies.length > 0 ? (
                  data.consultancies.map((consultancy) => (
                    <Link 
                      href={`/consultoria/${consultancy.slug}`} 
                      key={consultancy.slug}
                      className="group relative flex flex-col"
                    >
                      <div className="relative w-full aspect-3/4 overflow-hidden rounded-t-full md:rounded-sm bg-essenza-soft">
                        {consultancy.mainImage && (
                          <Image
                            src={consultancy.mainImage}
                            alt={consultancy.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, 25vw"
                          />
                        )}
                         {/* Tag Flutuante */}
                         <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] uppercase font-bold tracking-widest rounded-full opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                           Ver Detalhes
                         </div>
                      </div>

                      <div className="mt-4 text-center md:text-left">
                        <h3 className="text-lg font-josefin uppercase group-hover:text-essenza-clay transition-colors">
                          {consultancy.title}
                        </h3>
                        
                        {/* Preview da Paleta de Cores */}
                        <div className="flex justify-center md:justify-start gap-1 mt-2 h-2">
                           {consultancy.colorPalette && consultancy.colorPalette.map((color, i) => (
                             <div 
                               key={i} 
                               className="w-2 h-2 rounded-full" 
                               style={{ backgroundColor: color.hex }}
                             />
                           ))}
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center bg-essenza-soft rounded-sm">
                    <p className="opacity-40">Nenhuma consultoria publicada ainda.</p>
                  </div>
                )}
             </div>
          </div>
        </section>

       {/* --- 5. RODAPÉ COM MENU --- */}
        <section id="contato" className="py-24 bg-essenza-coffee text-essenza-soft text-center">
            <h2 className="font-poiret text-4xl mb-8">Vamos criar algo único?</h2>
            
            {/* Link de E-mail */}
            <Link 
              href="mailto:arq.essenzastudio@gmail.com"
              className="text-xl md:text-5xl font-josefin font-bold hover:text-essenza-clay transition-colors border-b-2 border-transparent hover:border-essenza-clay"
            >
              arq.essenzastudio@gmail.com
            </Link>

            {/* Menu Secundário no Footer */}
            <div className="mt-12 flex justify-center gap-8 text-xs font-bold uppercase tracking-widest opacity-80 items-center">
               <Link href="/sobre" className="hover:text-essenza-clay transition-colors">Sobre Nós</Link>
               <Link href="#projetos" className="hover:text-essenza-clay transition-colors">Portfólio</Link>
               
               {/* INSTAGRAM ATUALIZADO */}
               <Link 
                 href="https://www.instagram.com/arq.essenzastudio/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="hover:text-essenza-clay transition-colors flex items-center gap-2"
               >
                 Instagram ↗
               </Link>
            </div>

            <p className="mt-20 text-[10px] uppercase tracking-widest opacity-30">
              © 2026 Essenza Studio. Desenvolvido por{" "}
              <Link 
                href="https://www.linkedin.com/in/otaviohenrique-dev/" 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-essenza-clay transition-colors border-b border-transparent hover:border-essenza-clay pb-0.5"
              >
                Otávio Henrique
              </Link>.
            </p>
        </section>

      </main>
    </div>
  );
}