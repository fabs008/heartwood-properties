# Heartwood Properties: website concept

A property-first, single-page site for Heartwood Properties, built from their own renders, photography, copy and brand colours (black, white and yellow #FCE600).

## Run it

```bash
npm install
npm run dev       # local dev server
npm run build     # production build in dist/
npm run preview   # serve the production build
```

## Page structure

| Section | File | What it does |
| --- | --- | --- |
| Hero showcase | `src/components/Hero.jsx` | Full-screen crossfading renders of the current developments, revealed through opening louvres. Click the bars to jump between them. |
| Developments | `src/components/Developments.jsx` | One full-screen "chapter" per development. The image expands to full-bleed as you scroll, then shows specs, features, a gallery lightbox and an enquiry button. |
| Location | `src/components/Place.jsx` | The Paardevlei precinct and nearby amenities. |
| Ownership model | `src/components/Model.jsx` | Interactive 10-year lease → shareholding → ownership, drawn as a building filling floor by floor. |
| Track record | `src/components/Place.jsx` | Horizontal gallery of every completed building, 2011 to 2026. |
| Objectives, board, investors, contact, footer | `src/components/Sections.jsx` | The contact form opens a pre-filled email (no backend needed). |
| All copy, specs and image paths | `src/data.js` | Edit here. |

Images live in `public/img/` as WebP. They were downloaded from heartwoodproperties.co.za and resized.

## Before launch

- Confirm the specs and status of each development with the client (they change often).
- Quartz Hill and Sunvlei have no public images or details yet, so they get a one-line mention.
- Swap the email-based contact form for a real form handler if they want submissions logged.
