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
        
        {/* 2. COLUNA DA FOTO (Sticky) */}
        <aside className="relative w-full lg:w-1/2 h-[50vh] lg:h-screen lg:sticky lg:top-0 bg-gray-200">
          {/* NOVA IMAGEM DE ARQUITETO (Link Estável) */}
          {/* FOTO LOCAL (DA PASTA PUBLIC) */}
          <Image
            src="/arquiteto.png"   // <--- O Next.js busca automaticamente na pasta public
            alt="Arquiteto Principal - Essenza Studio"
            fill
            className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-[2s] ease-out"
            priority
            quality={90}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent lg:hidden" />
          
          <div className="absolute bottom-8 left-8 text-white lg:hidden z-10">
            <h1 className="text-3xl font-josefin font-bold uppercase">Essenza Studio</h1>
            <p className="font-poiret tracking-widest text-sm opacity-90">Arquitetura & Interiores</p>
          </div>
        </aside>

        {/* 3. COLUNA DE TEXTO (Manifesto) */}
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

            <div className="prose prose-lg prose-p:font-light prose-p:leading-loose prose-p:text-essenza-coffee/80 text-justify space-y-8">
              <p>
                Acreditamos que a arquitetura não é apenas sobre erguer paredes, mas sobre 
                <strong> moldar sentimentos</strong>. No Essenza Studio, cada projeto nasce de uma escuta ativa 
                e profunda, traduzindo a personalidade única de cada cliente em formas, texturas e luz.
              </p>
              <p>
                Nossa abordagem une o rigor técnico da engenharia com a sensibilidade artística do design de interiores. 
                Buscamos o equilíbrio entre o minimalismo contemporâneo e o calor dos materiais naturais — 
                pedra, madeira, linho e luz solar são nossos principais "materiais de construção".
              </p>
              <blockquote className="border-l-4 border-essenza-clay pl-6 italic text-2xl font-poiret text-essenza-coffee my-12">
                "Um espaço bem projetado não apenas abriga o corpo, ele acalma a mente e inspira a alma."
              </blockquote>
              <p>
                Com vasta experiência no mercado de alto padrão, nosso foco é entregar não apenas 
                um projeto, mas uma experiência de vida elevada. Do primeiro traço ao último vaso posicionado, 
                cuidamos de cada detalhe para que sua única preocupação seja viver.
              </p>
            </div>

            {/* Assinatura / CTA */}
            <div className="mt-20 pt-12 border-t border-essenza-coffee/10">
              <h3 className="font-josefin text-xl mb-4">Vamos conversar?</h3>
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