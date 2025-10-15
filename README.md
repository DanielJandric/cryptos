## Bitcoin Cycles – Predictive 1064/364 Model

Interactive analysis of Bitcoin market cycles using the 1064/364 heuristic (≈1064-day bull, ≈364-day bear). Built with Next.js 15 (App Router, TypeScript), Tailwind v4, Recharts, Zustand, Framer Motion. Includes BTC and NASDAQ overlays, hit-rate methodology, i18n (EN/FR), iPhone optimizations, PNG export, guided tour, and a theory section.

### Tech stack
- Next.js 15, React 19 (App Router, Server/Client Components)
- TypeScript, Tailwind CSS v4
- Recharts, Framer Motion, Lucide React
- Zustand for UI state
- Python `yfinance` data ingestion (BTC history/spot, NASDAQ history)

### Features
- Main chart with historical cycles, projection, bull/bear shading, halvings
- BTC spot and optional NASDAQ (^IXIC) overlay with 30‑day correlation card
- X‑axis modes (date/days), Y log/linear toggle, PNG export
- Theory section with accordions, glossary modal, TL;DR card, annotations
- Hit Rate: day‑by‑day consistency + probability that Cycle 3 repeats past cycles
- Robustness: tolerance sweeps (±1/±2/±3%) and bootstrap confidence band
- Guided tour and scrollspy; mobile bottom navigation and back‑to‑top
- EN/FR language toggle with persistence

---

## Quick start

Prereqs: Node.js 20+ and (optional) Python 3.9+.

```bash
cd bitcoin-cycles-app
npm i
# Optional: install Python deps to fetch live/historical data
npm run data:install
# Fetch BTC & NASDAQ JSONs into public/data
npm run data:fetch
# Start dev server
npm run dev
```

Open `http://localhost:3000`.

Build & run:
```bash
npm run build
npm start
```

Windows PowerShell: use `;` between commands (not `&&`).

---

## Scripts
- `npm run dev` – start Next.js dev server
- `npm run build` – production build (prerender)
- `npm start` – run the production server
- `npm run data:install` – `pip install -r scripts/requirements.txt`
- `npm run data:fetch` – run `scripts/fetch_btc.py` to refresh `public/data/*.json`

Python requirements are in `scripts/requirements.txt` (yfinance, pandas, numpy, requests).

---

## Data ingestion
The script `scripts/fetch_btc.py` fetches:
- BTC daily history (USD) and current spot price
- NASDAQ (^IXIC) daily history

Outputs JSON files under `public/data/` consumed by the chart and stat cards. You can schedule the script externally (cron/GitHub Action) for regular refreshes.

---

## Project structure (selected)
```
app/
  page.tsx              # main page composition
  layout.tsx            # metadata, viewport, global UI
  globals.css           # Tailwind base/utilities
components/
  Hero.tsx              # title section (translucent BTC bg)
  ChartSection.tsx      # main chart + controls + annotations
  CycleCards.tsx        # per‑cycle details
  ComparisonCharts.tsx  # durations/returns comparisons
  TheorySection.tsx     # 1064/364 theory accordions
  GuidedTour.tsx        # coachmarks
  GlossaryModal.tsx     # glossary
  HitRateSection.tsx    # detailed methodology & stats
  ExportPNGButton.tsx   # export chart as PNG
hooks/
  useCountdown.ts, useScrollSpy.ts, useI18n.ts
lib/
  chartData.ts          # series generation, stats, hit‑rate, bootstrap, halving context
  market.ts             # client fetchers for public/data JSONs
  store.ts              # Zustand UI state (tabs, toggles, i18n, etc.)
  constants.ts          # colors, dates, scenarios
  data/cycles.ts        # hardcoded cycle anchors (bottom/top/projection)
public/
  data/*.json           # fetched market data
  images/bitcoin-bg.png # hero background asset
scripts/
  fetch_btc.py          # yfinance data fetcher
```

---

## Internationalization (EN/FR)
Language toggle in the navbar. The choice is persisted to `localStorage`. Texts are provided via a lightweight hook `hooks/useI18n.ts` and component calls like `msg(fr, en)`.

---

## Hit rate methodology
- Consistency: day‑by‑day comparison across cycles
- Repeat probability: probability that Cycle 3 matches prior cycles within a tolerance
- Robustness: tolerance sweep at ±1%, ±2%, ±3% (`robustnessAcrossThresholds`)
- Bootstrap CI: simple bootstrap over reference cycles to estimate a 95% band (`bootstrapRepeatHitRate`)

See implementations in `lib/chartData.ts` and UI in `components/HitRateSection.tsx`.

---

## iPhone/mobile optimizations
- Safe‑area viewport and theme color in `app/layout.tsx`
- Multi‑line, wrap‑friendly toolbars and legend
- Responsive chart heights and touch targets
- Back‑to‑top, bottom navigation, fixed tour controls

---

## Deployment (Vercel)
1. Push to GitHub
2. Create a new Vercel project from the repo (framework auto‑detect)
3. Default build: `npm run build`, output: Next.js (App Router)
4. Set your custom domain if desired

Re‑deploys automatically on every push to `main`.

---

## Troubleshooting
- Windows `readlink EINVAL` during build: delete `.next/` then `npm run build`
- Hydration mismatch in live countdown: `suppressHydrationWarning` used by design
- “ssr: false” with dynamic imports: move to a client component

---

## License
No license specified.

