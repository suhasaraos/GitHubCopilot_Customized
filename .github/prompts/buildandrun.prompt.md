---
name: buildandrun
description: Use this prompt to build and run both the API backend and React frontend of the OctoCAT Supply Chain Management System.
---

## Build & Run — OctoCAT Supply Chain Management System

This is an **npm workspaces monorepo**. All commands below should be run from the **repository root** (`c:\code\bofa\GitHubCopilot_Customized`).

---

### Prerequisites

- Node.js >= 18
- Run `npm install` from the repo root once to install all workspace dependencies.

---

### Run both services together (recommended)

```bash
npm run dev
```

This uses `concurrently` to start both the API and frontend in a single terminal.

---

### Run services individually

**Backend API** (Express + TypeScript, port 3000):

```bash
npm run dev:api
```

- Starts `tsx src/index.ts` — no compile step needed, runs TypeScript directly.
- API base URL: `http://localhost:3000`
- Swagger docs: `http://localhost:3000/api-docs`

**Frontend** (React + Vite, port 5137):

```bash
npm run dev:frontend
```

- Starts the Vite dev server with HMR.
- App URL: `http://localhost:5137`

---

### Build for production

```bash
npm run build
```

Runs `tsc` for the API and `tsc -b && vite build` for the frontend.

---

### Run tests

```bash
npm run test          # all workspaces
npm run test:api      # API only (Vitest)
npm run test:frontend # Frontend only (Vitest + React Testing Library)
```

---

### Troubleshooting

- If port 3000 is already in use: `netstat -ano | Select-String ":3000"` (Windows) or `lsof -i :3000` (macOS/Linux) to find the process.
- If dependencies are missing, re-run `npm install` from the repo root.
- The frontend proxies API requests to `http://localhost:3000` by default; ensure the API is running before using the frontend.