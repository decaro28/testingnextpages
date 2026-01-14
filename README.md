# next_template (Next.js Full-Stack Template)

## Goal
Ship fast with high-quality UI and a simple, repeatable structure. One repo. One deploy (Vercel). TypeScript everywhere.

---

## Tech Stack
- **Next.js (App Router) + TypeScript**
- **Tailwind CSS**
- **shadcn/ui** (Radix-based components copied into repo)
- **GSAP** (animations)
- **Postgres** Using NEON
- Deploy: **Vercel**

---

## Project Structure (do not invent new patterns)
- `src/app/**`  
  Pages + layouts (URL routes). Server Components by default.
- `src/app/api/**/route.ts`  
  Backend endpoints (Route Handlers). Thin controllers only.
- `src/server/**`  
  Server-only modules: DB pool, SQL helpers, business logic. No React.
- `src/components/**`  
  Reusable UI components.  
  - `src/components/ui/**` = shadcn components  
  - `src/components/gsap/**` = client-only animated components
- `src/lib/**`  
  Shared pure utilities (no secrets, no DB).

---

## Routing Rules
- Page route: `src/app/<route>/page.tsx` → `/<route>`
- API route: `src/app/api/<name>/route.ts` → `/api/<name>`
- Dynamic routes: `[...]` folders.

---

## Frontend ↔ Backend Rules
- Frontend calls backend ONLY via **relative** `/api/*` (`fetch("/api/...")`).
- DB access ONLY in `src/server/**` and ONLY called from `src/app/api/**`.
- Never import `src/server/**` from any `"use client"` file.

---

## Server Rules
- No Express. Next Route Handlers are the backend.
- Use a single cached Postgres pool in `src/server/db.ts` (`DATABASE_URL`).
- Route handlers should: validate input → call server function → return JSON.
- Always return consistent JSON errors (no leaking stack traces).

---

## Frontend Tools: When to Use What
- **shadcn/ui**: default for buttons, dialogs, tables, forms, dropdowns. Use it first.
- **Tailwind**: layout/spacing/typography. Keep styles in className; avoid custom CSS unless necessary.
- **GSAP**: only in `"use client"` components. Prefer small, reusable patterns (e.g., `HeroIntro`, `FadeIn`).
- Avoid new UI frameworks or CSS libraries.

---

## Styling Rules (fast + consistent)
- Use a small set of layout primitives:
  - Container: `mx-auto max-w-5xl px-6`
  - Section spacing: `py-16` / `py-20`
  - Vertical rhythm: `space-y-4`, `space-y-6`
- Prefer `flex`, `grid`, `gap-*` over custom positioning.
- Use shadcn tokens: `text-muted-foreground`, `border`, `bg-background`, etc.
- Do not hardcode random sizes/colors unless required—stay within Tailwind scale.

---

## What NOT to Do
- Do not add Express, separate backend servers, or multiple deploy targets.
- Do not add Redux or heavy state frameworks by default.
- Do not create ad-hoc folders or duplicate patterns.
- Do not add custom CSS for things Tailwind already solves.
- Do not write GSAP in Server Components.


---

## Environment
- `DATABASE_URL` required for DB routes.
- Use `.env.local` for local dev; set env vars in Vercel for Preview + Production.

