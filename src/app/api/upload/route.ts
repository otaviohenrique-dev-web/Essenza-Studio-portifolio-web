import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

// Função auxiliar para converter Buffer em Base64
// Necessário pois a API do Cloudinary espera string ou stream
async function fileToBase64(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return `data:${file.type};base64,${buffer.toString('base64')}`;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const folder = formData.get('folder') as string || 'essenza-geral';

    if (!file) {
      return NextResponse.json({ error: 'Nenhum arquivo enviado' }, { status: 400 });
    }

    // Converter para formato que o Cloudinary aceita
    const base64File = await fileToBase64(file);

    // Upload real
    const result = await cloudinary.uploader.upload(base64File, {
      folder: `essenza-studio/${folder}`,
      resource_type: 'auto',
    });

    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
    });

  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: 'Falha no upload' }, { status: 500 });
  }
}