# Hotel Moon — How to Run

## Prerequisites
- Node.js 18+
- MongoDB running locally on port 27017

## Quick Start

```bash
# From project root
npm run dev
```

This starts both:
- **Backend** → http://localhost:5000
- **Frontend** → http://localhost:5173

## Admin Login
- URL: http://localhost:5173/admin
- Email: `admin@hotelmoon.com`
- Password: `HotelMoon@2024`

## What's Included
- Home, Rooms, Amenities, Gallery, About, Contact pages
- Online booking form with date picker
- Admin dashboard: Bookings, Rooms management, Messages
- MongoDB auto-seeded with 6 rooms on first run

## Env Config
Edit `server/.env` to change MongoDB URI, JWT secret, or admin credentials.
