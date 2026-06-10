# GSAP × Webflow Cloud Challenge — Landing Page

The marketing site for the [CodeTV](https://codetv.dev) hackathon that Webflow and GSAP are running together. It explains the challenge, the stack, the prizes, and points contestants at the official starter template + the one-click Deploy to Webflow Cloud button.

Built with the exact same toolchain contestants use — **Astro**, **GSAP**, and **Webflow Cloud** — so the page itself is a working demo of the brief.

## 🎯 What's on the page

- **Hero** — the elevator pitch + a "Register for the challenge" CTA. Uses GSAP `SplitText` to chunk the headline into characters for a staggered entrance.
- **Challenge** — the three-step brief (clone the starter → animate something real → deploy).
- **Tools** — Astro, GSAP, Webflow, and Webflow Cloud, each with a link out.
- **Prizes** — three winner cards. Each takes home a GSAP swag pack and a Webflow keyboard; first place also gets featured on the CodeTV show.
- **Resources** — six links: starter repo, GSAP cheatsheet, Astro docs, Webflow Cloud docs, CodeTV series, GSAP forums.
- **Final CTAs** — side-by-side: "Explore GSAP" and the official "Deploy to Webflow" badge wired up to the [`webflow-examples/astro-gsap`](https://github.com/webflow-examples/astro-gsap) starter.
- **Navbar + Footer** — Webflow-branded chrome top and bottom.

## 🧱 Stack

| Layer       | Choice                                                                 |
| :---------- | :--------------------------------------------------------------------- |
| Framework   | [Astro 5](https://astro.build) (static output, zero JS by default)     |
| Animation   | [GSAP 3.15](https://gsap.com) — all plugins free, including SplitText  |
| Hosting     | [Webflow Cloud](https://developers.webflow.com/webflow-cloud) (static) |

There's no Cloudflare adapter, no `wrangler.json`, no Node.js runtime. Webflow Cloud picks up the static build via `webflow.json`.

## 📁 Project structure

The structure intentionally mirrors the [contestant starter template](https://github.com/webflow-examples/astro-gsap) — central GSAP entry, one folder per component with matching `.astro` / `.css` / `.js`.

```text
.
├── public/                         ← static assets (favicon, etc.)
├── src/
│   ├── components/
│   │   ├── Navbar/      (.astro + .css)
│   │   ├── Hero/        (.astro + .css + .js)
│   │   ├── Challenge/   (.astro + .css + .js)
│   │   ├── Tools/       (.astro + .css + .js)
│   │   ├── Prizes/      (.astro + .css + .js)
│   │   ├── Resources/   (.astro + .css)
│   │   ├── FinalCTA/    (.astro + .css + .js)
│   │   └── Footer/      (.astro + .css)
│   ├── lib/
│   │   └── gsap.js      ← central GSAP + plugin registration
│   ├── styles/
│   │   └── global.css   ← site-wide tokens
│   └── pages/
│       └── index.astro  ← imports global.css + every section
├── astro.config.mjs
├── webflow.json         ← { "cloud": { "framework": "astro" } }
└── package.json
```

Each component folder follows the same convention as the starter: import the CSS in the `.astro` frontmatter, and import the JS inside a `<script>` block so Astro bundles it as a client-side module.

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

All plugin registration lives in [`src/lib/gsap.js`](src/lib/gsap.js). Right now this page imports `gsap`, `ScrollTrigger`, and `SplitText` — add more plugins there as you need them.

Each section's `.js` file imports from that central entry:

```js
import { gsap, ScrollTrigger } from '../../lib/gsap.js';

gsap.from('.prize-card', {
  opacity: 0,
  y: 40,
  scrollTrigger: { trigger: '.prizes-grid', start: 'top 78%' },
});
```

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

## 🔗 Links

- **Starter for contestants** — [`webflow-examples/astro-gsap`](https://github.com/webflow-examples/astro-gsap)
- **CodeTV** — [codetv.dev/series/webflow-challenges](https://codetv.dev/series/webflow-challenges)
- **GSAP** — [gsap.com](https://gsap.com) · [cheatsheet](https://gsap.com/cheatsheet/) · [forums](https://gsap.com/community/forums/)
- **Astro** — [astro.build](https://astro.build) · [docs](https://docs.astro.build)
- **Webflow Cloud** — [docs](https://developers.webflow.com/webflow-cloud/bring-your-own-app)
