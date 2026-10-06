# Germaine's portfolio (Astro + React + Tailwind)

Your original site, moved onto Astro. Look and behaviour are the same; the project cards are new.

## Run it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
```

## Where things live

| What | Where |
| --- | --- |
| Page content (hero, about, experience, etc.) | `src/pages/index.astro` |
| Your original CSS, unchanged | `src/styles/site.css` |
| Tailwind setup + colour tokens | `src/styles/global.css` |
| Carousel + recommendations pop-up JS (unchanged) | `public/script.js` |
| Recommendations | `src/data/recommendations.ts` |
| Projects | `src/content/projects/*.md` |
| React components | `src/components/ProjectCard.tsx`, `ProjectGrid.tsx` |
| Case study page template | `src/pages/work/[slug].astro` |
| Meta tags / Open Graph | `src/layouts/Base.astro` |

## Add a project

1. Copy `src/content/projects/_case-study-template.md`, rename it, remove the leading `_`.
2. Fill in the front matter. `outcome` is the one-liner with your result; it shows on the card.
3. Optional: put `thumb.jpg` and a short `loop.mp4` in `public/work/<name>/` and set `thumbnail` / `video`. The video plays on hover (and is skipped when motion is paused).
4. Set `external:` to link out (e.g. Notion) instead of hosting a page.

## Before you publish

- Set `site` in `astro.config.mjs` to your real domain.
- Add `public/og.png` (1200×630) for link previews.
- Fill in the **TODO** lines in `src/content/projects/trading-onboarding-platform.md`.

## Notes

- Tailwind is loaded without its CSS reset (preflight), so it can't change your existing styles. Your `site.css` wins wherever they overlap.
- Fixed from the original: duplicate `id="rec-title"`, unused `.rec-sticker` CSS, stray dot after "PMP certification".
