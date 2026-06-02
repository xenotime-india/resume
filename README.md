# Resume — Sandeep Kumar

Static resume site built with Astro, deployed to GitHub Pages.

🌐 **Live:** https://xenotime-india.github.io/resume/

---

## Download PDFs

| Theme | Style | PDF |
|---|---|---|
| CloudAlgo *(active)* | Minimal monochrome, timeline | [resume.pdf](https://xenotime-india.github.io/resume/resume.pdf) |
| CloudAlgo | Minimal monochrome, timeline | [resume-cloudalgo.pdf](https://xenotime-india.github.io/resume/resume-cloudalgo.pdf) |
| Editorial | Luxury editorial, cream + gold | [resume-editorial.pdf](https://xenotime-india.github.io/resume/resume-editorial.pdf) |
| Brutalist | Swiss grid, yellow + black | [resume-brutalist.pdf](https://xenotime-india.github.io/resume/resume-brutalist.pdf) |
| Luxury | Warm organic, cream + terracotta | [resume-luxury.pdf](https://xenotime-india.github.io/resume/resume-luxury.pdf) |
| Noir | Dark cinematic, gold on near-black | [resume-noir.pdf](https://xenotime-india.github.io/resume/resume-noir.pdf) |
| Blueprint | Technical / architectural, navy | [resume-blueprint.pdf](https://xenotime-india.github.io/resume/resume-blueprint.pdf) |
| Broadsheet | Newspaper front page, newsprint | [resume-broadsheet.pdf](https://xenotime-india.github.io/resume/resume-broadsheet.pdf) |
| Executive | Pure white professional, modern | [resume-executive.pdf](https://xenotime-india.github.io/resume/resume-executive.pdf) |

---

## Themes

8 themes available. Switch by setting `ACTIVE_THEME` — three ways:

**1. Local default** — edit `src/config.ts`:
```ts
// change the fallback value
export const ACTIVE_THEME: Theme =
  (VALID_THEMES.includes(envTheme ?? '')) ? envTheme : 'cloudalgo'
```

**2. Local env var** — no file changes needed:
```bash
ACTIVE_THEME=executive npm run dev
ACTIVE_THEME=noir npm run build:all
```

**3. GitHub Actions** — changes the live site:
> Repo → **Settings → Variables → Actions** → `ACTIVE_THEME` = `executive`

| Theme | Style | Fonts |
|---|---|---|
| `cloudalgo` | Minimal monochrome, timeline layout | Outfit 900 |
| `editorial` | Luxury editorial, cream + gold | Cormorant Garamond + JetBrains Mono |
| `brutalist` | Swiss grid, yellow + black | Bebas Neue + Space Mono |
| `luxury` | Warm organic, cream + terracotta | DM Serif Display + DM Mono |
| `noir` | Dark cinematic, gold glow on near-black | Playfair Display + Crimson Pro |
| `blueprint` | Technical / architectural, navy grid | IBM Plex Mono |
| `broadsheet` | Newspaper front page, newsprint bg | Playfair Display + Merriweather |
| `executive` | Pure white corporate, pill tags | Plus Jakarta Sans 800 |

---

## Updating Content

All content lives in `src/content/` — edit markdown/YAML files, push, and the site redeploys automatically.

### Personal info & summary
`src/config.ts` — name, title, email, phone, location, LinkedIn, GitHub, summary, certifications, hobbies.

### Experience
`src/content/experience/` — one `.md` file per job, ordered by the `order` field.

```md
---
company: "Company Name"
title: "Your Title"
startDate: "Jan 2022"
endDate: "Present"
location: "City, Country"
order: 1
---
- Bullet point one
- Bullet point two
```

### Projects
`src/content/projects/` — one `.md` file per project.

```md
---
name: "Project Name"
client: "Client (via Employer)"
tech: ["React", "Node.js", "AWS"]
order: 1
---
Short description of the project and its impact.
```

### Skills
`src/content/skills/skills.yaml` — grouped by proficiency level.

### Education
`src/content/education/` — one `.yaml` file per degree.

---

## Development

```bash
npm install
npm run dev               # http://localhost:4321/resume
```

```bash
npm run build             # Build static site → dist/
npm run build:pdf         # Generate PDF for active theme → dist/resume.pdf
npm run build:all         # Build + generate active theme PDF
npm run build:all-themes  # Build + generate PDFs for all 8 themes
```

---

## Deployment

Push to `main` — GitHub Actions automatically:
1. Builds the site for each of the 8 themes
2. Generates a PDF per theme using Puppeteer (headless Chrome)
3. Deploys `dist/` (HTML + 9 PDFs) to the `gh-pages` branch

**GitHub Pages settings:** Source → Deploy from branch → `gh-pages` / `/ (root)`

**Change live theme without code changes:**
GitHub repo → Settings → Variables → Actions → set `ACTIVE_THEME` to any theme name.

---

## Project Structure

```
src/
├── config.ts                  ← Active theme + personal info + certifications
├── content/
│   ├── config.ts              ← Content Collections schema
│   ├── experience/            ← One .md per job
│   ├── projects/              ← One .md per project
│   ├── skills/skills.yaml     ← Skills grouped by level
│   └── education/             ← One .yaml per degree
├── layouts/
│   ├── BaseLayout.astro       ← Theme router
│   └── themes/
│       ├── CloudAlgo.astro    ← Minimal monochrome
│       ├── Editorial.astro    ← Luxury editorial
│       ├── Brutalist.astro    ← Swiss grid
│       ├── Luxury.astro       ← Warm organic
│       ├── Noir.astro         ← Dark cinematic
│       ├── Blueprint.astro    ← Technical / navy
│       ├── Broadsheet.astro   ← Newspaper
│       └── Executive.astro    ← Pure white corporate
└── pages/
    └── index.astro            ← Queries all collections

scripts/
├── generate-pdf.js            ← Puppeteer PDF generator (single theme)
└── generate-all-pdfs.js       ← Generates PDFs for all 8 themes

.github/workflows/
└── deploy.yml                 ← Build + all PDFs + deploy pipeline
```
