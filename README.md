<div align="center">

# 🏵️ Shukrana Kalyan Sangh Foundation

**A premium modern NGO website and dashboard system for empowering communities and accelerating social development.**

Education · Healthcare · Women Empowerment · Sustainable Development

</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Design System](#design-system)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Application Routes](#application-routes)
- [Data & State](#data--state)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Overview

Shukrana Kalyan Sangh Foundation is a welfare-focused web platform that combines a polished public-facing landing page with an internal admin dashboard. The site showcases the foundation's impact programs, enables donations and volunteer sign-ups, and presents transparency-driven field photography, testimonials, and contact channels.

The project is a single-page application (SPA) built with React and Vite. The public marketing site and the authenticated dashboard live in the same codebase and share a common design system, typography, and brand palette.

- **Public site** — Marketing and engagement surface for donors, CSR partners, government officials, and volunteers.
- **Dashboard** — Internal views for tracking donations, volunteers, and operational metrics.

## Features

### Public landing page

- **Hero** with an auto-rotating, manually navigable image carousel and floating impact stats.
- **How We Work** — three-step operating blueprint (Identify Needs → Execute Programs → Measure Impact).
- **Impact Programs** — program cards with animated funding-progress bars, raised/goal stats, and beneficiary counts.
- **Gallery** — filterable masonry field photography with a full-screen lightbox.
- **Testimonials** — community voices from teachers, social workers, volunteers, and beneficiaries.
- **Volunteer CTA** — dark, high-contrast call to action for volunteer recruitment.
- **Contact** — editorial contact details plus a validated message form.
- **Modals** — Donate, Volunteer, and Program Details flows with success states.

### Dashboard

- Donation and operational metrics with charts (Recharts).
- Sidebar navigation and dashboard layout shell.
- Login screen for internal access.

### Cross-cutting

- Smooth-scroll anchor navigation between sections.
- Subtle, premium motion (fade-up reveals, hover states, soft image scaling) via Motion.
- Responsive layout from mobile to large desktop.
- `prefers-reduced-motion` support for accessibility.

## Tech Stack

| Area | Technology |
| --- | --- |
| Framework | [React 19](https://react.dev/) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Build tool | [Vite 6](https://vitejs.dev/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) (CSS-first `@theme` config) |
| Animation | [Motion](https://motion.dev/) |
| Routing | [React Router 7](https://reactrouter.com/) |
| Charts | [Recharts](https://recharts.org/) |
| Icons | [Lucide React](https://lucide.dev/) |
| AI SDK | [@google/genai](https://www.npmjs.com/package/@google/genai) |
| Server (optional) | [Express](https://expressjs.com/) |

## Design System

The design language targets a premium NGO/foundation aesthetic with strong visual hierarchy, generous spacing, and restrained motion.

### Brand palette

| Token | Value | Usage |
| --- | --- | --- |
| Primary Blue | `#232F46` | Text, dark sections, primary surfaces |
| Primary Gold | `#ED8C32` | Accents, CTAs, highlights |
| Warm Light | `#FFF8F2` / `#FFF6EF` | Soft section backgrounds |
| Neutrals | White / warm off-white | Cards, base surfaces |

### Typography

- **Display:** Poppins (headings)
- **Body:** Inter (paragraphs, UI)
- Tuned letter-spacing, line-height, and an 8px-based spacing scale defined in `src/index.css`.

Global theme tokens, shadow utilities (`shadow-brand`, `shadow-brand-lg`, `shadow-brand-xl`), and helpers (`.eyebrow`, `.hairline`, `.bg-grid-faint`, `.bg-dot-pattern`) live in [`src/index.css`](src/index.css).

## Getting Started

**Prerequisites:** [Node.js](https://nodejs.org/) (LTS recommended) and npm.

1. Clone the repository:
   ```bash
   git clone https://gitlab.com/khrishchauhan-group/Shukrana-Kalyan.git
   cd Shukrana-Kalyan
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables (see below):
   ```bash
   cp .env.example .env.local
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   The app runs at [http://localhost:3000](http://localhost:3000) and is exposed on `0.0.0.0` for network access.

## Environment Variables

Create a `.env.local` file (gitignored) based on `.env.example`.

| Variable | Required | Description |
| --- | --- | --- |
| `GEMINI_API_KEY` | Yes (for AI features) | Your Google Gemini API key, consumed via `@google/genai`. |

> Never commit `.env.local` or real API keys to the repository.

## Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server on port 3000 |
| `npm run build` | Build the production bundle into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Type-check the project (`tsc --noEmit`) |
| `npm run clean` | Remove build artifacts (`dist`, `server.js`) |

## Project Structure

```
.
├── index.html                   # HTML entry & meta tags
├── vite.config.ts               # Vite configuration
├── tsconfig.json                # TypeScript configuration
├── .env.example                 # Example environment variables
├── src/
│   ├── main.tsx                 # App entry point
│   ├── App.tsx                  # Route definitions
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
│   │   ├── DashboardLayout.tsx
│   │   ├── Sidebar.tsx
│   │   └── LeadershipTeam.tsx
│   └── pages/                   # Route-level pages
│       ├── LandingPage.tsx
│       ├── DashboardPage.tsx
│       ├── LoginPage.tsx
│       └── ComingSoonPage.tsx
└── package.json
```

## Application Routes

Routes are defined in [`src/App.tsx`](src/App.tsx) using React Router.

| Path | Page | Description |
| --- | --- | --- |
| `/` | `LandingPage` | Public marketing site |
| `/login` | `LoginPage` | Internal admin login |
| `/dashboard` | `DashboardPage` | Donation & operations dashboard |

The landing page uses in-page anchors (`#home`, `#about`, `#programs`, `#gallery`, `#contact`) for smooth-scroll navigation.

## Data & State

- **Static content** (programs, carousel slides, gallery items, testimonials) is defined in `src/data.ts` and within individual components.
- **Donations and volunteer counts** submitted through the public modals are persisted to the browser's `localStorage` (keys such as `shukrana_donations`, `shukrana_total_donated`, `shukrana_volunteer_count`) so the dashboard can reflect activity. This is a client-side demo flow and not a production payment integration.

## Deployment

1. Build the production bundle:
   ```bash
   npm run build
   ```
2. The static output is generated in `dist/` and can be served by any static host or CDN.
3. Optionally preview the build locally before deploying:
   ```bash
   npm run preview
   ```

> Ensure required environment variables are configured in your hosting platform.

## Contributing

1. Create a feature branch from `main`.
2. Make your changes and run `npm run lint` to type-check.
3. Verify the app builds with `npm run build`.
4. Open a merge request describing the change.

Please keep the brand palette and design system consistent across contributions.

## License

Unless otherwise noted, source files are provided under the Apache-2.0 license.
