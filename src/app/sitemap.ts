import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://essenza-studio.vercel.app' // URL provisória

  // 1. Buscar todas as Consultorias
  const consultancies = await client.fetch<string[]>(
    `*[_type == "consultancy"]{ "slug": slug.current }`
  )

  // 2. Buscar todos os Projetos
  const projects = await client.fetch<string[]>(
    `*[_type == "project"]{ "slug": slug.current }`
  )

  // 3. Mapear URLs de Consultoria
  const consultancyUrls = consultancies.map((item: any) => ({
    url: `${baseUrl}/consultoria/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // 4. Mapear URLs de Projetos
  const projectUrls = projects.map((item: any) => ({
    url: `${baseUrl}/projeto/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // 5. Retornar tudo junto (Estáticas + Dinâmicas)
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/sobre`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.9,
    },
    ...consultancyUrls,
    ...projectUrls,
  ]
}