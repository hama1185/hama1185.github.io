# Page templates — Astro

Five ready-to-implement pages built on the *Slate & Green* design system. Calm, content-first,
data-driven, responsive (PC + mobile), and structured to scale as publications/projects grow.

## Run

```bash
cd astro-handoff
npm install
npm run dev
```

Set `site` / `base` in `astro.config.mjs` for GitHub Pages before `npm run build`.

## Structure

```
src/
├── styles/tokens.css        design tokens (imported once by Base)
├── lib/
│   ├── i18n.ts              t(field, lang) + withBase(path)
│   └── site.ts              wordmark, nav items, UI strings
├── layouts/Base.astro       <head>, fonts, Nav, Footer, container
├── components/
│   ├── Nav.astro            desktop links + mobile hamburger (<details>, no JS)
│   ├── Footer.astro
│   ├── Button.astro         primary | secondary | ghost
│   ├── Tag.astro            pill / chip
│   ├── Section.astro        labelled 2-col section (→ 1-col on mobile)
│   ├── ThemeCard.astro      compact | detail
│   ├── ProjectCard.astro    image + tag + award note
│   ├── PublicationItem.astro  full | compact
│   ├── PublicationList.astro   grouped by year + client-side type filter; `limit` for recent
│   └── Placeholder.astro    striped image slot (swap for <Image>)
├── data/                    ← EDIT THESE (see HANDOFF.md)
└── pages/
    ├── index.astro          Home  — hero · about/timeline · recent pubs · news
    ├── research.astro       Research — theme cards · projects · personal/side projects
    ├── publications.astro   Publications — filterable, grouped by year
    ├── cv.astro             CV — Research Interests → … → Exhibitions
    └── contact.astro        Contact — details + form
```

## Component decomposition

Every repeating unit is its own component with a `variant` where useful, so a page is just data
+ composition. To restyle one element type, edit one component; to add content, edit one data file.

## Responsive

Single source of truth in `tokens.css` (gutters, type scale downshift at ≤640px). Breakpoints:
- **≤900px** — multi-column feeds collapse to one column; project grids 3→2.
- **≤640px** — grids → 1 column, nav → hamburger sheet (44px targets), publication rows stack
  (venue moves above title), hero portrait moves on top, page gutter 20px.

## Scaling

- **Publications**: add objects to `publications.json`; the list auto-groups by year and the venue
  filter picks up new `type`s. Home shows only the 3 most recent (`limit={3}`).
- **Projects**: add to `projects.json`; `category: "personal"` routes an item to the
  Personal / Side projects section. When those grow, promote to a `/projects` page — same data.
- **CV**: publications render from the publications collection (not duplicated); other sections are
  arrays in `cv.json` that extend freely.

## i18n (English default + 日本語)

All copy is `{ en, ja }`; `t(field, lang)` resolves with English fallback. Pages set `const lang`.
To ship both languages, either mirror pages under `src/pages/ja/` (pass `lang="ja"`), or wire the
`.lang` toggle in `Nav.astro` to your routing. The toggle is present but left inert in the template.

## Notes

- Content Collections config (`src/content.config.ts`) is included for optional schema validation;
  the templates import JSON directly for zero-config reliability. Either approach works.
- Real images: drop files in `public/images/…`, set `image` in the data, and `Placeholder`
  renders them; switch to `astro:assets` `<Image>` for optimisation.
