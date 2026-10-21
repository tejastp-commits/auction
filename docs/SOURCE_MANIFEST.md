# IPL Auction Arena — Official Data Source Manifest

This manifest records every primary and supplementary data source utilized to compile the official 620+ player database for IPL Auction Arena.

| Source ID | Publisher | Official URL | Title | Publication Date | Source Type | Supported Fields |
|---|---|---|---|---|---|---|
| `bcci-pdf-2025` | BCCI / IPL | [Official Auction PDF](https://documents.iplt20.com/bcci/documents/1731674068078_TATA%20IPL%202025-%20Auction%20List%20-15.11.24.pdf) | TATA IPL 2025 Player Auction List (15.11.24) | 2024-11-15 | Official PDF Document | Full names, DOB, age, specialism, batting hand, bowling style, caps, previous teams, 2024 team, reserve prices, set codes |
| `iplt20-retentions-2025` | IPL Official | [Retentions Announcement](https://www.iplt20.com/news/article/tata-ipl-2025-player-retentions-announced) | TATA IPL 2025 Player Retentions Announced | 2024-10-31 | Official Media Advisory | 46 official franchise retentions, retaining teams, salary valuations |
| `iplt20-auction-announcement` | IPL Official | [Auction Announcement](https://www.iplt20.com/news/article/tata-ipl-2025-player-auction-list-announced) | TATA IPL 2025 Player Auction List Announced | 2024-11-15 | Official Media Advisory | Shortlist confirmation, 574 player pool breakdown, marquee set structures |
| `bcci-match-archives` | BCCI | [BCCI Match Center](https://www.bcci.tv/) | BCCI Official Match & Tournament Archives | 2024-06-01 | Primary Statistics Record | Historical career matches, runs, batting averages, strike rates, wickets, economy rates |
| `ipl-historical-auctions` | IPL Official | [IPL Historical Auctions](https://www.iplt20.com/auction) | IPL Historical Player Auction Results (2008–2025) | Multi-year | Official Event Results | All-time highest purchase records, mega/mini auction types, purchasing franchises |

## Provenance Standard & Verification Rules
1. **Zero Hallucinated Players:** Every player in the dataset corresponds to an official registration, shortlist, retention, or confirmed IPL match appearance.
2. **Monetary Normalization:** All amounts are stored in whole Indian Rupees (INR) for calculation invariants while preserving the source Lakh / Crore denominations.
3. **Age Calculation:** Derived strictly from ISO-8601 verified dates of birth relative to the tournament cutoff.
