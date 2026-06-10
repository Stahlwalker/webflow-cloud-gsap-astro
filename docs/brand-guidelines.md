# Brand guidelines

The site is co-branded for the GSAP × Webflow Cloud Challenge. The two brands have **different rules** — apply the rules of whichever brand is foregrounded in the asset you're designing.

## Official sources

| Brand | Brand resources |
| :---- | :-------------- |
| GSAP | [gsap.com/brand](https://gsap.com/brand/) |
| Astro | [astro.build/press](https://astro.build/press/) |
| Webflow | [brand-at.webflow.io/brand-assets](https://brand-at.webflow.io/brand-assets) |

## Webflow

Source: [brand-at.webflow.io/brand-assets](https://brand-at.webflow.io/brand-assets) — Webflow brand book (June 2026).

> Each asset should include **black, white, and one color**. Choose whichever color works best for the wider context, but only choose one.

This applies to every individual visual asset on the site: a hero, a section header, a card, an illustration, an image backdrop. "One color" means one accent from the brand palette (Webflow blue `#146EF5`). Mixing colors within a single Webflow-themed asset is off-brand.

### Primary palette

| Hex | Name | Use |
| :-- | :--- | :--- |
| `#146EF5` | **Webflow Blue** | Primary brand color. The "one color" on any Webflow-led asset. Used as the accent for primary CTAs, the Webflow Mark, and brand glows. |
| `#080808` | **Black** | Backgrounds, dense surfaces. |
| `#FFFFFF` | **White** | Text on dark, mark on dark, foreground. |

### Grayscale

A nine-step ramp. Use these for neutral surfaces, dividers, muted text, and component layering — pick the step that lands you the right contrast against your background.

| Step | Hex | Typical use |
| :--- | :-- | :--- |
| Gray 900 | `#171717` | Elevated surface on Black, card body |
| Gray 800 | `#222222` | Card surface, raised tile |
| Gray 700 | `#363636` | Subtle divider on dark |
| Gray 600 | `#5A5A5A` | Muted UI text on dark |
| Gray 500 | `#757575` | Mid neutral |
| Gray 400 | `#898989` | — |
| Gray 300 | `#ABABAB` | Quiet UI text on light |
| Gray 200 | `#D8D8D8` | Light divider, subtle border on light |
| Gray 100 | `#F0F0F0` | Lightest neutral surface |

**Where these live in the codebase**

`src/styles/global.css` exposes the full Webflow palette as CSS custom properties:

```css
--wf-black: #080808;
--wf-white: #ffffff;
--wf-gray-900 ... --wf-gray-100;   /* full 9-step ramp */
--color-webflow: #146ef5;          /* Webflow Blue */
```

The site's neutral tokens (`--color-bg`, `--color-bg-elev`, `--color-surface`, `--color-text`) all reference these directly — no off-palette greys.

### Secondary palette

> All other colors should be used strategically and with an even distribution of preference.

These are not the "one color" on a Webflow asset — they're available for occasional accenting (illustrations, charts, status indicators). One-color-per-asset still applies.

| Hex | Name |
| :-- | :--- |
| `#7A3DFF` | Purple |
| `#ED52CB` | Pink |
| `#EE1D36` | Red |
| `#FF6B00` | Orange |
| `#00D722` | Green |
| `#FFAE13` | Yellow |

## GSAP

Source: [gsap.com/brand](https://gsap.com/brand/) — colors and gradients (June 2026).

GSAP is the looser of the two — **multiple palette colors and gradients are explicitly allowed**.

### Solid palette

| Hex | Name | Where |
| :-- | :--- | :--- |
| `#0ae448` | **GSAP green** | Primary brand green. Same color used in the wordmark. |
| `#9d95ff` | Lavender | Secondary |
| `#abff84` | Light lime | Secondary |
| `#00bae2` | Cyan | Secondary |
| `#ff8709` | Orange | Secondary |
| `#fec5fb` | Pale pink | Secondary |
| `#f100cb` | Magenta | Secondary |
| `#fffce1` | Cream | Light neutral — same as `gsap-wordmark-cream.svg` |

### Gradients

GSAP's brand book explicitly shows gradient swatches (lime/green, green/teal, orange/cream, lavender/blue, blue/violet, pink/magenta, deep blue, pale blue). Two-stop gradients between any palette colors are on-brand.

## When to use which set

| Surface | Treatment |
| :------ | :-------- |
| Webflow-led asset (Webflow logo, "Deploy to Webflow" CTA, Webflow Cloud section) | Webflow rules: black/white + one color, no gradients, no colored text |
| GSAP-led asset (GSAP wordmark, GSAP CTA, animation showcase) | GSAP rules: any palette color, gradients allowed |
| Co-branded shell (navbar, footer, body type) | Stay neutral — black/white only, no colored accents |
| Generic chrome (cards, dividers, eyebrows, section headers) | Default to Webflow's stricter rule — one color per asset — so the page reads consistent |

## Astro

Source: [astro.build/press](https://astro.build/press/) — Astro brand guidelines (June 2026).

### ✅ How to use the Astro logo

- Link to Astro's website or GitHub repository
- Show your product has built-in Astro support
- Use in blog posts or videos about Astro

### ❌ Things to avoid

- Don't use the Astro logo for your app or website's icon
- Don't include the Astro logo in your own logo
- Don't modify the Astro logo or change its colors
- Don't sell products featuring the Astro logo without permission
- **Don't use Houston** (Astro's mascot) in your own materials

### Logo version

The Astro logo was refreshed in 2023. We use the current version — `astro-icon-light-gradient.svg` — in `public/brand/logos/`.

### Spacing & minimum size

- Maintain clear space around the logo equal to the height of the icon's "A".
- **Minimum size: 24px tall** in digital, 1/8" in print. Our Tools card icon renders at ~28px ✓.

### Where it appears in this site

- **Tools section, Astro card** — official gradient icon links to [astro.build](https://astro.build). Allowed use (indicates the project uses Astro). Unmodified, sized above the 24px minimum.
- **Favicon** — *was* the Astro logo by default from the scaffold, which is a violation of "don't use the Astro logo as your app or website icon." **Replaced** with the Webflow Mark (`/brand/logos/Mark_Logo_Blue.svg`) and the old `favicon.svg` + `favicon.ico` were deleted.

## ✅ Do's

- Use **black, white, and one color** in any given asset.
- Pick the accent color based on the wider context — usually the brand being elevated in that asset.
- Keep text in **black or white**. Reserve color for graphic elements (shapes, marks, backdrops, buttons).
- Treat each card / section header / illustration as its own asset — different sections of the page can use different accent colors as long as each individual asset stays monochromatic + one.

## ❌ Don'ts

| # | Rule | Example |
| :-- | :--- | :--- |
| 1 | Don't use multiple colors in a single illustration | A target reticle with a green inner ring and a blue outer ring |
| 2 | Don't use colors for text | A headline in solid green |
| 3 | Don't use multiple colors in a contiguous line | A horizontal divider where half is blue and half is dark grey |
| 4 | Don't create gradients | A blue-to-green sweep across a surface |
| 5 | Don't pair floods of color | A blue flood block stacked directly on a green flood block |

## How this site applies the rules

Each section is treated as its own asset. The accent color is picked based on what's being foregrounded:

| Section | Accent | Notes |
| :------ | :----- | :---- |
| **Navbar** | Neutral (white on dark) | Just the Webflow mark + wordmark text. No flooded color. |
| **Hero** | Webflow blue | Single blue ambient orb behind the headline. Accent line of the headline reads in white — no gradient, no green. |
| **Challenge** | GSAP green | The brief is the GSAP-flavored creative challenge. Step numbers and any accent emphasis are white. |
| **Tools** | Card-by-card | Each tool card is its own asset, using that tool's own brand color (Astro orange, GSAP green, Webflow blue). No card mixes colors. |
| **Prizes** | GSAP green | Showcase image backdrop is a single green ambient glow. First-place card uses a green-tinted accent. Rank numbers stay white. |
| **Resources** | Neutral | No accent color, just type and surface. Tag labels are muted white, not green. |
| **Final CTA** | Card-by-card | GSAP card = green; Webflow / Deploy card = blue. Each card is its own asset → one color each. |
| **Footer** | Neutral | Mark + wordmark + nav. No accent flood. |

## Logos

- **Webflow Mark** — use the white version (`Mark_Logo_White.svg`) on dark surfaces; blue (`Mark_Logo_Blue.svg`) when the surface is already light enough to show it. Never tint the mark.
- **Webflow Full Logo** — use `Full_Logo_Blue_White.svg` on dark surfaces (mark = blue, wordmark = white). This counts as "one color" because the wordmark is white.
- **GSAP wordmark** — three official treatments live in `public/brand/logos/`:
  - `gsap-wordmark-green.svg` — brand green `#0ae448`, use on dark
  - `gsap-wordmark-black.svg` — use on light
  - `gsap-wordmark-cream.svg` — use when a neutral-on-dark is needed
  - Never recolor or apply effects to the wordmark.

## What changed in the codebase to follow these rules

The first pass of the site had a few violations against this guidance. They were corrected in the same commit that added this doc:

- **Hero accent headline** — was a green→blue gradient on the text. Replaced with solid white (rule 2 + rule 4).
- **Hero background orbs** — had a green orb + a blue orb behind the headline. Removed the green one; only the blue orb remains (rule 5).
- **Prizes showcase backdrop** — was a mixed green + blue radial glow behind the keyboard image. Reduced to a single green glow (rule 4 + rule 5).
- **Colored emphasis text** — `<em>` words inside the Challenge and Prizes section titles were green. Now plain white with italic emphasis only (rule 2).
- **Step numbers** in the Challenge list, **tag labels** in Resources, and **rank numbers** in Prizes were colored. All now white / muted (rule 2).
