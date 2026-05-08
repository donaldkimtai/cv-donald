# cv-donald

Personal portfolio for **Donald Kimtai** — Security Consultant & Web/API Security Researcher based in Nairobi, Kenya.

Built with **React 19 + TypeScript + Vite + Tailwind v4**, content powered by **Sanity** (with bundled static fallbacks so the site ships even before the CMS is configured).

## Features

- Cyber-themed dark UI with a green-on-near-black accent palette
- Responsive **navbar** with mobile drawer
- Sections / routes:
  - `/` — Home (Hero, Services, Featured Projects, Latest Posts, CTA)
  - `/about` — Bio, Skills, Work Experience, Education, Certifications
  - `/projects` — All projects, filterable by tag
  - `/blog` — All posts, filterable by category
  - `/blog/:slug` — Single blog post (renders Sanity Portable Text)
  - `/contact` — Contact form (Formspree) + socials
- **Sanity Studio** in `./sanity` with schemas for `profile`, `skill`, `experience`, `education`, `certification`, `project`, `post`, `category`
- Static fallback data in `src/data/profile.ts` so every page renders without Sanity configured

## Stack

| Layer            | Tool |
|------------------|------|
| Framework        | React 19 + Vite 7 |
| Language         | TypeScript 5.9 (strict) |
| Styling          | Tailwind CSS v4 |
| Routing          | react-router-dom 7 |
| CMS              | Sanity (`@sanity/client`, `@sanity/image-url`, `@portabletext/react`) |
| Icons            | lucide-react |
| Animation        | motion |
| Analytics        | @vercel/analytics |

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:5173.

The site renders with the static fallback data until Sanity is wired up.

## Environment variables

Copy `.env.local.example` to `.env.local` and fill in your Sanity values:

```bash
VITE_SANITY_PROJECT_ID=...
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-10-01
```

If `VITE_SANITY_PROJECT_ID` is empty, the frontend falls back to the bundled static data — useful for local development before you create the Sanity project.

## Sanity Studio

The Sanity Studio lives in `./sanity` as a separate workspace. To run it:

```bash
cd sanity
npm install

# Set your project + dataset:
export SANITY_STUDIO_PROJECT_ID=your-project-id
export SANITY_STUDIO_DATASET=production

# (Optional) initialise from the CLI:
npx sanity@latest init --bare

npx sanity dev      # Studio at http://localhost:3333
npx sanity deploy   # Hosted Studio
```

The schemas under `sanity/schemas/` map 1:1 to the GROQ queries in `src/lib/queries.ts`.

### Content model

| Schema          | Purpose |
|-----------------|---------|
| `profile`       | Singleton with name, role, tagline, bio, socials, avatar, resume URL |
| `skill`         | Skill groups (e.g. "Offensive Security") with tag-style items |
| `experience`    | Work history entries with bullets |
| `education`     | Academic history |
| `certification` | Industry credentials |
| `project`       | Portfolio projects (featured flag, tags, repo/live URLs) |
| `category`      | Blog post categories |
| `post`          | Blog posts with Portable Text body, cover image, categories |

For social link icons, use any [lucide-react](https://lucide.dev/icons) name (e.g. `Github`, `Linkedin`, `Twitter`, `Mail`, `BookOpen`, `Shield`).

## Scripts

```bash
npm run dev            # Vite dev server
npm run build          # Type-check + production build
npm run preview        # Preview the production build
npm run lint           # ESLint
npm run sanity:dev     # Run the Studio locally
npm run sanity:build   # Build the Studio
npm run sanity:deploy  # Deploy the hosted Studio
```

## Project structure

```
src/
├── App.tsx                  # Top-level home route
├── main.tsx                 # Router + layout shell (Navbar, Footer)
├── index.css                # Tailwind v4 theme
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── SectionHeading.tsx
│   ├── ProjectCard.tsx
│   └── PostCard.tsx
├── pages/
│   ├── HomePage.tsx
│   ├── AboutPage.tsx
│   ├── ProjectsPage.tsx
│   ├── BlogPage.tsx
│   ├── BlogPostPage.tsx
│   ├── ContactPage.tsx
│   └── NotFoundPage.tsx
├── lib/
│   ├── sanity.ts            # Sanity client + image URL builder
│   ├── queries.ts           # GROQ queries with static fallback
│   └── types.ts
└── data/
    └── profile.ts           # Static fallback content (Donald's CV)

sanity/
├── sanity.config.ts
├── package.json
└── schemas/
    ├── index.ts
    ├── profile.ts
    ├── skill.ts
    ├── experience.ts
    ├── education.ts
    ├── certification.ts
    ├── project.ts
    ├── post.ts
    └── category.ts
```

## Deploying

The site is set up for **Vercel**:

```bash
vercel
```

`vercel.json` includes:
- SPA rewrite (`/(.*)` → `/index.html`)
- Long-term caching for `/assets` and `/fonts`
- Security headers (CSP allowing Sanity CDN + Formspree, HSTS, Referrer-Policy, etc.)

Set `VITE_SANITY_PROJECT_ID` (and optionally `VITE_SANITY_DATASET`, `VITE_SANITY_API_VERSION`) in your Vercel project's environment variables.

## Credits

- Original starter forked from [`santifer/cv-santiago`](https://github.com/santifer/cv-santiago) (MIT) — completely redesigned and rewritten for Donald's site.
- Personal data sourced from [`donaldkimtai/donaldkimtai.github.io`](https://github.com/donaldkimtai/donaldkimtai.github.io).

## License

MIT
