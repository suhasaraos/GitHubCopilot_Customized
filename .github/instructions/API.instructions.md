---
applyTo: "api/**"
---

# API Instructions — OctoCAT Supply Chain Management System

These instructions apply to all files under `api/`.

---

## Tech Stack

- **Runtime:** Node.js ≥ 18
- **Framework:** Express 4
- **Language:** TypeScript 5
- **Build:** `tsc` → `dist/`
- **Dev server:** `tsx` (no build step needed for dev — run `npm run dev:api`)
- **Testing:** Vitest + Supertest
- **API Docs:** Swagger (swagger-jsdoc + swagger-ui-express) at `/api-docs`

---

## Project Structure

```
api/src/
├── index.ts          # App entry point — registers all routers and middleware
├── seedData.ts       # In-memory seed data for all entities
├── models/           # TypeScript interfaces/types — one file per entity
└── routes/           # Express route handlers — one file per entity
```

---

## Coding Conventions

- Place route handlers in `api/src/routes/` — one file per domain entity.
- Define data models (interfaces/types) in `api/src/models/` — one file per entity.
- Every route file **must** include JSDoc Swagger annotations for every endpoint.
- Route paths must follow the pattern `/api/<entity-plural>` (e.g., `/api/products`, `/api/branches`).
- Register every new router in `api/src/index.ts`.
- Do not add business logic inside route handler callbacks — extract to service functions when logic grows beyond simple CRUD.

### HTTP Status Codes

| Situation          | Code |
|--------------------|------|
| Successful read    | 200  |
| Resource created   | 201  |
| Bad/missing input  | 400  |
| Resource not found | 404  |
| Server error       | 500  |

### Swagger Annotations

Every route file must open with a `@swagger` tag block and annotate each operation. Example pattern:

```typescript
/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Returns all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
```

---

## Error Handling

- Wrap every async route handler in `try/catch`.
- Return structured JSON error responses — never expose raw stack traces.
- Example pattern:

```typescript
router.get('/:id', async (req, res) => {
  try {
    const item = data.find(x => x.id === Number(req.params.id));
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

---

## Testing

- Write integration tests in `api/src/routes/<entity>.test.ts` alongside the route file.
- Use **Vitest** as the test runner and **Supertest** to make HTTP assertions against the Express app.
- Cover happy paths, not-found cases, bad input (400), and server error scenarios.
- Use actual in-memory state for integration tests; mock external HTTP calls in unit tests.
- Run API tests:
  - `npm run test:api` — run once
  - `npm run test:coverage` (inside `api/`) — with coverage report

---

## CORS & Environment

- CORS origins are configured in `api/src/index.ts` via `process.env.API_CORS_ORIGINS` (comma-separated).
- Default allowed origins: `http://localhost:5137`, `http://localhost:3001`, and `*.app.github.dev`.
- The server port defaults to `3000` and can be overridden with `process.env.PORT`.

---

## Things to Avoid

- Do not use `any` in TypeScript without an explanatory comment.
- Do not hard-code magic numbers for HTTP status codes — use the values directly with a clear comment if needed.
- Do not duplicate route path strings — define them once in the router.
- Do not leak business logic into route callbacks — keep handlers thin.
- Do not commit `.env` files or build artifacts (`dist/`, `node_modules/`).
