// src/lib/i18n.ts — tiny i18n helper for English (default) + Japanese.
export type Lang = 'en' | 'ja';

export type I18n = { en: string; ja?: string };

/** Resolve a localised field; falls back to English when `ja` is missing. */
export const t = (field: I18n | string, lang: Lang = 'en'): string =>
  typeof field === 'string' ? field : (lang === 'ja' && field.ja ? field.ja : field.en);

/** Prefix a path with the configured site base (for GitHub Pages sub-paths). */
export const withBase = (path: string): string =>
  (import.meta.env.BASE_URL + path).replace(/\/{2,}/g, '/');

const normalizePath = (path: string): string => {
  const merged = path.replace(/\/{2,}/g, '/').replace(/\/+$/g, '');
  if (!merged) return '/';
  return merged.startsWith('/') ? merged : `/${merged}`;
};

/** Map a site path (without base) to its counterpart in `target`, e.g. /research → /ja/research. */
export const localizePath = (path: string, target: Lang): string => {
  const normalized = normalizePath(path);
  if (target === 'ja') {
    if (normalized === '/ja' || normalized.startsWith('/ja/')) return normalized;
    return normalized === '/' ? '/ja' : `/ja${normalized}`;
  }
  const stripped = normalized.replace(/^\/ja(?=\/|$)/, '');
  return stripped || '/';
};

const basePath = normalizePath(import.meta.env.BASE_URL || '/').replace(/\/$/, '');

/** Remove the configured site base from a URL pathname. */
export const stripBase = (pathname: string): string => {
  const normalized = normalizePath(pathname);
  if (!basePath || basePath === '/') return normalized;
  if (!normalized.startsWith(basePath)) return normalized;
  return normalizePath(normalized.slice(basePath.length) || '/');
};
