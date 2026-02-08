import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { ProjectSection } from "@/components/ProjectSection"; // <--- Importar
import { ConsultancySection } from "@/components/ConsultancySection"; // <--- Importar

// ... (Interfaces e Query permanecem iguais)
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
  const data = await client.fetch<HomeData>(HOME_QUERY, {}, { next: { revalidate: 60 } });

  return (
    <div className="min-h-screen bg-essenza-soft text-essenza-coffee selection:bg-essenza-clay selection:text-white font-josefin">
      
      {/* NAV PREMIUM (MANTIDA IGUAL AO ANTERIOR) */}
      <nav className="absolute top-0 w-full z-100 px-6 py-8 md:px-12 flex justify-between items-center text-white">
        <Link href="/" className="text-xl md:text-2xl font-bold tracking-[0.3em] uppercase hover:opacity-70 transition-opacity drop-shadow-sm">
          Essenza
        </Link>
        <div className="flex items-center gap-4 md:gap-10">
          <div className="flex items-center gap-5 md:gap-10 text-[9px] md:text-xs font-bold uppercase tracking-[0.2em]">
            <Link href="/sobre" className="hover:text-essenza-clay transition-colors drop-shadow-sm">Sobre</Link>
            <Link href="#projetos" className="hover:text-essenza-clay transition-colors hidden md:block drop-shadow-sm">Projetos</Link>
            <Link href="#consultoria" className="hover:text-essenza-clay transition-colors hidden md:block drop-shadow-sm">Consultoria</Link>
          </div>
          <Link 
            href="/studio" 
            target="_blank"
            className="group relative px-4 py-2 md:px-5 md:py-2.5 border border-white/40 hover:border-white transition-all duration-500 overflow-hidden bg-black/10 backdrop-blur-md"
          >
            <span className="relative z-10 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.3em] group-hover:text-essenza-coffee transition-colors duration-500">
              Studio Access
            </span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          </Link>
        </div>
      </nav>

      <main>
        
        {/* HERO SECTION (MANTIDA IGUAL) */}
        <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
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
          <div className="relative z-10 text-center px-4">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-josefin font-bold text-white uppercase tracking-tighter drop-shadow-lg mb-6 animate-fadeIn">
              Essenza<br/><span className="font-poiret font-light text-4xl md:text-7xl tracking-widest block mt-2 lowercase">Studio</span>
            </h1>
            <p className="text-white/80 text-[10px] md:text-sm font-bold uppercase tracking-[0.5em] max-w-lg mx-auto animate-slideUp">
              Arquitetura Sensorial & Interiores
            </p>
          </div>
        </section>


        {/* --- 3. SEÇÃO PROJETOS (AGORA INTERATIVA) --- */}
        <ProjectSection projects={data.projects} />


        {/* --- 4. SEÇÃO CONSULTORIA (AGORA INTERATIVA) --- */}
        <ConsultancySection consultancies={data.consultancies} />


        {/* RODAPÉ (MANTIDO IGUAL) */}
        <section id="contato" className="py-24 md:py-32 bg-essenza-coffee text-essenza-soft text-center px-6 border-t border-white/5">
            {/* ... Seu rodapé com LinkedIn aqui ... */}
             <div className="mt-20 md:mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 max-w-7xl mx-auto">
              <p className="text-[9px] md:text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">
                © 2026 Essenza Studio. Todos os direitos reservados.
              </p>
              <div className="flex items-center gap-2">
                <p className="text-[9px] md:text-[10px] uppercase tracking-widest opacity-40">
                  Crafted by
                </p>
                <Link 
                  href="https://www.linkedin.com/in/otaviohenrique-dev/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 border border-white/10 px-3 py-1.5 rounded-full hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                >
                  <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-essenza-soft group-hover:text-white">
                    Otávio Henrique
                  </span>
                  <svg className="w-3 h-3 fill-essenza-clay group-hover:fill-white transition-colors" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </Link>
              </div>
            </div>
        </section>

      </main>
    </div>
  );
}