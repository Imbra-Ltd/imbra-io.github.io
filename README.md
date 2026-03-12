# Imbra.soft | Software & Industrial Engineering

Website for [Imbra.soft](https://imbra-ltd.github.io) — a boutique software and industrial engineering consultancy based in Varna, Bulgaria.

## Getting started

**Prerequisites**

```bash
# Git
winget install Git.Git

# Node.js 22+ (includes npm)
winget install OpenJS.NodeJS.LTS
```

**Install and run**

```bash
git clone https://github.com/Imbra-Ltd/imbra-ltd.github.io.git
cd imbra-ltd.github.io
npm install
npm run dev       # develop — hot reload at http://localhost:4321
npm run build     # compile — outputs static files to dist/
npm run preview   # verify — preview the production build locally
```

## Stack

- [Astro](https://astro.build) — static site generator
- React — interactive islands only (hamburger menu, product expand, services accordion)
- Plain CSS — no Tailwind, no CSS-in-JS
- JSON — all content in `src/data/`, no hardcoded copy in components

## Project structure

```
src/
├── data/                  # All editable content as JSON
│   ├── site.json          # Nav, hero, contact, footer
│   ├── products.json      # Portfolio products
│   ├── services.json      # Services accordion
│   ├── expertise.json     # Domain expertise cards
│   └── publications.json  # Research publications
├── components/
│   ├── interactive/       # React islands (client-side JS)
│   │   ├── HamburgerMenu.tsx
│   │   ├── ProductExpand.tsx
│   │   └── ServiceExpand.tsx
│   └── *.astro            # Static section components
├── layouts/
│   └── Base.astro         # HTML shell, global CSS, reveal script
├── pages/
│   ├── index.astro        # Homepage
│   ├── imprint.astro      # Legal imprint
│   ├── privacy.astro      # Privacy policy
│   └── courses/           # Placeholder for future course pages
└── styles/
    └── global.css         # All styles
design/
└── prototypes/            # Design prototypes (not deployed)
```

## Editing content

All site content lives in `src/data/` as JSON files. No component knowledge required — edit the JSON, the site updates automatically.

| File                         | Controls                                       |
|------------------------------|------------------------------------------------|
| `src/data/site.json`         | Nav links, hero stats, contact section, footer |
| `src/data/products.json`     | Portfolio cards and detail panels              |
| `src/data/services.json`     | Services accordion items                       |
| `src/data/expertise.json`    | Domain expertise cards                         |
| `src/data/publications.json` | Research publications with DOI links           |

## Deployment

Pushing to `main` triggers a GitHub Actions workflow that builds the site and deploys it to GitHub Pages. No manual steps required.

**Prerequisite:** GitHub Pages must be configured to use GitHub Actions as the source (`Settings → Pages → Source → GitHub Actions`).

## Contributing

- Branch naming: `feature/description`
- Always test with `npm run dev` before committing
- Create a PR for each logical group of changes