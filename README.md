<div align="center">

# 🏵️ Shukrana Kalyan Sangh Foundation

**A premium modern NGO website and dashboard system for empowering communities and accelerating social development.**

</div>

---

## Overview

Shukrana Kalyan Sangh Foundation is a welfare-focused web platform that combines a polished public-facing landing page with an internal admin dashboard. The site showcases the foundation's impact programs, enables donations and volunteer sign-ups, and presents transparency-driven field photography, testimonials, and contact channels.

- **Public site**: Hero, How We Work, Impact Programs, Gallery, Testimonials, Volunteer CTA, and Contact sections, plus donation, volunteer, and program-detail modals.
- **Dashboard**: Internal views for tracking donations and operational metrics.

## Tech Stack

| Area | Technology |
| --- | --- |
| Framework | [React 19](https://react.dev/) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Build tool | [Vite 6](https://vitejs.dev/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Animation | [Motion](https://motion.dev/) |
| Routing | [React Router 7](https://reactrouter.com/) |
| Charts | [Recharts](https://recharts.org/) |
| Icons | [Lucide React](https://lucide.dev/) |

### Brand palette

| Token | Value |
| --- | --- |
| Primary Blue | `#232F46` |
| Primary Gold | `#ED8C32` |
| Neutrals | White / warm off-white shades |

## Getting Started

**Prerequisites:** [Node.js](https://nodejs.org/) (LTS recommended)

1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure environment variables. Copy the example file and fill in your values:
   ```bash
   cp .env.example .env.local
   ```
   Set the `GEMINI_API_KEY` to your Gemini API key.
3. Start the development server:
   ```bash
   npm run dev
   ```
   The app runs at [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server on port 3000 |
| `npm run build` | Build the production bundle |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Type-check the project (`tsc --noEmit`) |
| `npm run clean` | Remove build artifacts |

## Project Structure

```
.
├── index.html
├── src/
│   ├── main.tsx                 # App entry point
│   ├── App.tsx                  # Routes
│   ├── index.css                # Global styles, theme tokens & utilities
│   ├── data.ts                  # Static content (programs, carousel, etc.)
│   ├── types.ts                 # Shared TypeScript types
│   ├── components/              # UI sections & shared components
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── HowWeWork.tsx
│   │   ├── ImpactPrograms.tsx
│   │   ├── Gallery.tsx
│   │   ├── Testimonials.tsx
│   │   ├── VolunteerCTA.tsx
│   │   ├── ContactSection.tsx
│   │   ├── Footer.tsx
│   │   └── ...                  # Dashboard, Sidebar, Layout, etc.
│   └── pages/                   # Route-level pages
│       ├── LandingPage.tsx
│       ├── DashboardPage.tsx
│       ├── LoginPage.tsx
│       └── ComingSoonPage.tsx
└── vite.config.ts
```

## License

Unless otherwise noted, source files are provided under the Apache-2.0 license.
