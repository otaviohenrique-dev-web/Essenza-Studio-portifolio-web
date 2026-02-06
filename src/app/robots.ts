import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://essenza-studio.vercel.app' // Vamos atualizar isso depois do deploy final

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/studio/', // Não queremos o Google indexando a área administrativa
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}