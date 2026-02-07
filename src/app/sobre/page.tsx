import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-essenza-soft text-essenza-coffee selection:bg-essenza-clay selection:text-white">
      
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
        
        {/* 2. COLUNA DA FOTO (Sticky com Composição de Dupla) */}
        <aside className="relative w-full lg:w-1/2 h-[80vh] lg:h-screen lg:sticky lg:top-0 bg-essenza-soft overflow-hidden p-8 lg:p-16 flex items-center justify-center">
          
          <div className="relative w-full h-full max-w-md lg:max-w-xl">
            {/* Foto da Sócia 1 - Emilyn Cristiny */}
            <div className="absolute top-0 left-0 w-4/5 h-3/5 z-10 overflow-hidden shadow-xl animate-[slideUp_1s_ease-out]">
              <Image
                src="/socia-1.jpeg" 
                alt="Emilyn Cristiny - Arquiteta Essenza Studio"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-[2s] ease-out"
                priority
                quality={90}
                sizes="(max-width: 1024px) 80vw, 40vw"
              />
            </div>

            {/* Foto da Sócia 2 */}
            <div className="absolute bottom-0 right-0 w-4/5 h-3/5 z-20 overflow-hidden shadow-2xl border-10 lg:border-20 border-essenza-soft animate-[slideUp_1.3s_ease-out]">
              <Image
                src="/socia2.png" 
                alt="Sócia Arquiteta - Essenza Studio"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-[2s] ease-out"
                quality={90}
                sizes="(max-width: 1024px) 80vw, 40vw"
              />
            </div>
            
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-l border-b border-essenza-clay/20 z-0 hidden lg:block" />
          </div>
          
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent lg:hidden pointer-events-none z-30" />
          <div className="absolute bottom-8 left-8 text-white lg:hidden z-40">
            <h1 className="text-3xl font-josefin font-bold uppercase">Essenza Studio</h1>
            <p className="font-poiret tracking-widest text-sm opacity-90">Arquitetura & Interiores</p>
          </div>
        </aside>

        {/* 3. COLUNA DE TEXTO (Manifesto e Perfis) */}
        <section className="w-full lg:w-1/2 px-8 py-20 lg:px-24 lg:py-32 flex flex-col justify-center bg-essenza-soft">
          
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

            <div className="space-y-12">
              {/* Perfil 1: Emilyn Cristiny */}
              <div className="space-y-4">
                <h2 className="text-2xl font-josefin font-bold uppercase tracking-widest text-essenza-coffee">
                  Emilyn Cristiny
                </h2>
                <p className="text-essenza-clay text-xs font-bold uppercase tracking-widest">
                  Arquiteta & Urbanista
                </p>
                <div className="prose prose-lg prose-p:font-light prose-p:leading-relaxed prose-p:text-essenza-coffee/80 text-justify">
                  <p>
                    Com um olhar técnico apurado e foco em resultados de alto padrão, Emilyn é especialista em transformar conceitos em realidade através de projetos executivos rigorosos e detalhamentos complexos de marcenaria e marmoraria. Sua expertise em ferramentas de visualização avançada permite que cada cliente visualize com precisão a essência de seu futuro espaço.
                  </p>
                  <p>
                    Sua atuação equilibra a precisão técnica com o acompanhamento próximo em campo, garantindo que a execução da obra respeite cada detalhe projetado, do primeiro levantamento à entrega final.
                  </p>
                </div>
              </div>

              {/* Perfil 2: Placeholder para a outra profissional */}
              <div className="space-y-4 pt-12 border-t border-essenza-clay/10">
                <h2 className="text-2xl font-josefin font-bold uppercase tracking-widest text-essenza-coffee">
                  Nome da Sócia
                </h2>
                <p className="text-essenza-clay text-xs font-bold uppercase tracking-widest">
                  Arquiteta & Urbanista
                </p>
                <div className="prose prose-lg prose-p:font-light prose-p:leading-relaxed prose-p:text-essenza-coffee/80 text-justify">
                  <p>
                    Descrição da outra profissional aqui, focando em sua abordagem criativa, 
                    sensibilidade estética e como sua visão complementa o trabalho da dupla 
                    no Essenza Studio.
                  </p>
                </div>
              </div>
            </div>

            {/* Assinatura / CTA */}
            <div className="mt-20 pt-12 border-t border-essenza-coffee/10">
              <h3 className="font-josefin text-xl mb-6">Pronta para transformar seu espaço?</h3>
              <div className="flex flex-col sm:flex-row gap-6">
                <Link 
                  href="mailto:arq.essenzastudio@gmail.com"
                  className="inline-block bg-essenza-coffee text-essenza-soft px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-essenza-clay transition-colors text-center"
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