# Copilot Instructions

These instructions define the coding conventions for this repository.

## Core Rules

- Use TypeScript with explicit types; avoid `any`.
- Prefer arrow functions.
- Use named exports unless framework constraints require default exports.
- Keep files focused on a single responsibility.
- Add concise multi-line JSDoc for exported functions, constants, and types.

## File Organization

- Put domain/input/output types in `*.type.ts`.
- Put immutable values/config maps in `*.constants.ts`.
- Put pure helper logic in `*.utils.ts`.
- Put React hooks in `*.hook.ts`.
- Put orchestration logic in `*.service.ts`.

## Function and Type Rules

- For functions with 2+ logical inputs, use a single object input and destructure inline.
- Use dedicated exported input types from `*.type.ts` for non-trivial structured inputs.
- Avoid inline object input types in components/services when a reusable type should exist.
- Keep standalone helper logic out of component files; move it to `*.utils.ts`.

## UI and Accessibility

- Prefer reusable primitives (`Box`, `Text`, `Button`, `Input`, `Select`) over duplicated raw elements/styles.
- Maintain semantic/a11y correctness (`aria-*`, keyboard focus, `id`/`htmlFor`, disabled semantics).

## Data and Environment

- Keep external API calls on the server unless frontend access is explicitly required.
- Use shared request handlers for caching/error handling/logging behavior.
- Never hardcode credentials or identifiers; use environment variables.
- Keep `.env.example` as placeholders only.
- Use `VITE_` prefix only for client-exposed environment variables.
