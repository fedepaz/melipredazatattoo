# 📑 GEMINI.md

This document outlines the specialized agents that assist in the development of the melipedrazatattoo application. Each agent has a specific role and expertise.

**Rule:** All communication with the user must be in **English**.

**Rule:** Before making any changes to the codebase, you **must** first consult the relevant agent profile in the `docs/agents/` directory. The agent profiles are the single source of truth for the project's architecture, patterns, and standards. Do not deviate from the guidelines documented in the agent profiles.

---

### Rule: Workflow for Reviewing Code Changes

When the user asks me to check and summarize changes in the codebase, I will follow this exact procedure:

1.  **Inspect Commits**: Use `github.list_commits` and `github.get_commit` to retrieve the details of the recent changes.
2.  **Summarize for User**: Present a clear summary of the code changes to the user.
3.  **Internal Alignment Check**: Compare the code changes against the agent documentation in the `docs/agents/` directory to check for deviations or new patterns.
4.  **Propose All Documentation Updates**: Formulate a single, comprehensive proposal for all necessary documentation changes.
5.  **Request User Confirmation**: Present the complete proposal to the user before writing any files.

---

### Rule: Workflow for Conducting Research

1.  **Prioritize Specialized Documentation**: Use `get_library_docs` and `github search_code`.
2.  **Use General Web Search**: Only if specialized tools are insufficient.
3.  **Synthesize and Cite**: Provide a concise answer with sources.

---

### Rule: Workflow for Committing and Pushing New Work

1.  **Execute "Workflow for Reviewing Code Changes"**.
2.  **Execute "Workflow for Conducting Research"**.
3.  **Generate and Internally Validate Commit Message**: Must comply with `commitlint` rules.
4.  **Propose a Comprehensive Plan**.
5.  **Execute Commit and Push** after final approval.

---

### Rule: Workflow for UX/UI Feature Review

When asked to review a new feature's UI/UX, follow this procedure:

1.  **Activate Specialized Skill**: Use `activate_skill` with `ui-ux-pro-max`.
2.  **Analyze Against Guidelines**: Evaluate the feature's components against `docs/agents/uxui-designer-output.md` and the `ui-ux-pro-max` intelligence.
3.  **Check Core Areas**:
    - **Color Tokens**: Verify use of OKLCH variables (no hardcoded hex/colors).
    - **Responsiveness**: Ensure mobile-first and adaptive layouts.
4.  **Propose Improvements**: Suggest specific code changes to align with standards.
5.  **Update Documentation**: Append new components to `docs/project-documentation/components-list.md`.
6.  **Seek Approval**: Present the analysis and documentation updates to the user.

---

## 🎯 Purpose

---

## 📂 Core Reference Documents

Agents must **always read and apply** the following project guides:

1. `docs/agents/frontend-agent-output.md`
2. `docs/agents/product-manager-output.md`
3. `docs/agents/uxui-designer-output.md`

---

## ⚖️ Rules of Engagement

- **Do not invent tech.** Only use tools defined in `tech_stack_guide.md`.
- \***\*Default Stack**: `Next.js 15 (App Router) + React Server Components + Tailwind CSS + shadcn/ui + Supabase (Postgres, Auth, RLS)`.
- **Architecture**: Single Next.js application. **No separate backend server**. All data mutations, auth checks, and booking logic run via Next.js Server Actions or Route Handlers.
- **Database Security**:
  - Client-side uses Supabase `anon` key + strict Row-Level Security (RLS).
  - Server-side uses `service_role` key **only** inside `use server` functions, middleware, or Route Handlers. Never exposed to the browser.
- **Deployment**: Vercel (zero-config). Custom domain + automatic preview deployments.

---

## 🛠️ Development Standards

- **Repository Structure**: Single app (no monorepo, no workspaces).
- **Package Manager**: `pnpm` (recommended) or `npm`.
- **Local Quality Gates**: ESLint (Next.js config), Prettier, TypeScript strict mode.
- **Git Hooks**: Husky + `commitlint` enforcing Conventional Commits.
- **State Management**: React Server Components + URL search params + Supabase real-time (no Redux/Zustand unless explicitly justified).
- **Validation**: `Zod` for all form inputs, Server Action payloads, and API contracts.

---

## ✅ Success Criteria

- **Performance**: Sub-1s First Contentful Paint on mobile. `next/image` used for all media.
- **Booking Flow**: Clients can view availability, lock slots, and confirm appointments without page reloads. Concurrent booking conflicts handled via Supabase real-time/RLS.
- **Admin Security**: `/admin` protected by Supabase Auth + Next.js middleware. Artist can manage availability, view bookings, and update profile.
- **Code Quality**: Zero TypeScript errors, strict Zod validation on all mutations, RLS policies tested, Conventional Commits enforced.
- **Deployment**: Push to `main` → automatic Vercel build → live on custom domain within minutes.

---

_This file is the AI agent’s constitution. Always follow it._
