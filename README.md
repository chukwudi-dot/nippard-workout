# Jeff Nippard's Optimal Split — Workout App

A science-based Upper/Lower workout tracker with exercise demos, set tracking, and PWA support (installs on your phone like a native app).

---

## 🚀 Deploy to Vercel (Recommended — Free, 5 min)

### Step 1: Get the code onto GitHub

1. Go to **github.com** → Sign in (or create a free account)
2. Click the **+** button → **New repository**
3. Name it `nippard-workout` → Click **Create repository**
4. On your computer, open **Terminal** (Mac) or **Command Prompt** (Windows)
5. Run these commands one by one:

```bash
cd path/to/nippard-app        # navigate to this folder
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/nippard-workout.git
git push -u origin main
```

> Replace `YOUR_USERNAME` with your GitHub username

---

### Step 2: Deploy on Vercel

1. Go to **vercel.com** → Sign up with GitHub (free)
2. Click **Add New → Project**
3. Find and select your `nippard-workout` repo → Click **Import**
4. Leave all settings as default (Vercel auto-detects Vite)
5. Click **Deploy**
6. Wait ~60 seconds — you'll get a live URL like:
   `https://nippard-workout.vercel.app`

That's it. Your app is live. 🎉

---

## 📱 Add to Your Phone Home Screen (PWA)

After deploying, open the URL on your phone:

**iPhone (Safari):**
1. Open your Vercel URL in **Safari**
2. Tap the **Share** button (box with arrow)
3. Scroll down → tap **"Add to Home Screen"**
4. Tap **Add** — it appears as an app icon

**Android (Chrome):**
1. Open your Vercel URL in **Chrome**
2. Tap the **three dots menu**
3. Tap **"Add to Home screen"**
4. Tap **Add** — it appears as an app icon

The app will open **full screen** without the browser UI, just like a native app. It also **works offline** after first load thanks to the service worker.

---

## 🛠 Local Development

```bash
npm install        # install dependencies (first time only)
npm run dev        # start local dev server at localhost:5173
npm run build      # build for production
npm run preview    # preview production build locally
```

---

## Tech Stack
- **React 18** + **Vite 5** — fast build tooling
- **vite-plugin-pwa** — service worker + web manifest for PWA
- **wger.de API** — free public exercise image database (no API key needed)
- Zero external UI libraries — all custom styles

---

## Updates

Any time you change the code and push to GitHub, Vercel **automatically rebuilds and redeploys** within ~30 seconds. No manual steps needed.
