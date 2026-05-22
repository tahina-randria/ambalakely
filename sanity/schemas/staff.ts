import { defineType, defineField } from 'sanity';

export const staff = defineType({
  name: 'staff',
  title: 'Équipe (affichage public)',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'role',
      type: 'localeString',
      description: 'Titre du poste (affichable publiquement)',
    }),
    defineField({ name: 'bio', type: 'localeText' }),
    defineField({ name: 'photo', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'public',
      type: 'boolean',
      initialValue: true,
      description: 'Décocher pour les personnes à ne PAS nommer publiquement (M. Héris, Mme Mamitiana — voir HANDOFF règle 4)',
    }),
    defineField({
      name: 'order',
      type: 'number',
      description: 'Ordre d\'affichage sur /about',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'role.fr', media: 'photo' },
  },
});
