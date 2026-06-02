# Resume — Sandeep Kumar

Static resume site built with Astro, deployed to GitHub Pages.  
Live: **https://xenotime-india.github.io/resume/**  
PDF: **https://xenotime-india.github.io/resume/resume.pdf**

---

## Themes

Four themes available — switch by editing one line in `src/config.ts`:

```ts
export const ACTIVE_THEME = 'cloudalgo' // 'editorial' | 'brutalist' | 'luxury' | 'cloudalgo'
```

| Theme | Style | Fonts |
|---|---|---|
| `cloudalgo` | Minimal monochrome, timeline layout | Outfit 900 |
| `editorial` | Luxury editorial, cream + gold | Cormorant Garamond + JetBrains Mono |
| `brutalist` | Swiss grid, yellow + black | Bebas Neue + Space Mono |
| `luxury` | Warm organic, cream + terracotta | DM Serif Display + DM Mono |

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
npm run dev          # http://localhost:4321/resume
```

```bash
npm run build        # Build static site → dist/
npm run build:pdf    # Generate PDF from built site → dist/resume.pdf
npm run build:all    # Both in sequence
```

---

## Deployment

Push to `main` — GitHub Actions automatically:
1. Runs `astro build`
2. Generates `resume.pdf` via Puppeteer (headless Chrome)
3. Deploys `dist/` to the `gh-pages` branch

**GitHub Pages settings:** Source → Deploy from branch → `gh-pages` / `/ (root)`

---

## Project Structure

```
src/
├── config.ts                  ← Active theme + personal info
├── content/
│   ├── config.ts              ← Content Collections schema
│   ├── experience/            ← One .md per job
│   ├── projects/              ← One .md per project
│   ├── skills/skills.yaml     ← Skills grouped by level
│   └── education/             ← One .yaml per degree
├── layouts/
│   ├── BaseLayout.astro       ← Theme router
│   └── themes/
│       ├── CloudAlgo.astro
│       ├── Editorial.astro
│       ├── Brutalist.astro
│       └── Luxury.astro
└── pages/
    └── index.astro            ← Queries all collections

scripts/
└── generate-pdf.js            ← Puppeteer PDF generator

.github/workflows/
└── deploy.yml                 ← Build + PDF + deploy pipeline
```
