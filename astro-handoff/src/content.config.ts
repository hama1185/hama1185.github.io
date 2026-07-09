// src/content.config.ts — Astro 5 Content Layer
// Validates the JSON data files and gives you typed, autocompleted content.
// Usage in a page:  import { getCollection, getEntry } from 'astro:content';
import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

// Localised string: English required, Japanese optional (falls back to en).
const i18n = z.object({ en: z.string(), ja: z.string().optional() });

const publications = defineCollection({
  loader: file('src/data/publications.json'),
  schema: z.object({
    year: z.number(),
    venue: z.object({
      short: z.string(),
      type: z.enum(['conference', 'journal', 'domestic', 'poster']),
    }),
    title: i18n,
    authors: z.array(z.string()),
    self: z.string(),                 // author string to render in bold
    links: z.object({
      pdf: z.string().optional(),
      doi: z.string().optional(),
      video: z.string().optional(),
    }).partial(),
    award: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: file('src/data/projects.json'),
  schema: z.object({
    category: z.enum(['research', 'personal']).default('research'),  // "personal" = fan / side projects
    year: z.number(),
    tag: z.string(),
    title: i18n,
    description: i18n,
    award: i18n.nullable().optional(),
    image: z.string().optional(),
  }),
});

const themes = defineCollection({
  loader: file('src/data/themes.json'),
  schema: z.object({ title: i18n, description: i18n, stats: i18n.optional() }),
});

const awards = defineCollection({
  loader: file('src/data/awards.json'),
  schema: z.object({ year: z.number(), label: i18n }),
});

const news = defineCollection({
  loader: file('src/data/news.json'),
  schema: z.object({ date: z.string(), text: i18n }),
});

export const collections = { publications, projects, themes, awards, news };

// profile.json and cv.json are singletons, not collections — import them directly:
//   import profile from '../data/profile.json';
//   import cv from '../data/cv.json';
