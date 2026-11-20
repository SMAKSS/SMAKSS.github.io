# SMAKSS Website

Personal website for Max Kazemi, built with React, TypeScript, React Router, and Cloudflare Workers.

## Requirements

- Node.js `>=20.19.0`
- pnpm `10.30.3` (declared by the repository)
- A modern version of Chrome, Safari, Firefox, or Edge

## Local development

Install dependencies and start the development server:

```sh
pnpm install
pnpm dev
```

To build and run the site in the local Cloudflare Worker runtime, use `pnpm cf:dev`.

## Site areas

- `/` — Homepage with an interactive software architecture illustration and community contribution carousel.
- `/about` — Engineering background and project notes.
- `/playground` — Small interactive games.
- `/tools` — Published npm packages with available live sandbox previews.

The site supports English and Persian, including right-to-left layout, and light and dark themes. Language and theme preferences are stored as site preferences. Reduced-motion preferences are respected by animated sections.

## Public profile and crawler settings

The [professional profile](public/professional-profile.json) is a standalone JSON-LD resource linked in the document head for tools that follow `describedby` links. It is directly accessible by URL. The [response header](public/_headers) asks search engines to omit the file from their results. Keep the profile limited to information intended for anyone who fetches it.

[robots.txt](public/robots.txt) advertises the [sitemap](public/sitemap.xml) and can hold crawler-specific preferences. Cloudflare can prepend managed rules to the file served on the live domain. Public content stays accessible to clients regardless of voluntary crawler directives. [Cloudflare managed crawler rules](https://developers.cloudflare.com/bots/additional-configurations/managed-robots-txt/)

## Project structure

- `src/routes/` — React Router route modules, metadata, loaders, and route-level assets.
- `src/app/layout/` — Shared header, footer, and application shell.
- `src/components/` — Reusable interface primitives such as `Button`, `Input`, `Select`, and `Text`.
- `src/features/` — Page and feature implementations, with server data access kept alongside its feature.
- `src/styles/globals.css` — Global reset, theme tokens, typography, and shared site chrome.
- `src/features/*/*.route.css` — Styles loaded by the routes that use them.
- `src/components/*.css` — Styles imported by their owning components.

Most component and layout styling uses Tailwind utility classes. Keep page-specific rules in route stylesheets and shared tokens in the global stylesheet.

## Commands

- `pnpm dev` — Start local React Router development.
- `pnpm cf:dev` — Build and run with the local Cloudflare Worker runtime.
- `pnpm lint` — Run ESLint.
- `pnpm typecheck` — Generate route types and run TypeScript checks.
- `pnpm test` — Run the Vitest suite.
- `pnpm build` — Create the production build.
