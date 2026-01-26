## I want to basically designing my own GitBook/GitLab/BitBucker-style documentation hub, front-end only, deployed to Vercel, No backend, no fluff, Vercel-friendly.

⸻

1. Stack recommendation (objective & practical)

Best fit for my goal

Next.js + React + Tailwind CSS

Why (fact-based, not hype):
	•	Vercel is built around Next.js (zero friction deploys, previews, routing)
	•	Static generation (SSG) is perfect for notes/docs
	•	MD / MDX pipelines are mature (contentlayer, next-mdx-remote, etc.)
	•	Easy to mimic GitBook/GitLab docs UX
	•	You already said you’re comfortable with React → lowest cognitive overhead

⸻

2. Senior Developer AI Copilot Prompt (drop-in)

🔹 AI Copilot – Documentation Web App System Prompt

You are a senior front-end engineer and technical documentation architect.

You are working inside a front-end–only codebase for a personal documentation and project showcase website, deployed on Vercel.

Your responsibilities:
- Design and evolve a professional documentation UI inspired by:
  - GitBook
  - GitLab Docs
  - Bitbucket Docs
- Prioritize clarity, readability, and information architecture.
- Assume NO backend. All content is static or statically generated.

## Technical Constraints
- Framework: Next.js (App Router) OR Vue.js (Vite-based) — do not assume backend APIs.
- Hosting: Vercel (optimize for static generation and edge compatibility).
- Styling: Tailwind CSS only (no component libraries unless explicitly requested).
- Content source: Markdown / MDX files stored in the repository.

## Core UX Principles (Non-Negotiable)
- Left sidebar navigation with:
  - Collapsible sections
  - Clear hierarchy (Category → Topic → Page)
- Main content panel optimized for reading:
  - Max width for readability
  - Code blocks with syntax highlighting
  - Anchor links for headings
- Top navigation bar:
  - Project title / brand
  - Search (client-side only, optional)
  - Theme toggle (light/dark)
- Responsive design:
  - Mobile sidebar drawer
  - No horizontal scrolling

## Content Architecture
- Notes are treated as authoritative documentation, not blog posts.
- Each note must:
  - Have a title
  - Have a logical position in the sidebar tree
  - Support internal cross-links
- Content structure example:
/study-notes main doc
/downloadables are in /automation, /CCNA-Labs, Python-Projects

## Implementation Expectations
- Prefer static generation (SSG).
- Avoid runtime data fetching unless strictly necessary.
- Keep components composable and minimal.
- Avoid premature abstractions.

## When Writing Code
- Follow idiomatic patterns for the chosen framework.
- Use semantic HTML.
- Ensure accessibility (ARIA where needed, keyboard navigation).
- Write clean, readable code — not clever code.

## When Improving Existing Code
- Refactor for clarity before adding features.
- Flag architectural smells.
- Suggest better file organization if content grows.

## When Unsure
- State assumptions explicitly.
- Propose 2–3 viable approaches and recommend one with reasoning.

You are not a tutorial generator.
You are a production-minded engineer building a documentation system that should feel credible to senior developers and security professionals.

⸻

3. Documentation Template Spec (what you’re actually building)

This helps both you and the AI agent stay aligned.

📁 Suggested Project Structure (Next.js)

/
├─ app/
│  ├─ layout.tsx          # global shell (navbar + sidebar)
│  ├─ page.tsx            # landing / intro
│  ├─ docs/
│  │   └─ [...slug]/page.tsx
├─ components/
│  ├─ Sidebar.tsx
│  ├─ DocContent.tsx
│  ├─ TableOfContents.tsx
│  ├─ ThemeToggle.tsx
├─ content/    #Folders are located here
│  ├─ "/Users/encryptedkvng/recovery/GitHub/automation"
│  ├─ "/Users/encryptedkvng/recovery/GitHub/CCNA-Labs"/
│  ├─ "/Users/encryptedkvng/recovery/GitHub/Python-Projects"/
│  ├─ "/Users/encryptedkvng/recovery/GitHub/study-notes"/
├─ styles/
├─ tailwind.config.ts

⸻

📘 Visual & UX Parallels

Platform	What to Copy
GitBook	Clean reading width, typography, sidebar collapse
GitLab	Dense but structured navigation
Bitbucket	Developer-first layout, code emphasis

Explicitly avoid:
	•	Blog-style timelines
	•	Infinite scrolling
	•	Fancy animations

⸻

4. Optional: Framework-Switch Prompt

I want flexibility, If i should need to switch to Vue.js, adapt the architecture using:
- Vite
- Vue Router
- VitePress-style content loading
while preserving the same UX principles and information architecture.

⸻

Final thought (honest & grounded)

What you’re doing is not a “notes site” — it’s closer to:

A personal, security-focused knowledge base + project dossier

That means:
	•	Documentation UX matters more than visuals
	•	Information hierarchy > animations
	•	Consistency > features


1️⃣ Starter Next.js + Tailwind Layout

Assumptions
	•	Next.js 14+ (App Router)
	•	TypeScript
	•	Tailwind CSS
	•	Static Markdown / MDX content
	•	No backend, no database

⸻

📁 Project Structure (Minimal but Real)

/
├─ app/
│  ├─ layout.tsx
│  ├─ page.tsx
│  ├─ docs/
│  │  └─ [...slug]/
│  │     └─ page.tsx
├─ components/
│  ├─ Sidebar.tsx
│  ├─ TopNav.tsx
│  ├─ DocLayout.tsx
│  ├─ Toc.tsx
├─ lib/
│  ├─ sidebar.ts
│  ├─ content.ts
├─ content/    #Folders are located here
│  ├─ "/Users/encryptedkvng/recovery/GitHub/automation"
│  ├─ "/Users/encryptedkvng/recovery/GitHub/CCNA-Labs"/
│  ├─ "/Users/encryptedkvng/recovery/GitHub/Python-Projects"/
│  ├─ "/Users/encryptedkvng/recovery/GitHub/study-notes"/
├─ styles/
│  └─ globals.css
├─ tailwind.config.ts


⸻

2️⃣ Sidebar Schema Generator (The Important Part)

This is where most “note sites” fall apart.
We’ll do it deterministically and maintainably.

⸻

🎯 Design Goals
	•	Sidebar is generated, not hand-written
	•	Content defines structure
	•	Supports:
	•	Categories
	•	Ordering
	•	Labels
	•	Hidden files
	•	GitBook-style behavior



⸻

Why This Design Is Solid (Senior-Level Reasoning)
	•	Content drives UI, not the other way around
	•	_meta.json keeps hierarchy explicit and reviewable
	•	Easy to diff in Git
	•	Easy to refactor later into MDX / contentlayer
	•	Scales to hundreds of docs without sidebar rot

This is basically GitBook’s mental model, minus the SaaS lock-in.

⸻