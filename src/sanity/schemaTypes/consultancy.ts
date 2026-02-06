import { defineField, defineType } from 'sanity'
import React from 'react' // <--- IMPORTANTE: Necessário para renderizar a cor no preview

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
      type: 'cloudinary.asset', // Mantendo sua configuração de Cloudinary
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
          title: 'Cor',
          fields: [
            { 
              name: 'name', 
              title: 'Nome da Cor', 
              type: 'string',
              validation: (rule) => rule.required() 
            },
            { 
              name: 'hex', 
              title: 'Código Hex', 
              type: 'string', 
              validation: (rule) => rule.required().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
                name: 'hex color', // Valida se é um código de cor real
                invert: false
              }).error('Use um formato Hex válido, ex: #B85C38')
            },
          ],
          // A CORREÇÃO VISUAL ESTÁ AQUI:
          // ... resto do código acima ...
          preview: {
            select: {
              title: 'name',
              subtitle: 'hex'
            },
            prepare({ title, subtitle }) {
              return {
                title: title || 'Sem nome',
                subtitle: subtitle || 'Sem cor',
                // Versão compatível com arquivo .ts (sem JSX)
                media: () => React.createElement('div', {
                  style: {
                    backgroundColor: subtitle || '#000',
                    width: '100%',
                    height: '100%',
                    borderRadius: '3px',
                    border: '1px solid rgba(0,0,0,0.1)'
                  }
                }),
              }
            }
          }
          // ... resto do código abaixo ...
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