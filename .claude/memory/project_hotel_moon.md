---
name: project-hotel-moon
description: Hotel Moon MERN stack website — full project structure and tech choices
metadata:
  type: project
---

Full MERN stack hotel website built for Hotel Moon, Firozabad.

**Stack:** React + Vite (Tailwind v4 via @tailwindcss/vite), Express, MongoDB/Mongoose, JWT auth.

**Design:** Navy (#0f1923) + Gold (#c9a96e) + Cream (#f8f4ee). Playfair Display serif headings, Inter body. Premium/classy hotel aesthetic.

**Structure:**
- `server/` — Express API (port 5000), models: Room, Booking, Admin, Contact
- `client/` — React SPA (port 5173), proxied to server via Vite
- Root `npm run dev` starts both with concurrently

**Admin:** `/admin` login → Dashboard, Bookings, Rooms, Messages. JWT in localStorage.

**Seed:** Auto-runs on first start — creates admin account + 6 rooms.

**Why:** Built from scratch based on MMT listing (MMT page timed out). Hotel Moon is in Firozabad, UP (glass city).
