# Taha Tanvir — Portfolio

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-0.166-8B5CF6?style=flat-square&logo=three.js&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-00FF94?style=flat-square&logo=framer&logoColor=black)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=flat-square&logo=vercel)

Personal portfolio for **Taha Tanvir** — AI Engineer based in Lahore, Pakistan, currently completing an MPhil in Artificial Intelligence at PUCIT. Built to showcase ML pipelines, deep learning research, and production-ready AI applications, from RAG systems to diffusion model fine-tuning.

**Live site:** [your-deployed-url.vercel.app](https://your-deployed-url.vercel.app) *(update after deploying)*

---

## Features

- **3D neural network hero** — interactive Three.js particle field with scroll-reactive parallax
- **Persistent background canvas** — subtle floating particles run behind every section
- **Per-card 3D accents** — rotating wireframe icosahedrons on skill cards, animated shader gradients on project cards, orbiting particle rings around stat counters
- **Scroll-driven animations** — Framer Motion fade/slide-ins, staggered grids, count-up stat numbers
- **"Neural Noir" design system** — obsidian background, violet (`#8B5CF6`) primary accent, electric green (`#00FF94`) for metrics and highlights
- **Fully responsive** — mobile, tablet, and desktop layouts, including a full-screen mobile nav overlay
- **Zero placeholder content** — every section is populated with real data from the CV

## Sections

| Section | Content |
|---|---|
| Hero | Name, animated role tagline, CTA buttons (GitHub, LinkedIn, Email) |
| About | Bio, animated stat counters (degrees, projects, publications) |
| Skills | Six categories — AI/ML, RAG & IR, Generative AI, Backend, Languages, Web/Mobile |
| Projects | RAG Knowledge Base, DreamBooth LoRA, CIFAR-100 Benchmark, Multimodal HAR, AI Voice Cloning |
| Experience & Education | MPhil (PUCIT), BS Software Engineering (UOL), Fiverr freelance work, IBM certification |
| Contact | Direct links to email, LinkedIn, and GitHub |

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **3D/WebGL:** Three.js (vanilla, dynamically imported for performance)
- **Fonts:** Syne (display), Plus Jakarta Sans (body), Space Mono (metrics/code)

## Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Open http://localhost:3000
```

To create a production build:

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── layout.tsx        # Root layout, fonts, global glow accents
│   ├── page.tsx           # Composes all sections
│   └── globals.css        # Design system tokens & utilities
├── components/
│   ├── Hero.tsx            # Hero section + typing animation
│   ├── NeuralCanvas.tsx     # Hero 3D neural network
│   ├── BackgroundCanvas.tsx # Persistent site-wide particle field
│   ├── About.tsx            # Bio + animated stat counters
│   ├── AboutRing.tsx         # Orbiting particle ring (2D canvas)
│   ├── Skills.tsx            # Skill categories
│   ├── SkillOrb.tsx           # Rotating wireframe icosahedron
│   ├── Projects.tsx           # Project cards
│   ├── ProjectMesh.tsx         # Animated shader gradient backgrounds
│   ├── Timeline.tsx            # Experience & education timeline
│   ├── Contact.tsx              # Contact links
│   └── Navigation.tsx           # Nav bar + mobile overlay
└── data/
    └── portfolio.ts        # All content (CV data) as typed objects
```

## Deployment

This project is configured for one-click deployment on [Vercel](https://vercel.com):

1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository
3. Vercel auto-detects Next.js — no configuration needed
4. Every push to `main` triggers a production deploy; other branches get preview URLs

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/TahaUser5/taha-portfolio)

## Connect

- **Email:** [tahatanvir605@gmail.com](mailto:tahatanvir605@gmail.com)
- **LinkedIn:** [linkedin.com/in/tahatanvir](https://linkedin.com/in/tahatanvir)
- **GitHub:** [github.com/TahaUser5](https://github.com/TahaUser5)

## License

MIT — feel free to fork this structure for your own portfolio, but please swap out the personal content.
