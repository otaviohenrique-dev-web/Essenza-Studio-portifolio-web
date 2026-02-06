import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'consultancy',
  title: 'Consultorias (Moodboards)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nome da Consultoria',
      type: 'string',
      description: 'Ex: Sala da Ana, Quarto do Bebê Leo',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),

    // 📸 Capa Principal (O "Antes e Depois" ou a melhor foto)
    defineField({
      name: 'mainImage',
      title: 'Imagem de Destaque',
      type: 'cloudinary.asset',
      validation: (rule) => rule.required(),
    }),

    // 🎨 O Diferencial: Paleta de Cores Interativa
    defineField({
      name: 'colorPalette',
      title: 'Paleta de Cores Sugerida',
      type: 'array',
      description: 'Adicione os códigos HEX das cores (Ex: #B85C38)',
      of: [
        {
          type: 'object',
          name: 'color',
          fields: [
            { name: 'name', title: 'Nome da Cor', type: 'string' },
            { 
              name: 'hex', 
              title: 'Código Hex', 
              type: 'string', 
              validation: (rule) => rule.required().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
                name: 'hex color', // Valida se é um código de cor real
                invert: false
              })
            },
          ],
          preview: {
            select: { title: 'name', subtitle: 'hex' },
            prepare({ title, subtitle }) {
              return {
                title: title || subtitle,
                subtitle: subtitle,
                // Truque visual: mostra um quadrado da cor na lista do Sanity
                media: () => null 
              }
            }
          }
        }
      ],
    }),

    // 🖼️ Moodboard (Estilo Pinterest)
    defineField({
      name: 'moodboardImages',
      title: 'Moodboard (Referências)',
      type: 'array',
      of: [{ type: 'cloudinary.asset' }],
      options: { layout: 'grid' },
    }),

    // 📝 O Veredito
    defineField({
      name: 'verdict',
      title: 'Veredito / Defesa do Conceito',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
})