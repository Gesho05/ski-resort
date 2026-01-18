**Overview**
- **Purpose:** Ski resort landing page with parallax sections, interactive bento grid, and overlays for weather, prices, gallery, and news.
- **Framework:** Next.js 16 + React 19 + TypeScript
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion
- **Icons:** lucide-react

**Features**
- **Three Parallax Sections:** Independent parallax backgrounds (photo1 → photo2 → photo1) with scroll snap between sections.
- **Interactive Overlays:** `WeatherOverlay`, `PricesOverlay`, `GalleryOverlay`, `NewsOverlay` shown via `AnimatePresence` and local state.
- **News API + DB:** MongoDB-backed `News` model, `/api/news` route, and a seed script.
- **Assets:** Images served from `public/pictures` (e.g., `photo1.png`, `photo2.png`, `miniLogo.png`).

**Tech Stack**
- **Runtime:** `next@16.1.1`, `react@19.2.3`
- **UI/FX:** `tailwindcss@^4`, `framer-motion@^12`
- **Icons:** `lucide-react`
- **DB:** `mongoose@^9` (MongoDB connection via `MONGODB_URI`)

**Getting Started**
- **Prerequisites:** Node.js 18+ and a MongoDB connection string.
- **Install dependencies:**
	- In `cmd.exe` run: `npm install`
- **Start dev server:**
	- In `cmd.exe` run: `npm run dev`
	- Open `http://localhost:3000`
- If using PowerShell and you hit execution policy issues, switch to `cmd.exe` for running npm commands.

**Environment & Database**
- Create `ski/.env.local` with:
	- `MONGODB_URI="your-mongodb-connection-string"`
- Connection is initialized in `lib/db.ts`. The API route `app/api/news/route.ts` reads/writes via Mongoose.

**Seed Data**
- Seeds are defined in `data/seed-data.ts` and the `News` schema in `models/News.ts`.
- To seed the DB (from the `ski` folder):
	- `npx tsx scripts/seed.ts`
	- Ensure `.env.local` exists and `MONGODB_URI` is valid.

**Available Scripts**
- `npm run dev`: Start Next.js dev server.
- `npm run build`: Build for production.
- `npm run start`: Start the production server.
- `npm run lint`: Run ESLint.

**API Endpoints**
- `GET /api/news`: Returns `{ success: true, data: News[] }` sorted by `createdAt` descending.

**Assets**
- Place images in `public/pictures/` and reference with `/pictures/<name>`. Example: `/pictures/photo1.png`.
- Favicon/logo uses `/pictures/miniLogo.png` configured in `app/layout.tsx` metadata.

**Troubleshooting**
- **Hydration warnings in dev:** Some browser extensions inject attributes causing mismatch warnings. This project reduces noise via `reactStrictMode: false` in `next.config.ts` and selective `suppressHydrationWarning` on key containers.
	- For stricter checks in production, you can re-enable `reactStrictMode` after verifying extensions are disabled.
- **Image paths:** Use absolute public paths like `/pictures/photo1.png`; avoid relative paths inside `app/`.
- **Windows shell issues:** If PowerShell policy blocks scripts, run commands from `cmd.exe`.

**Deployment**
- Build: `npm run build`
- Start: `npm run start`
- Deploy options: Vercel, or any Node-capable host. Ensure `MONGODB_URI` is set in the host environment.
