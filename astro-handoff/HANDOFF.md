# Research Portfolio — Astro handoff

Turns the **Research Portfolio** design (option 1B, *Slate & Green*) into a data‑driven Astro site.
The design file (`Research Portfolio.dc.html`) stays the **visual source of truth**; everything editable
lives here as data so future updates are one edit, not a template change.

```
astro-handoff/
└── src/
    ├── styles/tokens.css        ← the whole visual system as CSS variables
    ├── content.config.ts        ← schemas + validation for the JSON below
    └── data/
        ├── profile.json         ← name, role, bio, links, home timeline   (singleton)
        ├── cv.json              ← education / experience / skills          (singleton)
        ├── publications.json    ← collection (one object per paper)
        ├── projects.json        ← collection
        ├── themes.json          ← collection (research themes)
        ├── awards.json          ← collection (CV awards list)
        └── news.json            ← collection (home news)
```

Copy `src/` into your Astro project (merge with your existing `src/`).

---

## 1. Editing content

**Add a paper** → append an object to `publications.json`. Give it a unique `id`.
Bold-author rendering is driven by the `self` field (must match one entry in `authors`).
Leave a link out (or `""`) and the component hides that chip. Set `award` to show a note.

**Add a project** → append to `projects.json`. `award` is optional (`null` = no award note).
Put the image in `public/images/projects/` and point `image` at it (or use `src/assets/` + `<Image>`).

**Awards / news / themes** work the same way — append an object with a unique `id`.

**Profile & CV** are single objects — just edit the fields.

---

## 2. Internationalisation (English main + 日本語 toggle)

Every translatable field is `{ "en": "...", "ja": "..." }`. `ja` is optional and **falls back to `en`**.
Pick the language once per render and resolve with a tiny helper:

```ts
// src/lib/i18n.ts
export type Lang = 'en' | 'ja';
export const t = (field: { en: string; ja?: string }, lang: Lang) =>
  (lang === 'ja' && field.ja) ? field.ja : field.en;
```

Two common approaches in Astro:
- **Route-based** (recommended for SEO): `/` = English, `/ja/` = Japanese. Use `[...lang]` or a `ja/` folder; the nav toggle links to the mirror route.
- **Client toggle**: store `lang` in `localStorage`, swap text with a small script (no extra routes).

---

## 3. Reading the data in a page

```astro
---
// src/pages/publications.astro
import { getCollection } from 'astro:content';
import profile from '../data/profile.json';
import { t, type Lang } from '../lib/i18n';

const lang: Lang = 'en';
const pubs = (await getCollection('publications')).map(e => e.data)
  .sort((a, b) => b.year - a.year);
const byYear = Object.groupBy(pubs, p => p.year);   // group for the year headers
---
{Object.entries(byYear).reverse().map(([year, items]) => (
  <section>
    <h2 class="mono-label">{year}</h2>
    {items.map(p => (
      <article>
        <p class="mono-label">{p.venue.short} · {p.venue.type}</p>
        <a href={p.links.doi || p.links.pdf}>{t(p.title, lang)}</a>
        <p>{p.authors.map(a => a === p.self ? <strong>{a}</strong> : a)
             .reduce((acc, x) => acc.length ? [...acc, ', ', x] : [x], [])}</p>
        {p.links.pdf  && <a href={p.links.pdf}>PDF</a>}
        {p.links.doi  && <a href={p.links.doi}>DOI</a>}
        {p.links.video&& <a href={p.links.video}>Video</a>}
        {p.award && <p class="award">{p.award}</p>}
      </article>
    ))}
  </section>
))}
```

---

## 4. Design → data → page map

| Page | Data used |
|------|-----------|
| **Home** `/` | `profile` (hero, bio, timeline) · `publications` (recent 3) · `news` |
| **Research** `/research` | `themes` (detail cards) · `projects` (grid, with `award` note) — split by `category`: `research` grid, then a **Personal / Side projects** section for `personal` (fan) items |
| **Publications** `/publications` | `publications`, grouped by `year`, filtered by `venue.type` |
| **CV** `/cv` | `profile` + `cv` (research interests, keywords, education, appointments, service, honors, skills, exhibitions) · `publications` (rendered from its collection — not duplicated in `cv.json`) |
| **Contact** `/contact` | `profile.email`, `profile.links`, `profile.location` |

> Note: the **Selected research** block was removed from Home — theme detail lands on `/research`
> and grows there over time. Awards live in the CV list + as inline notes on projects/papers
> (no separate Awards page).

---

## 5. Styling

Tokens come in three interchangeable forms — `tokens.css` (CSS variables), `tokens.json`, and
`tokens.ts` (typed). Import `tokens.css` once in your base layout and build components with the
CSS variables (`var(--color-accent)`, `var(--space-xl)`, …), or import `tokens.ts` for inline
styles. The design uses inline styles for preview streaming;
in Astro, move those to scoped `<style>` per component but keep the **same token values** so the
look matches 1:1. Type scale, spacing (8px grid), radius, and the mobile rules (≤640px → 1 column,
hamburger nav, 44px tap targets, 20px gutters) are all encoded in `tokens.css`.

Fonts (add to `<head>`): Hanken Grotesk · IBM Plex Mono · Noto Sans JP (Google Fonts).
