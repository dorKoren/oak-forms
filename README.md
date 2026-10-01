# OAK Forms

A small Google Forms–style app: create forms in a builder, share a fill link, collect submissions, and review responses with summaries.

## Features

- **Home** — list forms, create new, jump to edit / fill / responses
- **Builder** — title, question types, options, required flags, reorder, debounced save, share link
- **Fill** — dynamic Zod validation from the form schema, submit answers
- **Responses** — table + detail, delete with confirmation, KPIs for ratings, numbers, and choice questions

Question types: short text, paragraph, number, date, select, radio buttons, multi-select (dropdown), checkboxes, rating.

## Prerequisites

- Node.js 20+ (recommended)
- npm 10+

## Quick start

```bash
npm install
npm run dev
```

| Service   | URL                      |
| --------- | ------------------------ |
| Client    | http://localhost:5173    |
| API       | http://localhost:3001    |

The Vite dev server proxies `/api` to the API. The API keeps forms in memory only (empty until you create one; data is lost on restart).

## Scripts

From the repo root:

| Command              | Description                          |
| -------------------- | ------------------------------------ |
| `npm run dev`        | Client + API (concurrently)          |
| `npm run build`      | Build shared, server, then client      |
| `npm test`           | Vitest (shared, server, client)      |
| `npm run test:watch` | Vitest watch mode                    |

Client workspace:

| Command                          | Description        |
| -------------------------------- | ------------------ |
| `npm run storybook -w client`    | Design system docs |
| `npm run build-storybook -w client` | Static Storybook |

Server workspace:

| Command                    | Description              |
| -------------------------- | ------------------------ |
| `npm run start -w server`  | Run API (after install)  |
| `PORT=3002 npm run dev -w server` | Custom port       |

## Project layout

```
oak-forms/
├── client/          # Vite + React 19 + TypeScript + Tailwind 4
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

#### Where to put a new component

1. **shadcn / base primitive** → `components/ui/` (`npx shadcn add …`)
2. **Used by one page only** → `pages/<Page>/components/<Name>/`
3. **Shared across pages** → `components/<purpose>/`:
   - `form` — inputs, labels, RHF field wrappers
   - `feedback` — loading, errors, empty-page status
   - `navigation` — breadcrumbs, nav helpers
   - `brand` — Oak logo and brand-only UI
4. Promote from a page folder to `components/` only when a second page needs it.

Import shared form pieces from `@/components/form` (barrel), not deep paths.

### Routes

| Path                     | Page        |
| ------------------------ | ----------- |
| `/`                      | Home        |
| `/forms/:id/edit`        | Builder     |
| `/forms/:id`             | Fill        |
| `/forms/:id/responses`   | Responses   |

## API overview

Base path: `/api`

| Method | Path                               | Notes                    |
| ------ | ---------------------------------- | ------------------------ |
| GET    | `/health`                          | `{ ok: true }`           |
| GET    | `/forms`                           | List with submission counts |
| POST   | `/forms`                           | Create form              |
| GET    | `/forms/:id`                       | Form definition          |
| PUT    | `/forms/:id`                       | Update title / questions |
| DELETE | `/forms/:id`                       | Delete form + submissions |
| GET    | `/forms/:formId/submissions`       | List submissions         |
| POST   | `/forms/:formId/submissions`       | Create submission        |
| DELETE | `/forms/:formId/submissions/:id`   | Delete submission        |

Submission bodies are validated with `buildAnswerSchema` on the server (see `shared/`).

## Limitations

- **In-memory storage** — data is lost when the API process restarts; not suitable for production as-is
- **No auth** — anyone with a link can fill or view responses in this demo
- **CORS** — API allows `http://localhost:5173` only

## Validation and tests

- Shared answer schema: `shared/answerSchema.test.ts`
- API integration: `server/src/api.test.ts`
- Response analytics: `client/src/pages/ResponsesPage/ResponsesPage.analytics.test.ts`
