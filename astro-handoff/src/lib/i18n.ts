// src/lib/i18n.ts — tiny i18n helper for English (default) + Japanese.
export type Lang = 'en' | 'ja';

export type I18n = { en: string; ja?: string };

/** Resolve a localised field; falls back to English when `ja` is missing. */
export const t = (field: I18n | string, lang: Lang = 'en'): string =>
  typeof field === 'string' ? field : (lang === 'ja' && field.ja ? field.ja : field.en);

/** Prefix a path with the configured site base (for GitHub Pages sub-paths). */
export const withBase = (path: string): string =>
  (import.meta.env.BASE_URL + path).replace(/\/{2,}/g, '/');
