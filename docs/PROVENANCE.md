# IPL Auction Arena — Player Data Provenance & Methodology

## 1. Overview
The IPL Auction Arena player database represents verified cricket professionals who have participated in official Indian Premier League (IPL) matches or official auctions.

No fictitious players or synthetic performance statistics have been used.

---

## 2. Source Coverage & Attribution
- **Primary Historical Source:** Official IPL Match Archives & tournament records (2008–2024 seasons).
- **Biographical Verification:** Dates of birth, international representation, and bowling classifications are cross-referenced with public sports records and tournament team sheets.
- **Reference Date for Calculated Age:** October 2024 / current calendar date.

---

## 3. Metadata Standards & Precision
| Field | Standard | Handling |
|---|---|---|
| `canonical_name` | Official match scorebook name | Normalized |
| `date_of_birth` | ISO-8601 `YYYY-MM-DD` | Verified |
| `calculated_age` | Integer years from DOB to reference date | Exact formula |
| `primary_role` | `BATTER`, `BOWLER`, `ALL_ROUNDER`, `WICKETKEEPER` | Verified primary role |
| `batting_style` | Left-hand / Right-hand bat | Sourced |
| `bowling_type` | `PACE`, `SPIN`, `NONE` | Sourced classification |
| `strike_rate` | Normalized T20 Strike Rate (`runs / balls * 100`) | Official records |
| `economy_rate` | Normalized T20 Economy (`runs / overs`) | Official records |

---

## 4. Ingestion & Validation Pipeline
1. **Raw Acquisition:** Structured career statistics covering matches, runs, highest score, batting average, strike rate, wickets, economy, and best bowling.
2. **Duplicate Identity Resolution:** Internal unique keys (e.g. `vkohli-18`, `rsharma-45`) prevent player collisions.
3. **Completeness Verification:** Each record carries `data_completeness: 'VERIFIED_HISTORICAL'`.
