# IPL Auction Arena — Operations, Security & Troubleshooting Guide

## 1. Security Architecture
- **Server-Authoritative State:** Clients submit mutations (`place_bid`, `start_auction`, `finalize_player`); the server validates ownership, purse sufficiency, deadlines, and squad quotas before committing.
- **Idempotency Keys:** Every bid requires a unique `command_id` to eliminate network duplicates and replay attacks.
- **Private Token Authentication:** Participant session tokens (`sessionToken`) prevent unauthorized users from hijacking franchise bidding.
- **No Floating-Point Arithmetic:** All rupee values are stored as 64-bit integer units (`BIGINT` in PostgreSQL).

---

## 2. Supabase Production Deployment
To connect the application to a production Supabase project:

1. **Create Supabase Project:** Navigate to [supabase.com](https://supabase.com) and create a project.
2. **Execute Migrations:**
   In the Supabase SQL Editor, run:
   ```sql
   -- Run contents of supabase/migrations/20261021_initial_schema.sql
   -- Run contents of supabase/seed.sql
   ```
3. **Configure Environment Variables in Vercel:**
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

---

## 3. Vercel Deployment Instructions
1. Push this repository to GitHub or import directly in Vercel.
2. Framework Preset: **Next.js**.
3. Build Command: `npm run build`.
4. Output Directory: `.next`.
5. Deploy and verify the live public URL.

---

## 4. Operational Troubleshooting
| Symptom | Cause | Solution |
|---|---|---|
| Bid rejected: Insufficient purse | Bid amount exceeds franchise remaining purse | Verify franchise ledger on sidebar |
| Bid rejected: Overseas limit | Squad already has 8 overseas players | Acquire domestic Indian talent |
| Clock discrepancy | Client device time out of sync with server | The application calculates `serverTimeOffset` automatically on heartbeat |
| Room not found | Room code expired or mistyped | Verify 6-character room code from invite URL |
