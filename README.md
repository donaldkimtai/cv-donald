<div align="center">

# Donald Kimtai · Portfolio

**Security Consultant · Web Application & API Security Researcher**
Nairobi, Kenya

[![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-7-646cff?logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Sanity](https://img.shields.io/badge/CMS-Sanity-f03e2f?logo=sanity&logoColor=white)](https://www.sanity.io)
[![License](https://img.shields.io/badge/License-MIT-00ff9c)](#license)

</div>

> _"Security is not a checklist — it's a mindset."_

A modern, content-driven portfolio for Donald Kimtai's cybersecurity practice — pentesting, secure code review, cloud hardening, and security awareness. Built as a static SPA with a headless **Sanity** CMS so content (projects, posts, experience, certifications) can be edited without redeploying.

---

## Live

Replace these once deployed:
- **Site:** _coming soon — Vercel preview_
- **Studio:** _coming soon — `https://your-project.sanity.studio`_

## Highlights

- **Cyber-themed dark UI** — matrix-green accents on a near-black canvas with `Space Grotesk` / `DM Sans` typography
- **Multi-page**, fully responsive — sticky navbar with a mobile drawer
- **Headless CMS** — Sanity Studio bundled in `./sanity/` with 8 schemas
- **Graceful fallback** — every page renders without a Sanity project; static data ships in the bundle
- **Portable Text** rendering for blog posts (headings, code blocks, images, links, blockquotes)
- **Contact form** — Formspree-backed, with honeypot anti-spam
- **Hardened deploy** — strict CSP, HSTS, Referrer-Policy, Permissions-Policy via `vercel.json`
- **Tiny bundle** — code-split per route, lazy-loaded pages, vendor chunked

## Pages

| Route          | Purpose |
|----------------|---------|
| `/`            | Hero, services, featured projects, latest posts, CTA |
| `/about`       | Bio, philosophy, skills matrix, experience, education, certifications |
| `/projects`    | All projects with tag-based filtering |
| `/blog`        | All posts with category filtering |
| `/blog/:slug`  | Single post rendered from Sanity Portable Text |
| `/contact`     | Contact form (Formspree) + direct channels & socials |
| `*`            | Custom 404 |

## Tech stack

| Layer        | Choice |
|--------------|--------|
| Framework    | React 19 + Vite 7 |
| Language     | TypeScript 5.9 (strict) |
| Styling      | Tailwind CSS v4 (CSS-first config) |
| Routing      | `react-router-dom` 7 |
| CMS          | Sanity (`@sanity/client`, `@sanity/image-url`, `@portabletext/react`) |
| Icons        | `lucide-react` |
| Animation    | `motion` |
| Analytics    | `@vercel/analytics` |
| Forms        | Formspree |
| Hosting      | Vercel |

---

## Quick start

```bash
git clone https://github.com/donaldkimtai/cv-donald.git
cd cv-donald
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). The site renders with bundled fallback data — you don't need Sanity configured to see every page.

## Environment

Copy the template and fill in (or skip — the site falls back to static data):

```bash
cp .env.local.example .env.local
```

```ini
# .env.local
VITE_SANITY_PROJECT_ID=
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-10-01
```

> When `VITE_SANITY_PROJECT_ID` is empty, every GROQ query short-circuits to the data in [`src/data/profile.ts`](src/data/profile.ts). Useful while you're iterating on UI before the CMS is set up.

## Scripts

```bash
npm run dev            # Vite dev server with HMR
npm run build          # tsc -b && vite build
npm run preview        # Preview the production build
npm run lint           # ESLint (react-hooks, react-refresh, typescript-eslint)
npm run sanity:dev     # Run the Studio locally (port 3333)
npm run sanity:build   # Build the Studio
npm run sanity:deploy  # Deploy to <project>.sanity.studio
```

---

## Sanity setup

The Studio is a **separate workspace** in `./sanity/` (with its own `package.json` pinned to React 18 + Sanity v3) so it doesn't pollute the frontend's dependency tree.

```bash
# 1. Create a Sanity project (one-off)
npx sanity@latest login
npx sanity@latest init --bare       # note the projectId it prints

# 2. Configure the Studio
cd sanity
npm install
export SANITY_STUDIO_PROJECT_ID=your-project-id
export SANITY_STUDIO_DATASET=production

# 3. Run / deploy
npx sanity dev                       # http://localhost:3333
npx sanity deploy                    # hosted Studio
```

Then set `VITE_SANITY_PROJECT_ID` in `.env.local` (and your Vercel project) and the frontend automatically reads from Sanity instead of the fallback.

### Content model

| Document        | Fields (highlights) |
|-----------------|---------------------|
| `profile`       | name, role, tagline, location, email, bio[], philosophy, avatar, resumeUrl, socials[] |
| `skill`         | category, items[], order |
| `experience`    | role, company, location, startDate, endDate, current, bullets[] |
| `education`     | degree, institution, startDate, endDate, description |
| `certification` | name, issuer, issueDate, url |
| `project`       | title, slug, excerpt, image, tags[], technologies[], liveUrl, repoUrl, featured, body |
| `category`      | title, slug, color |
| `post`          | title, slug, excerpt, publishedAt, readingMinutes, coverImage, categories[], tags[], featured, body |

> Social link icons accept any [lucide-react](https://lucide.dev/icons) name — e.g. `Github`, `Linkedin`, `Twitter`, `Mail`, `BookOpen`, `Shield`.

---

## Project layout

```
cv-donald/
├── public/                       # static assets
├── src/
│   ├── App.tsx                   # / route
│   ├── main.tsx                  # router + layout shell
│   ├── index.css                 # Tailwind v4 theme tokens
│   ├── components/               # Navbar, Footer, Hero, ProjectCard, PostCard, …
│   ├── pages/                    # Home, About, Projects, Blog, BlogPost, Contact, 404
│   ├── lib/
│   │   ├── sanity.ts             # client + image URL builder
│   │   ├── queries.ts            # GROQ + fallback wrapper
│   │   └── types.ts
│   └── data/profile.ts           # static fallback content
├── sanity/                       # Studio (separate workspace)
│   ├── sanity.config.ts
│   └── schemas/
├── vercel.json                   # SPA rewrite, caching, security headers
├── index.html
├── vite.config.ts
└── package.json
```

## Customising

1. **Replace the fallback data** in `src/data/profile.ts` with your own (or rely entirely on Sanity once the Studio is wired up).
2. **Tweak the theme** in `src/index.css` — `--color-accent`, `--color-bg`, fonts and animations live there.
3. **Update metadata** in `index.html` — title, description, OG tags, JSON-LD.
4. **Swap the contact endpoint** in `src/pages/ContactPage.tsx` (`FORMSPREE_ENDPOINT`).
5. **Update CSP origins** in `vercel.json` if you add new image hosts or third-party widgets.

## Deploying to Vercel

1. Push the repo to GitHub.
2. Import it on [vercel.com](https://vercel.com) — framework auto-detects as **Vite**.
3. Add env vars: `VITE_SANITY_PROJECT_ID`, `VITE_SANITY_DATASET`, `VITE_SANITY_API_VERSION`.
4. Deploy. `vercel.json` already configures:
   - SPA fallback rewrite to `/index.html`
   - Long-term immutable caching for `/assets` & `/fonts`
   - Strict CSP (allows `cdn.sanity.io`, `*.api.sanity.io`, `*.apicdn.sanity.io`, `formspree.io`, `vitals.vercel-insights.com`)
   - HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy

## Accessibility & performance

- Semantic landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`)
- Focus-visible styles on all interactive elements
- Reduced motion respected via Tailwind utilities
- Route-level code splitting (`React.lazy` + `Suspense`)
- Vendor chunks split by domain (`react`, `router`, `sanity`)
- Production build is currently **~95 KB gzipped** for the home route

## Roadmap

- [ ] RSS feed for `/blog`
- [ ] OG image generation per blog post
- [ ] Project detail page (`/projects/:slug`) with Portable Text body
- [ ] Light theme toggle
- [ ] i18n (English / Swahili)
- [ ] Search across posts + projects

## Contact

- **Email:** [donaldkimtai623@gmail.com](mailto:donaldkimtai623@gmail.com)
- **LinkedIn:** [linkedin.com/in/donald-kimtai](https://linkedin.com/in/donald-kimtai)
- **GitHub:** [@donaldkimtai](https://github.com/donaldkimtai)
- **X:** [@54ad0n](https://x.com/54ad0n)
- **Medium:** [@donald-kimtai](https://medium.com/@donald-kimtai)

## Credits

- Originally forked from [`santifer/cv-santiago`](https://github.com/santifer/cv-santiago) (MIT) and **completely rewritten** — only the build tooling philosophy carries over.
- CV / bio content sourced from [`donaldkimtai/donaldkimtai.github.io`](https://github.com/donaldkimtai/donaldkimtai.github.io).
- Icons by [Lucide](https://lucide.dev). Typography: [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) & [DM Sans](https://fonts.google.com/specimen/DM+Sans).

## License

[MIT](LICENSE) © Donald Kimtai
