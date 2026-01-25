# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install dependencies (run both)
npm install
cd dummy-backend && npm install && cd ..

# Development (runs frontend on :3000 and backend on :8080)
npm run dev

# Frontend only
npm run dev-frontend

# Backend only
npm run dev-backend

# Build
npm run build

# Lint
npm run lint
```

## Architecture

This is a **Next.js 16+ App Router** application using React 19, better-sqlite3, and Cloudinary for image storage.

### Route Groups
- `(marketing)` - Landing page with full-screen layout
- `(content)` - Main content pages with shared `MainHeader` navigation

### Data Domains

**Meals** (`/meals`)
- SQLite table: `meals` (title, summary, instructions, creator, creator_email, image, slug)
- Images uploaded to Cloudinary via `src/lib/cloudinary.js`
- Server actions in `src/actions/meals.js`

**News** (`/news`)
- SQLite table: `news`
- Uses parallel routes: `@archive`, `@latest`, `@modal`
- Filter by year/month via catch-all route `[...filter]`

**Posts** (`/community`, `/create-post`)
- SQLite table: `posts` (id, author, body, likes)
- Server actions in `src/actions/posts.js`

### Key Patterns

**Data Fetching**: Uses `react.cache()` + `unstable_cache()` from Next.js for request deduplication and caching with tags.

**Server Actions**: Form handling uses `useActionState` pattern. Actions validate input, call lib functions, then `revalidateTag`/`revalidatePath` for cache invalidation.

**Parallel Routes**: News layout demonstrates parallel routes (`@archive`, `@latest`, `@modal`) with intercepting routes for modals using `(.)` convention.

### Database

SQLite database file: `meals.db` in project root. Shared via `src/lib/db.js`.

### Environment Variables

Required for meal image uploads (`.env.local`):
```
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_FOLDER=meals  # optional
```
