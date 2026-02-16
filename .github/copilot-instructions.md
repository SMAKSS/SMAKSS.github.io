# Copilot Instructions

Follow these repository conventions when generating or modifying code.

## Primary Goals

- Build and maintain a clean React + TypeScript codebase.
- Prefer modern, maintainable patterns over quick fixes.
- Keep all generated code compatible with pnpm workflows.

## Required Conventions

- Prefer arrow functions for components and utilities.
- Use explicit types for function inputs and outputs.
- For functions with 2+ logical inputs, prefer object params and inline destructuring.
- Put shared input/domain types in `*.type.ts` files.
- Put constants in `*.constants.ts`.
- Put pure helper logic in `*.utils.ts`.
- Keep business logic out of UI components when possible.
- Add concise JSDoc for exported functions, constants, and types.
- Use multi-line JSDoc block format for comments (avoid single-line JSDoc).
- Prefer reusable primitives (`Box`, `Text`, `Button`, `Input`, `Select`, shared cards) over repeated raw HTML/style blocks.
- Keep files single-purpose; extract hooks/utils/constants when logic grows.

## Architecture and Tooling

- Use React Router for routing concerns.
- Keep route-specific styles scoped to route files and loaded by the route.
- Keep i18n-ready string usage (avoid hardcoded text in deeply nested components).
- When copy changes, update both locale files (`en.json` and `fa.json`) in the same PR.
- Prefer translation keys over inline literals for user-facing content.
- Prefer `useAppTranslation` when app-level language behavior is needed.
- Keep external API calls on the server unless frontend calls are explicitly required.
- Use shared request handler/service wrappers for caching, fallbacks, and centralized error handling.
- Respect ESLint and Prettier rules.
- Favor small composable modules over large files.

## Logging and Error Handling

- Log server errors only (avoid success logs).
- Log critical diagnostics only: request context, reason, status, hint, and compact previews.
- Preserve upstream response metadata in thrown errors for diagnostics.
- Avoid logging full raw response payloads unless explicitly required for debugging.

## Environment and Secrets

- Never hardcode credentials, tokens, usernames, or IDs that belong in env vars.
- Keep `.env.example` placeholder-only and non-sensitive.
- Use `VITE_` prefix for client-exposed variables.
- Load GTM/analytics scripts only in production unless explicitly requested otherwise.

## Quality Bar

- Do not introduce `any` without a clear, documented reason.
- Avoid dead code, commented-out blocks, and duplicate utilities.
- Maintain accessibility compliance (semantic structure, labels, keyboard support, focus/disabled states, alt text).
- Add/expand tests for non-trivial logic and component behavior changes.
- Component tests should cover variant props, accessibility-relevant props, and ref-forwarding where applicable.
- Ensure changes pass lint, typecheck, tests, and build.

## Git Hooks

- Keep pre-commit checks aligned with lint + typecheck.
- Keep pre-push checks aligned with tests.
