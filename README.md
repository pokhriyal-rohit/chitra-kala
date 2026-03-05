# Chitra-Kala

Full-stack drawing community inspired by PenUp. Users can upload art, explore by hashtags/categories, join challenges, follow artists, and interact via likes/comments.

## Stack
- Frontend: React + Vite + TypeScript + Tailwind
- Backend: Node.js + Express
- Database: MongoDB + Mongoose

## Getting Started
```bash
# 1) Install deps
npm install

# 2) Start backend (from /server)
cd server
npm install
cp .env.example .env   # set secrets
npm run seed           # optional demo data
npm start

# 3) Start frontend (from project root)
cd ..
npm run dev            # http://localhost:5173
```

## Environment (server/.env)
- `MONGODB_URI` mongo connection string  
- `PORT` API port (default 5000)  
- `JWT_SECRET`, `SESSION_SECRET` auth secrets  
- `FRONTEND_URL` allowed origin  
- SMTP vars (optional) for email

## Scripts
- `npm run dev` — start frontend
- `npm run build` — production build
- `server/npm start` — start API
- `server/npm run seed` — load demo data

## Project Structure
- `src/` — React app
- `server/` — Express API
- `nbhjb/` — reference UI snapshot (do not modify)

## Security / Publishing
- Secrets kept out of git via `.gitignore` and `.env.example`
- Built assets (`dist/`) and dependencies (`node_modules/`) are ignored
