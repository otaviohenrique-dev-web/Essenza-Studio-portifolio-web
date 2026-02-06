import UploadTest from "@/components/UploadTest";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-essenza-bg p-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-essenza-primary mb-2">
          Essenza Studio
        </h1>
        <p className="text-essenza-tertiary">
          Ambiente de Desenvolvimento & Testes
        </p>
      </div>

      {/* Componente de Teste de Infraestrutura */}
      <UploadTest />
      
    </main>
  );
}