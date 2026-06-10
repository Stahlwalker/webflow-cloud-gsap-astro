# Webflow × GSAP × CodeTV Challenge — Landing Page

The marketing site for the [CodeTV](https://codetv.dev) hackathon that Webflow and GSAP are running together. It explains the two-path brief (ship an app or ship a site), the stack, the prizes, and points contestants at the official starter template + the one-click Deploy to Webflow Cloud button.

Built with the exact same toolchain contestants use — **Astro**, **GSAP**, and **Webflow Cloud** — so the page itself is a working demo of the brief.

## 🎯 What's on the page

- **Navbar** — Webflow + GSAP wordmarks, primary section links, Submit CTA. Collapses into a GSAP-animated hamburger menu on mobile.
- **Hero** — Headline ("Animate the Web. Deploy in One Click."), CodeTV eyebrow tag, lede, and a 4-cell meta grid (Sponsors, Build with, Winners, Grand Prize). The `$5,000` value counts up + flashes green when the meta scrolls into view.
- **Episode** — Two-column section that pairs a sticky StatusCallout (status, deadline, sponsors, "Submit your app" CTA) with the embedded CodeTV YouTube episode.
- **Challenge** — The two-path brief. **Path A: Ship an App** uses Astro + GSAP on Webflow Cloud; the first step exposes a blue terminal block with `git clone …` and a copy button, and the last step shows a real "Deploy to Webflow" button. **Path B: Ship a Site** uses Webflow + custom code embeds. GSAP animates the title chars, the steps, and the deploy badge.
- **Tools** — Blueprint-style illustration cards for Webflow, GSAP, and Astro. Each card has a custom SVG drawn on with `stroke-dashoffset` (the same effect DrawSVGPlugin gives, hand-rolled here so the page stays plugin-light). Astro card has a soft pink glow + "Webflow is a proud sponsor of Astro" attribution.
- **Prizes** — One compact card with the keyboard photo on the left and a green Grand Prize callout on the right (`$5,000` counts up). The keyboard idle-floats, tilts on mouse-move, and clicking opens a full-screen lightbox where you can shuffle between the two keyboard photos with arrows, dots, or arrow keys.
- **Resources** — Six dev-doc style cards linking out to the starter repo, GSAP cheatsheet, Astro docs, Webflow Cloud docs, CodeTV series, and the GSAP forums.
- **Final CTAs** — Two cards side-by-side. Hover sets off a brand-coloured **dot sparkle** grid: green dots on the GSAP card, blue dots on the Webflow card. Each dot twinkles with a sine-based delay so the field shimmers rather than pulsing in unison.
- **Footer** — Webflow + GSAP wordmark lockup, repo links, deploy stamp.

## 🧱 Stack

| Layer       | Choice                                                                       |
| :---------- | :--------------------------------------------------------------------------- |
| Framework   | [Astro 5](https://astro.build) (static output, zero JS by default)           |
| Animation   | [GSAP 3.15](https://gsap.com) — `gsap`, `ScrollTrigger`, `SplitText`         |
| Hosting     | [Webflow Cloud](https://developers.webflow.com/webflow-cloud) (static build) |
| Fonts       | Webflow Visual Sans (display + Text optical sizes via `@font-face`)          |

There's no Cloudflare adapter, no `wrangler.json`, no Node.js runtime. Webflow Cloud picks up the static build via `webflow.json`.

## 📁 Project structure

The structure intentionally mirrors the [contestant starter template](https://github.com/webflow-examples/astro-gsap): a central GSAP entry, one folder per component with matching `.astro` / `.css` / `.js`.

```text
.
├── public/
│   ├── brand/
│   │   ├── fonts/                ← Webflow Visual Sans TTFs
│   │   └── logos/                ← Webflow + GSAP + Astro logo files
│   └── images/                   ← keyboard photos
├── docs/
│   └── brand-guidelines.md       ← per-brand do's/don'ts + palettes
├── src/
│   ├── components/
│   │   ├── Navbar/      (.astro + .css + .js)
│   │   ├── Hero/        (.astro + .css + .js)
│   │   ├── Episode/     (.astro + .css)
│   │   ├── StatusCallout/ (.astro + .css)
│   │   ├── Challenge/   (.astro + .css + .js)
│   │   ├── Tools/       (.astro + .css + .js)
│   │   ├── Prizes/      (.astro + .css + .js)
│   │   ├── Resources/   (.astro + .css)
│   │   ├── FinalCTA/    (.astro + .css)
│   │   └── Footer/      (.astro + .css)
│   ├── lib/
│   │   └── gsap.js               ← central GSAP + plugin registration
│   ├── styles/
│   │   └── global.css            ← tokens, fonts, eyebrow, button primitives
│   └── pages/
│       └── index.astro           ← imports global.css + composes every section
├── astro.config.mjs
├── webflow.json                  ← { "cloud": { "framework": "astro" } }
└── package.json
```

Each component folder follows the starter convention: import the CSS in the `.astro` frontmatter, and import the JS inside a `<script>` block so Astro bundles it as a client-side module.

```astro
---
import './Hero.css';
---

<section class="hero">…</section>

<script>
  import './Hero.js';
</script>
```

## 🎬 GSAP usage

All plugin registration lives in [`src/lib/gsap.js`](src/lib/gsap.js) — `gsap`, `ScrollTrigger`, and `SplitText` are registered once and re-exported. Add more plugins there as you need them.

Each component imports what it needs from that central entry:

```js
import { gsap, ScrollTrigger, SplitText } from '../../lib/gsap.js';
```

Effects worth noting:

- **`SplitText`** — used on the hero title (loads on `document.fonts.ready` so the chars don't reflow) and the challenge title (scroll-triggered chars tumble).
- **`ScrollTrigger`** — used everywhere for scroll-in entrances. `start: 'top 80%'` is the common threshold; titles pre-`gsap.set()` their hidden state so nothing flashes before the trigger fires.
- **Count-ups** — the hero `$5,000`, the prizes Grand Prize `$5,000`, and the `× 03 Winners` chip animate via `gsap.to({ val: ... })` with an `onUpdate` that formats the integer back into the DOM.
- **Hand-rolled draw-on** — the Tools section measures `getTotalLength()` on each `.tools-stroke` and animates `strokeDashoffset` to 0, which is the same effect DrawSVGPlugin gives without needing the plugin.
- **Typewriter** — the challenge code terminal types out `$ git clone …` character-by-character with a blinking caret, then locks in the final string + a working "Copy" button.
- **Idle motion** — the keyboard in Prizes has a continuous sine float + glow breath; mouse-move on the figure adds a 3D tilt; click opens a lightbox with GSAP-driven entrance/exit.
- **Dot sparkle** — the Final CTA cards generate a deterministic SVG dot grid in the Astro frontmatter; on hover, CSS keyframes twinkle each dot at a sine-derived per-dot delay.

## 🎨 Brand

The site uses three brands with different rules — Webflow is the strictest (no rotation, no recoloring, no effects on the logo), GSAP is the loosest, Astro protects its full-colour logo. Full per-brand do's/don'ts, palettes, and source links live in [`docs/brand-guidelines.md`](docs/brand-guidelines.md).

Tokens live in `src/styles/global.css`:

```css
--color-webflow: #146EF5;
--gsap-green: #0AE448;
/* + lime, lavender, cyan, orange, pink, magenta, cream */
--font-display: 'WF Visual Sans', …;
--font-sans:    'WF Visual Sans Text', …;
--font-mono:    ui-monospace, …;
```

Section eyebrows use a single dev-doc treatment: short green mono-uppercase label with a leading horizontal accent line (`.eyebrow` in global.css). No glassy pills, no glowing dots.

## 📱 Mobile

The whole page is responsive at three main breakpoints (960px / 720px / 560px), with extra polish at 440px and 420px for narrow phones.

- The navbar swaps in a GSAP-animated hamburger menu at ≤720px (links + Submit CTA, body scroll locked while open).
- Multi-column grids collapse predictably (3→2→1 or 2→1).
- The Prizes lightbox shrinks its controls and adds inline padding at ≤480px so the arrow buttons don't overlap the image.
- The challenge terminal command wraps gracefully on narrow widths via `overflow-wrap: anywhere`.

## 🧞 Commands

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Install dependencies                         |
| `npm run dev`     | Start the dev server at `localhost:4321`     |
| `npm run build`   | Build the static site to `./dist/`           |
| `npm run preview` | Preview the production build locally         |
| `npm run deploy`  | Deploy to Webflow Cloud via the Webflow CLI  |

## 🚀 Deploying to Webflow Cloud

This repo is configured to be picked up by Webflow Cloud's Astro framework support:

1. Push to GitHub (already wired up).
2. From the Webflow dashboard, create a new Cloud project and connect this repo.
3. Webflow Cloud builds it as a static Astro site and serves it at your chosen domain or path. Root-domain hosting is supported, so no `base` path placeholder is needed.

## ✏️ Customizing for your own challenge

The most common things you'll want to change:

| File                                          | What to change                                                          |
| :-------------------------------------------- | :---------------------------------------------------------------------- |
| `src/components/Hero/Hero.astro`              | Headline, meta grid (sponsors, prize, deadline)                         |
| `src/components/StatusCallout/StatusCallout.astro` | `submitUrl`, `deadline`, `status`, sponsor logos                   |
| `src/components/Episode/Episode.astro`        | YouTube `videoId`                                                       |
| `src/components/Challenge/Challenge.astro`    | Step copy, deploy URL, starter repo URL in the terminal `data-copy`     |
| `src/components/Prizes/Prizes.astro`          | Grand prize amount, keyboard gallery `src`s                             |
| `src/pages/index.astro`                       | `<title>`, meta description, og tags, favicon                           |
| `public/brand/logos/` + `public/images/`      | Brand assets and product photos                                         |

The `$5,000` value appears in three places: hero meta, prizes lede + grand prize card, and Hero.js / Prizes.js count-up targets. Search for `5000` if you change it.

## 🔗 Links

- **Starter for contestants** — [`webflow-examples/astro-gsap`](https://github.com/webflow-examples/astro-gsap)
- **CodeTV** — [codetv.dev/series/webflow-challenges](https://codetv.dev/series/webflow-challenges)
- **GSAP** — [gsap.com](https://gsap.com) · [docs](https://gsap.com/docs/v3/Installation) · [cheatsheet](https://gsap.com/cheatsheet/) · [forums](https://gsap.com/community/forums/)
- **Astro** — [astro.build](https://astro.build) · [docs](https://docs.astro.build)
- **Webflow Cloud** — [docs](https://developers.webflow.com/webflow-cloud/bring-your-own-app)
