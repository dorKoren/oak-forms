# OAK Forms

Small Google-Forms-style app: build forms, share a link, collect submissions, read answers.

## Run

```bash
npm install
npm run dev
```

- Client: http://localhost:5173
- API: http://localhost:3001

## Test

```bash
npm test
```

## Structure

- `client/` — Vite + React + TypeScript
- `server/` — Express API (in-memory store)
- `shared/` — Zod schemas and types used by both
