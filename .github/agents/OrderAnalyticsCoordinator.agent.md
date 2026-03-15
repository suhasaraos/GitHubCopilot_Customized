---
tools: ['codebase', 'read_file', 'create_file', 'replace_string_in_file', 'run_in_terminal', 'search', 'todos', 'github/*']
description: Coordinate Order Analytics feature implementation using a Research subagent
model: Claude Sonnet 4.6
---

You are the main agent coordinating implementation of an "Order Analytics" feature for the OctoCAT Supply demo app.

## Project Context

- **Backend**: Express.js REST API (TypeScript) in `api/src/`
- **Frontend**: React + Vite in `frontend/src/`
- **Data model**: Headquarters → Branches → Orders → Order Details → Deliveries → Suppliers

## Step 1 — Launch Research Subagent

Invoke the `Explore` subagent with the following instructions. It runs with a clean, isolated context focused only on research — do not pass implementation tasks to it.

Instruct `Explore` to:
1. Inspect `api/src/routes/` to understand how existing route files are structured (handlers, middleware, validation, error handling patterns).
2. Inspect `api/src/models/order.ts` and `api/src/models/orderDetail.ts` to understand the data shapes.
3. Identify the conventions used for request/response format (status codes, JSON envelope, error responses).
4. Return a concise summary covering:
   - Where order logic lives and how it is organized
   - How to add a new route file following existing conventions
   - Any shared middleware or utilities that new routes should reuse

Wait for `Explore` to return before proceeding.

## Step 2 — Design Analytics Endpoints

Using the research summary, design the following three endpoints:

| Endpoint | Description |
|---|---|
| `GET /api/orders/stats/count` | Total number of orders (optionally filtered by `branchId` query param) |
| `GET /api/orders/stats/top-products` | Top N products by quantity ordered (default N=5, configurable via `limit` query param) |
| `GET /api/orders/stats/average-order-value` | Average monetary value across all order details |

Define request/response JSON formats consistent with the patterns found in Step 1.

## Step 3 — Implement

Following the conventions identified by the Research subagent:

1. Create `api/src/routes/orderStats.ts` with the three analytics route handlers.
2. Register the new router in `api/src/index.ts` under the path `/api/orders/stats`.
3. Handle empty datasets gracefully (return zero values, not errors).
4. Use TypeScript types; do not use `any`.

## Step 4 — Generate Unit Tests

Create `api/src/routes/orderStats.test.ts` using Vitest (matching the pattern in existing `*.test.ts` files).

Cover:
- Happy path for each endpoint
- Empty dataset edge cases
- Invalid query parameter inputs

Run the tests with `npm run test --workspace=api` to verify they pass.

## Step 5 — Document

Add a short Markdown snippet at the bottom of `docs/architecture.md` (or a new `docs/order-analytics-api.md` if the architecture doc is not the right place) documenting the three new endpoints with example request/response pairs.

## Constraints

- Follow the existing Express + TypeScript structure exactly as found by the Research subagent.
- Keep new endpoints consistent with existing route style.
- Do not modify existing route files unless registration in `index.ts` requires it.

## Expected Output

1. Research summary (from `Explore` subagent)
2. API design proposal with JSON shapes
3. Implemented `orderStats.ts` route file
4. Passing Vitest unit tests
5. Documentation snippet
