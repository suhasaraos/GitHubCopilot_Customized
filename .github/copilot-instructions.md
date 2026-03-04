# GitHub Copilot Instructions

## Project Overview

This is the **OctoCAT Supply Chain Management System** — a full-stack monorepo application with a Node.js/Express REST API backend and a React frontend. The system manages supply chain entities including products, orders, branches, suppliers, deliveries, and headquarters.

---

## Repository Structure

```
/
├── api/          # Node.js + Express + TypeScript REST API (port 3000)
├── frontend/     # React + TypeScript + Vite + Tailwind CSS SPA (port 5137)
├── infra/        # Deployment and infrastructure scripts
├── docs/         # Architecture, build, and deployment documentation
└── .github/      # GitHub Copilot config, agents, prompts, and workflows
```

This is an **npm workspaces** monorepo. Commands can be scoped per workspace:
- `npm run dev:api` — start the API in watch mode
- `npm run dev:frontend` — start the frontend dev server
- `npm run dev` — start both concurrently
- `npm run test` — run all tests across workspaces

---

## Tech Stack

> API-specific tech stack details are in [`.github/instructions/API.instructions.md`](.github/instructions/API.instructions.md).

### Frontend (`frontend/`)
- **Framework:** React 18 with functional components and hooks only
- **Language:** TypeScript 5
- **Bundler:** Vite
- **Styling:** Tailwind CSS 3
- **Routing:** React Router DOM 7
- **Data Fetching:** React Query (`useQuery` / `useMutation`) + Axios
- **Testing:** Vitest + React Testing Library

---

## Coding Conventions

### General
- Use **TypeScript** throughout — avoid `any`; prefer explicit types and interfaces.
- Use **named exports** for components and utilities; use **default exports** only for page-level React components.
- Keep files focused and single-responsibility; split large components into smaller ones.
- Prefer `const` over `let`; avoid `var`.
- Use descriptive variable and function names; avoid abbreviations unless well-known (e.g., `id`, `url`).

> API-specific conventions are in [`.github/instructions/API.instructions.md`](.github/instructions/API.instructions.md).

### Frontend (`frontend/`)
- Place React components in `frontend/src/components/`; group by domain under `entity/<domain>/`.
- Place shared context providers in `frontend/src/context/`.
- Use `frontend/src/api/config.ts` for all API base URL and endpoint configuration — never hard-code URLs in components.
- Always use `useTheme()` from `ThemeContext` to apply dark/light mode styles.
- Apply Tailwind utility classes directly in JSX; avoid inline `style` props unless necessary.
- Use `react-query`'s `useQuery` for data fetching; avoid raw `useEffect` + `useState` combinations for remote data.
- Define component-local TypeScript interfaces at the top of each file (e.g., `interface Product { ... }`).

---

## Testing

- **Frontend:** Write component tests alongside components using React Testing Library.
- **API:** See [`.github/instructions/API.instructions.md`](.github/instructions/API.instructions.md) for API test patterns.
- Run tests: `npm run test` (all), `npm run test:api`, `npm run test:frontend`.
- Tests should cover happy paths, edge cases, and error states.

---

## Error Handling

- **Frontend:** Handle `isLoading`, `error`, and empty-state cases consistently in every data-fetching component.
- **API:** See [`.github/instructions/API.instructions.md`](.github/instructions/API.instructions.md) for API error handling patterns.

---

## Git & Pull Requests

- Keep commits small and focused on a single change.
- Branch naming convention: `feature/<description>`, `fix/<description>`, `chore/<description>`.
- PR descriptions should summarize *what* changed and *why*.
- Do not commit secrets, `.env` files, or build artifacts (`dist/`, `node_modules/`).

---

## Docker & Deployment

- Both `api/` and `frontend/` have individual `Dockerfile`s.
- Infrastructure and deployment scripts live in `infra/`.
- Refer to `docs/deployment.md` for deployment guidance.

---

## Things to Avoid

- Do not use class-based React components.
- Do not use `any` type in TypeScript without a comment explaining the exception.
- Do not import directly from `node_modules` paths — use package names.
- Do not duplicate API endpoint strings in the frontend; always reference `frontend/src/api/config.ts`.
- API-specific anti-patterns are listed in [`.github/instructions/API.instructions.md`](.github/instructions/API.instructions.md).
