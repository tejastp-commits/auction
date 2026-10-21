# IPL Auction Arena — Squad Intelligence & 100-Point Scoring Model

**Analytics Model Version:** `100-point-v1`

---

## 1. Executive Summary
The squad evaluation engine analyzes every franchise upon auction completion. Rather than assigning arbitrary ratings, it calculates an explainable score out of 100 based on 6 core dimensions grounded in historical T20 performance data, tactical balance, and financial discipline.

---

## 2. Dimension Weights & Scoring Breakdown

| Dimension | Weight | Max Points | Key Criteria Evaluated |
|---|---|---|---|
| **Batting Quality & Depth** | 25% | 25 | Top-order pedigree, aggregate career runs, top-5 average strike rate, boundary capability |
| **Bowling Quality & Depth** | 25% | 25 | Pace-spin combination, career wickets, death-overs economy rates under 8.0 |
| **Role Balance & Flexibility** | 15% | 15 | Specialist wicketkeepers (1-2), multi-dimensional all-rounders, left/right batting mix |
| **Historical Performance** | 15% | 15 | Aggregate IPL match experience (800+ matches), career centuries, proven match-winners |
| **Budget Efficiency** | 10% | 10 | Value-to-cost ratio against baseline player valuations, healthy remaining purse |
| **Squad Bounds & Quotas** | 10% | 10 | Meeting minimum squad limits (18) and strictly adhering to the 8-player overseas quota |

---

## 3. Player Baseline Valuation Algorithm
Player estimated valuations are calculated dynamically using:
$$\text{Valuation} = \text{Base Price} + \Delta_{\text{Batting}} + \Delta_{\text{Bowling}} + \Delta_{\text{AllRounder}}$$

- **Batting Bonus:** Runs $> 2000$ (+₹4 Cr), Strike Rate $\ge 140$ (+₹2 Cr), Average $\ge 35$ (+₹2 Cr)
- **Bowling Bonus:** Wickets $> 100$ (+₹4 Cr), Economy Rate $\le 7.5$ (+₹2.5 Cr)
- **All-Rounder Scarcity Bonus:** Dual contribution exceeding 1,000 runs and 30 wickets (+₹3 Cr)

Bargain buys are designated when the winning purchase price is below the estimated baseline valuation.

---

## 4. Tactical Outputs
For each franchise, the model generates:
1. **Strengths:** Verified tactical assets (e.g. elite strike-rate top order, death bowling depth).
2. **Weaknesses / Vulnerabilities:** Flagged squad gaps (e.g. no specialist wicketkeeper, missing spin options).
3. **Recommended Playing XI:** Strategically ordered 11-player lineup balancing keepers, top order, all-rounders, and bowling attack.
4. **Permanent Public Slug:** Frozen snapshot allowing reproducible retrospective analysis.
