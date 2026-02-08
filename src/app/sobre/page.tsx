import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-essenza-soft text-essenza-coffee selection:bg-essenza-clay selection:text-white font-josefin">
      
      {/* 1. NAV FLUTUANTE */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center mix-blend-difference text-white pointer-events-none">
        <Link 
          href="/" 
          className="pointer-events-auto flex items-center gap-2 group hover:opacity-70 transition-opacity"
        >
          <span className="font-poiret text-3xl pb-1">←</span>
          <span className="text-xs font-bold uppercase tracking-[0.2em]">Home</span>
        </Link>
        <div className="hidden md:block text-xs font-bold uppercase tracking-[0.2em] opacity-80">
          O Estúdio
        </div>
      </nav>

      <main className="flex flex-col lg:flex-row min-h-screen">
        
        {/* 2. COLUNA DAS FOTOS (Sticky - Layout Arcos Clássicos com Ritmo) */}
        <aside className="relative w-full lg:w-1/2 h-screen lg:sticky lg:top-0 bg-essenza-soft overflow-hidden p-6 lg:p-12 flex items-center justify-center">
          
          <div className="grid grid-cols-2 gap-4 md:gap-8 w-full max-w-2xl items-center">
            
            {/* Arco 1 (Cima) - Emilyn */}
            <div className="relative w-full aspect-3/5 rounded-t-full overflow-hidden shadow-2xl animate-[slideUp_1s_ease-out] mb-12 lg:mb-24 bg-gray-200">
              <Image
                src="/socia1.png" 
                alt="Emilyn Cristiny - Arquiteta Essenza Studio"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-[2s] ease-out"
                priority
                quality={90}
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute bottom-0 left-0 w-full p-4 bg-linear-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 flex justify-center">
                 <span className="text-white text-[10px] uppercase tracking-widest font-bold">Emilyn</span>
              </div>
            </div>

            {/* Arco 2 (Baixo) - Sócia (Padronizado para Cima) */}
            <div className="relative w-full aspect-3/5 rounded-t-full overflow-hidden shadow-2xl animate-[slideUp_1.3s_ease-out] mt-12 lg:mt-24 bg-gray-200">
              <Image
                src="/socia2.png" 
                alt="Sócia Arquiteta - Essenza Studio"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-[2s] ease-out"
                quality={90}
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
               <div className="absolute bottom-0 left-0 w-full p-4 bg-linear-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 flex justify-center">
                 <span className="text-white text-[10px] uppercase tracking-widest font-bold">Sócia</span>
              </div>
            </div>

          </div>
          
          {/* Título Mobile */}
          <div className="absolute bottom-8 left-8 text-essenza-coffee lg:hidden z-40">
            <h1 className="text-3xl font-josefin font-bold uppercase">Essenza Studio</h1>
          </div>
        </aside>

        {/* 3. COLUNA DE TEXTO */}
        <section className="w-full lg:w-1/2 px-8 py-20 lg:px-24 lg:py-32 flex flex-col justify-center bg-essenza-soft border-l border-essenza-coffee/5">
          
          <div className="animate-[slideUp_0.8s_ease-out]">
            <span className="text-essenza-clay text-xs font-bold uppercase tracking-[0.4em] mb-6 block">
              Nossa Filosofia
            </span>
            
            <h1 className="text-5xl xl:text-8xl font-josefin font-bold text-essenza-coffee uppercase mb-12 leading-none">
              Essência <br/>
              <span className="text-essenza-clay font-poiret font-light text-4xl xl:text-7xl italic lowercase tracking-wide block mt-2">
                & Matéria
              </span>
            </h1>

            <div className="space-y-16">
              
              {/* --- PERFIL 1: EMILYN (Técnica & Precisão) --- */}
              <div className="space-y-4">
                <h2 className="text-2xl font-josefin font-bold uppercase tracking-widest text-essenza-coffee flex items-center gap-4">
                  Emilyn Cristiny
                  <span className="h-px flex-1 bg-essenza-coffee/10"></span>
                </h2>
                <p className="text-essenza-clay text-xs font-bold uppercase tracking-widest">
                  Arquiteta & Urbanista
                </p>
                <div className="prose prose-lg prose-p:font-light prose-p:leading-relaxed prose-p:text-essenza-coffee/80 text-justify">
                  <p>
                    Para Emilyn, a arquitetura é a <strong>arte de materializar sensações</strong>. Com um olhar contemporâneo refinado durante sua formação acadêmica e prático, ela traz ao estúdio o <strong>equilíbrio perfeito entre a precisão técnica e a leveza estética</strong>.
                  </p>
                  <p>
                    Sua assinatura está no cuidado obsessivo com o "como fazer": domina a <strong>tradução de sonhos em projetos executivos detalhados</strong>, garantindo que cada veio da madeira ou encontro de revestimentos seja executado com maestria. Através de uma <strong>visualização 3D hiper-realista</strong> e um acompanhamento próximo em obra, ela assegura que a poesia do conceito inicial sobreviva intacta até a entrega das chaves.
                  </p>
                </div>
              </div>

              {/* --- PERFIL 2: SÓCIA (Criação & Curadoria) --- */}
              <div className="space-y-4">
                <h2 className="text-2xl font-josefin font-bold uppercase tracking-widest text-essenza-coffee flex items-center gap-4">
                  Juliana Ferreira
                  <span className="h-px flex-1 bg-essenza-coffee/10"></span>
                </h2>
                <p className="text-essenza-clay text-xs font-bold uppercase tracking-widest">
                  Arquiteta & Urbanista
                </p>
                <div className="prose prose-lg prose-p:font-light prose-p:leading-relaxed prose-p:text-essenza-coffee/80 text-justify">
                  <p>
                    Com uma abordagem intuitiva e sensível, Juliana Ferreira é a responsável por dar alma aos espaços. Sua expertise reside na <strong>curadoria de materiais naturais e na composição de atmosferas</strong> que acolhem e contam histórias.
                  </p>
                  <p>
                    Ela acredita que o luxo mora na simplicidade bem resolvida. Seu foco está na <strong>harmonização de texturas, luz e mobiliário</strong>, criando cenários que vão além do visual e tocam o emocional. Com um repertório estético apurado, ela guia as escolhas criativas do estúdio, garantindo que cada ambiente possua uma <strong>identidade única e atemporal</strong>, profundamente conectada com quem o habita.
                  </p>
                </div>
              </div>

            </div>

            {/* CTA */}
            <div className="mt-20 pt-12 border-t border-essenza-coffee/10">
              <h3 className="font-josefin text-xl mb-6">Pronta para transformar seu espaço?</h3>
              <div className="flex flex-col sm:flex-row gap-6">
                <Link 
                  href="mailto:arq.essenzastudio@gmail.com"
                  className="inline-block bg-essenza-coffee text-essenza-soft px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-essenza-clay transition-colors text-center shadow-lg"
                >
                  Solicitar Proposta
                </Link>
                <Link 
                  href="https://www.instagram.com/arq.essenzastudio/"
                  target="_blank"
                  className="inline-block border border-essenza-coffee text-essenza-coffee px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-essenza-coffee hover:text-essenza-soft transition-colors text-center"
                >
                  Instagram ↗
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}