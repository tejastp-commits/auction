# IPL Auction Arena 🏏
### Production-Style Multiplayer IPL Auction Simulator & Intelligence Platform

IPL Auction Arena is a full-featured real-time multiplayer cricket franchise auction simulator inspired by the Indian Premier League (IPL).

Create a private auction room, invite friends through a shareable link, take control of an iconic IPL franchise, receive an equal virtual purse, and compete in live timer-backed bidding wars with authentic historical statistics and post-auction analytical squad reports.

---

## 🌟 Key Features

- **Multiplayer Room Lifecycle:** Create rooms, share instant invite URLs, choose from all 10 IPL franchises, with strict one-owner-per-franchise enforcement.
- **Server-Authoritative Bidding:** Atomic bid acceptance, idempotency keys, race-condition protection, and zero double-selling or overspending.
- **Synchronized Bid Countdown:** Live timer with automatic bid extensions (resets to 15s if bid placed under 10s).
- **Verified Historical Player Database:** Comprehensive dataset covering IPL superstars and domestic match-winners with verified dates of birth, calculated ages, batting & bowling styles, bowling classifications, and career statistics (runs, wickets, strike rate, economy).
- **100-Point Squad Intelligence Engine:** Post-auction analytics across 6 weighted dimensions (Batting 25%, Bowling 25%, Balance 15%, Historical Performance 15%, Budget Efficiency 10%, Squad Bounds 10%).
- **Permanent Shareable Report URLs:** Accessible after live sessions end (`/reports/[slug]` and `/reports/[slug]/[franchise]`).

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, React 18, TypeScript)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Backend Persistence:** PostgreSQL / [Supabase](https://supabase.com/) & Authoritative State Engine
- **Testing:** [Vitest](https://vitest.dev/) (100% test pass rate across currency, bidding rules, squad bounds, and analytics)
- **Deployment Target:** [Vercel](https://vercel.com/)

---

## 🚀 Quick Start (Local Development)

### 1. Clone & Install
```bash
git clone <repo-url>
cd auction
npm install
```

### 2. Run Automated Test Suite
```bash
npm test
```
All 13 unit, integration, and simulation tests will run and validate the auction rules and squad evaluations.

### 3. Build & Run
```bash
# Production build
npm run build

# Start local server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📊 Pre-Seeded Sample Report
Inspect an actual completed auction evaluation report immediately without needing to run a live session:
- **URL Route:** [`/reports/sample-mega-auction-2024`](http://localhost:3000/reports/sample-mega-auction-2024)

---

## 📂 Repository Structure

```
├── docs/
│   ├── ANALYTICS.md           # 100-point squad evaluation specification
│   ├── OPERATIONS.md          # Operations, security, and troubleshooting guide
│   └── PROVENANCE.md          # Player dataset source coverage and verification
├── src/
│   ├── app/
│   │   ├── api/auction/       # Server-authoritative mutation & query endpoints
│   │   ├── api/players/       # Verified player catalog search & filter endpoint
│   │   ├── api/reports/       # Persistent snapshot retrieval endpoint
│   │   ├── players/           # Historical player catalog browser
│   │   ├── reports/           # Shareable tournament & franchise report pages
│   │   ├── room/[code]/       # Live multiplayer auction arena & lobby
│   │   ├── rules/             # Official rules & scoring guide
│   │   └── page.tsx           # Arena landing page & room creator
│   ├── data/
│   │   ├── franchises.ts      # 10 official IPL franchises
│   │   └── players.ts         # Verified historical player records & statistics
│   └── lib/
│       ├── analytics.ts       # 100-point multi-factor team evaluation engine
│       ├── auction-store.ts   # Authoritative transaction-safe auction store
│       ├── currency.ts        # Integer rupee accounting & bid increment bands
│       └── types.ts           # Unified data models and interfaces
├── supabase/
│   ├── migrations/            # Normalized PostgreSQL DDL schema
│   └── seed.sql               # Seed scripts for franchises and players
└── tests/
    ├── auction.test.ts        # Unit & integration test suite
    └── sample-report.test.ts  # End-to-end simulated auction generator
```

---

## 🔒 Security & Invariants
- **Server-Authoritative:** All critical mutations (bidding, timer expiration, sale finalization) occur on the server.
- **Idempotency Keys:** Every bid uses a unique `commandId` to prevent network replays.
- **Integer Accounting:** All rupees stored as 64-bit integers to eliminate floating point rounding errors.
