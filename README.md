# OAK Forms

A small Google Forms–style app: create forms in a builder, share a fill link, collect submissions, and review responses with summaries.

## Features

- **Home** — list forms, create new, jump to edit / fill / responses
- **Builder** — title, question types, options, required flags, reorder, debounced save, share link
- **Fill** — dynamic Zod validation from the form schema, submit answers
- **Responses** — table + detail, delete with confirmation, KPIs for ratings, numbers, and choice questions

Question types: short text, paragraph, number, date, select, multi-select, checkboxes, rating.

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

The Vite dev server proxies `/api` to the API. On first API start, a sample form **Client Creative Brief** is seeded in memory.

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

- **Pages** — feature folders (`HomePage/`, `BuilderPage/`, `FillPage/`, `ResponsesPage/`) with `Page.tsx`, hooks, utils, and `components/`
- **Design system** — `client/src/components/design-system/` (form atoms + `FormField`)
- **UI** — shadcn (`base-nova`) in `client/src/components/ui/`
- **Feedback** — load/error/status in `client/src/components/feedback/` (not DS)
- **API** — `client/src/api/` + TanStack Query hooks

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
