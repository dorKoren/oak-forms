# OAK Forms

A small Google Forms–style app: create forms in a builder, share a fill link, collect submissions, and review responses with summaries.

## Features

- **Home** — list forms, create new, jump to edit / fill / responses
- **Builder** — title, question types, options, required flags, reorder; **Save** publishes the form (draft until saved)
- **Fill** — dynamic Zod validation from the form schema, submit answers
- **Responses** — table + detail, delete with confirmation, KPIs for ratings, numbers, and choice questions, **Export CSV**

Question types: short text, paragraph, number, date, select, radio buttons, multi-select (dropdown), checkboxes, rating.

## Prerequisites

- Node.js 20+ (recommended)
- npm 10+

## Quick start

```bash
npm install
npm run dev
```

| Service | URL                   |
| ------- | --------------------- |
| Client  | http://localhost:5173 |
| API     | http://localhost:3001 |

The Vite dev server proxies `/api` to the API. The API keeps forms in memory only (empty until you create one; data is lost on restart).

## Scripts

From the repo root:

| Command              | Description                       |
| -------------------- | --------------------------------- |
| `npm run dev`        | Client + API (concurrently)       |
| `npm run build`      | Build shared, server, then client |
| `npm test`           | Vitest (shared, server, client)   |
| `npm run test:watch` | Vitest watch mode                 |

Client workspace:

| Command                             | Description        |
| ----------------------------------- | ------------------ |
| `npm run storybook -w client`       | Design system docs |
| `npm run build-storybook -w client` | Static Storybook   |

Server workspace:

| Command                           | Description             |
| --------------------------------- | ----------------------- |
| `npm run start -w server`         | Run API (after install) |
| `PORT=3002 npm run dev -w server` | Custom port             |

## Project layout

```
oak-forms/
├── client/          # Vite + React 19 + React Compiler + TypeScript + Tailwind 4
├── server/          # Express API + in-memory store
└── shared/          # Zod schemas and types (forms, questions, submissions)
```

### Client conventions

- **Pages** — feature folders (`HomePage/`, `BuilderPage/`, `FillPage/`, `ResponsesPage/`) with `Page.tsx`, hooks, utils, and page-local `components/`
- **UI** — shadcn primitives (`base-nova`) in `client/src/components/ui/` (managed by the shadcn CLI; do not mix with app components)
- **Form** — shared form controls and `FormField` in `client/src/components/form/`
- **Feedback** — load/error/skeleton states in `client/src/components/feedback/`
- **Navigation** — shared nav chrome in `client/src/components/navigation/`
- **Brand** — logos and brand assets in `client/src/components/brand/`
- **API** — `client/src/api/` + TanStack Query hooks
- **View transitions** — `<ViewTransition>` (React 19.3+) + `transitionUpdate()` ([`client/src/app/viewTransition.ts`](client/src/app/viewTransition.ts))

### Routes

| Path                   | Page      |
| ---------------------- | --------- |
| `/`                    | Home      |
| `/forms/:id/edit`      | Builder   |
| `/forms/:id`           | Fill      |
| `/forms/:id/responses` | Responses |

## API overview

Base path: `/api`

| Method | Path                             | Notes                       |
| ------ | -------------------------------- | --------------------------- |
| GET    | `/health`                        | `{ ok: true }`              |
| GET    | `/forms`                         | List with submission counts |
| POST   | `/forms`                         | Create form                 |
| GET    | `/forms/:id`                     | Form definition             |
| PUT    | `/forms/:id`                     | Update title / questions    |
| DELETE | `/forms/:id`                     | Delete form + submissions   |
| GET    | `/forms/:formId/submissions`     | List submissions            |
| POST   | `/forms/:formId/submissions`     | Create submission           |
| DELETE | `/forms/:formId/submissions/:id` | Delete submission           |

Submission bodies are validated with `buildAnswerSchema` on the server (see `shared/`).

## Design choices

A few decisions worth calling out for review:

- **Draft + manual publish** — New forms stay in **draft** until the builder **Save** action publishes them. Share, preview, and fill are gated on the client; the API rejects submissions on drafts (`403`). We preferred explicit publish over auto-save so “what respondents see” stays obvious and we avoid half-finished forms going live by accident.
- **Shared Zod in `shared/`** — Form shapes, question types, and `buildAnswerSchema` live in one package used by the client (fill validation) and server (submission validation). One source of truth beats duplicating rules across halves of the monorepo.
- **Feature folders, then promote** — Each page owns `Page.tsx`, hooks, and page-local `components/`. Shared UI moves to `components/form`, `feedback`, `confirm`, etc. only when a second page needs it. That keeps the tree navigable without a single flat `components/` dump.

## Limitations

- **In-memory storage** — data is lost when the API process restarts; not suitable for production as-is
- **No auth** — anyone with a link can fill or view responses in this demo
- **CORS** — API allows `http://localhost:5173` only

## Validation and tests

- Shared answer schema: `shared/answerSchema.test.ts`
- API integration: `server/src/api.test.ts`
- Response analytics: `client/src/pages/ResponsesPage/ResponsesPage.analytics.test.ts`
