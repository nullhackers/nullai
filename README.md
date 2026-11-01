# NullAI — AI Tools Directory

A responsive React + Vite + Tailwind CSS directory. Built with React Router, Lucide icons, Framer Motion, and connected to the live Render backend API (`https://nullaidb.onrender.com`).

## Run locally

Requires Node.js 20.19+ or 22.12+ (Node 24 recommended).

Create `.env` (or copy from `.env.example`):
```sh
VITE_API_URL=https://nullaidb.onrender.com
```

Install and start dev server:
```sh
npm install
npm run dev
```

## Build and deploy

```sh
npm run build
npm run preview
```

Deploy the `dist/` folder to any static host (e.g. Vercel, Netlify, Cloudflare Pages, GitHub Pages). HashRouter keeps deep links working without server-side rewrite configuration. Ensure `VITE_API_URL` is set in the hosting environment settings.

## Data Source & API

Tool data is served dynamically by the live Render backend API (`https://nullaidb.onrender.com/tools`). The frontend fetches data at runtime via the central API service (`src/services/api.js`) and the `useTools` hook (`src/hooks/useTools.js`). Tool data is fully managed in the backend database.

```json
{
  "id": "your-tool",
  "name": "Your Tool",
  "description": "A concise description.",
  "category": "Design",
  "pricing": "Freemium",
  "website": "https://example.com",
  "model": "Model family",
  "icon": "Sparkles",
  "color": "#b293ed",
  "capabilities": ["Image generation"],
  "featured": false,
  "trending": false,
  "rank": 25,
  "addedAt": "2026-10-07",
  "tags": ["design", "creative"],
  "features": ["Generate images"],
  "useCases": ["Create a moodboard"]
}
```

Categories and capability filters are derived automatically. `icon` is one of the Lucide icon names in the included catalog; unrecognized names fall back to Sparkles. A bounded icon map keeps the bundle lean. Pricing must be `Free`, `Freemium`, or `Paid`. `rank` controls editorial recommendation order; lower is first. Featured listings use `featured: true` (first six displayed). Trending means editorial selection, not live popularity. All tool facts remain in JSON; stats are computed rather than inflated.

Search matches all whitespace-separated query terms across name, description, category, tags, features, model, capabilities, and use cases. Search, category, pricing, capability, saved-only and sort filters compose. Directory-page filters are reflected in the URL. Home filters are local to that section.

## Themes and persistence

On first visit the system theme is respected, with dark as the fallback. Theme and saved IDs persist in localStorage. Storage failures degrade gracefully to in-memory state. Saved tools remain local to this browser; no authentication, server, or analytics is included.

## Accessibility

Semantic navigation, skip link, visible focus, labeled controls, modal focus trapping, Escape dismissal, focus restoration, keyboard navigation, and reduced-motion support. Mobile menu and all filters work at narrow widths.

## Content notes

The 24 included listings are a curated **sample dataset**, not a live-verified directory. Pricing, features, model families, and availability should be checked against official websites before public launch. `addedAt` records sample catalog dates, not product release dates. Icons are symbolic Lucide marks, not official brand logos. There are no invented ratings or usage statistics.

## Before public launch

Verify every listing; set your branding, domain and metadata; check accessibility on your target browsers; add your own privacy/legal policies if you introduce tracking or accounts; and configure hosting security headers. This is a complete static frontend, not a deployed service.

## Tests and standalone preview

Run `npm test` for nine repeatable catalog/filter regression tests. Run `npm run build:preview` to produce the self-contained `nullai-preview.html`.

The build was also interaction-tested in Chromium at 1440px and 390px, including search, combined filters, all sort modes, saved/theme persistence, routes, mobile navigation, empty results, modal dismissal and keyboard focus. No runtime errors or horizontal page overflow were observed in those checks. This does not replace a full cross-browser accessibility audit.
