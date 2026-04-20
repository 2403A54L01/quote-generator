# Quotely — Random Quote Generator

A beautiful, full-screen random quote generator with mood filtering, favorites, and history. Built with **React + Vite** (frontend) and **Express** (backend).

![preview](https://img.shields.io/badge/stack-React%20%2B%20Vite%20%2B%20Express-6d3aff)

## ✨ Features
- 48+ curated quotes across 8 moods (Happy, Sad, Motivation, Love, Wisdom, Success, Funny, Calm)
- Smooth fade animation between quotes
- ❤️ Favorites tab (persisted in localStorage)
- ⟲ History tab (last 20 viewed)
- 📋 Copy to clipboard
- 🐦 Share on X / Twitter
- Fully responsive, full-screen design with editorial typography

## 📁 Project Structure
```
random-quote-generator/
├── public/
├── server/
│   └── index.js          # Express API
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Getting Started

```bash
npm install
npm start          # runs frontend (5173) + backend (5000) together
```

Or run them separately:
```bash
npm run server     # backend on http://localhost:5000
npm run dev        # frontend on http://localhost:5173
```

Open http://localhost:5173

## 🔌 API
- `GET /api/quote?mood=happy` → returns one random quote (mood is optional, use `all` or omit for any)
- `GET /api/quotes` → returns the full list

## 📦 Build for Production
```bash
npm run build      # outputs to dist/
npm run preview    # preview the production build
```

## ☁️ Deployment

### GitHub
```bash
git init
git add .
git commit -m "Initial commit: Quotely"
git branch -M main
git remote add origin https://github.com/<your-username>/random-quote-generator.git
git push -u origin main
```

### Vercel (frontend + serverless API)
1. Push to GitHub.
2. Import the repo on [vercel.com](https://vercel.com).
3. Framework preset: **Vite**. Build command: `npm run build`. Output: `dist`.
4. To run the Express API on Vercel, move `server/index.js` to `api/quote.js` as a serverless function, or deploy the backend separately on Render.

### Render (backend)
1. Create a new **Web Service** on [render.com](https://render.com), connect the repo.
2. Build command: `npm install`. Start command: `node server/index.js`.
3. Update the frontend `vite.config.js` proxy or use a `VITE_API_URL` env var to point to the Render URL.

### GitHub Pages (frontend only)
Build the app, then publish `dist/` with [`gh-pages`](https://www.npmjs.com/package/gh-pages):
```bash
npm i -D gh-pages
npx gh-pages -d dist
```
Note: GitHub Pages is static-only — you'll need to deploy the API elsewhere (Render, Fly, Railway).

## 📝 License
MIT
