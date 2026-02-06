import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Projetos',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título do Projeto',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      description: 'O endereço amigável do projeto (ex: /projetos/casa-no-lago)',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          { title: 'Residencial', value: 'residencial' },
          { title: 'Comercial', value: 'comercial' },
          { title: 'Consultoria', value: 'consultoria' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),

    // 📸 Integração Cloudinary (Capa)
    defineField({
      name: 'mainImage',
      title: 'Imagem de Capa (Hero)',
      type: 'cloudinary.asset', // Usa o plugin instalado
      description: 'A foto principal que aparece na listagem e no topo da página.',
      validation: (rule) => rule.required(),
    }),

    // 📸 Integração Cloudinary (Galeria)
    defineField({
      name: 'gallery',
      title: 'Galeria de Fotos',
      type: 'array',
      description: 'Fotos de alta resolução para o slider ou grid.',
      of: [{ type: 'cloudinary.asset' }], // Array de assets do Cloudinary
      options: {
        layout: 'grid',
      },
    }),

    // 📝 Descrição Rica (Negrito, Itálico, Listas)
    defineField({
      name: 'description',
      title: 'Sobre o Projeto',
      type: 'array',
      of: [{ type: 'block' }],
    }),

    // 🏗️ Ficha Técnica (Objeto agrupado)
    defineField({
      name: 'infos',
      title: 'Ficha Técnica',
      type: 'object',
      fields: [
        { name: 'year', title: 'Ano', type: 'number' },
        { name: 'location', title: 'Localização', type: 'string' },
        { name: 'area', title: 'Área (m²)', type: 'number' },
        { name: 'status', title: 'Status', type: 'string', options: {
            list: ['Concluído', 'Em Andamento', 'Conceito']
        }},
      ],
    }),
  ],
})