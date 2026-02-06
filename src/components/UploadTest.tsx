'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function UploadTest() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    
    setLoading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'teste-essenza'); // Testa se cria a pasta

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (data.url) {
        setImage(data.url);
        console.log('Upload sucesso:', data);
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro no upload');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 border-2 border-dashed border-essenza-tertiary rounded-lg max-w-md mx-auto my-10 bg-essenza-bg">
      <h3 className="text-essenza-primary font-bold mb-4">Teste de Upload & CDN</h3>
      
      <input 
        type="file" 
        onChange={handleUpload} 
        disabled={loading}
        className="mb-4 block w-full text-sm text-essenza-secondary
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-essenza-sand file:text-essenza-primary
          hover:file:bg-essenza-secondary hover:file:text-white"
      />

      {loading && <p className="text-essenza-olive">Enviando para o Cloudinary...</p>}

      {image && (
        <div className="mt-4">
          <p className="text-sm text-green-600 mb-2">Sucesso! URL recebida.</p>
          <div className="relative w-full h-48 rounded-lg overflow-hidden border border-essenza-primary">
            {/* Se o componente Image funcionar, o next.config.ts está certo */}
            <Image 
              src={image} 
              alt="Teste Cloudinary" 
              fill 
              className="object-cover"
            />
          </div>
          <p className="text-xs text-gray-500 break-all mt-2">{image}</p>
        </div>
      )}
    </div>
  );
}