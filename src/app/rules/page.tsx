import Link from 'next/link';

export default function RulesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      <div className="mb-6 flex items-center gap-2 text-xs text-slate-400">
        <Link href="/" className="hover:text-amber-400">
          ← Arena Home
        </Link>
        <span>/</span>
        <span className="text-slate-200 font-semibold">Rules & Scoring Specification</span>
      </div>

      <div className="ipl-card p-8 rounded-3xl border border-slate-800 mb-8">
        <h1 className="text-3xl font-black text-white mb-2">Auction Engine Rules & Scoring</h1>
        <p className="text-xs text-slate-400">
          Official simulation specifications governing purse accounting, bidding increments, and the 100-point squad evaluation model.
        </p>
      </div>

      <div className="space-y-6 text-sm text-slate-300">
        {/* SECTION 1 */}
        <div className="ipl-card p-6 rounded-2xl border border-slate-800">
          <h2 className="text-base font-bold text-amber-400 mb-3">1. Purse Accounting & Squad Limits</h2>
          <ul className="space-y-2 text-xs list-disc list-inside text-slate-300 leading-relaxed">
            <li><strong>Starting Purse:</strong> Each franchise begins with an equal virtual purse of ₹120 Crore (configurable by host).</li>
            <li><strong>Purse Invariant:</strong> Remaining Purse = Starting Purse − Sum of Winning Purchase Prices. Purchases are atomic; a franchise can never overspend or place a bid higher than its available purse.</li>
            <li><strong>Squad Bounds:</strong> Minimum squad requirement is 18 players; maximum squad limit is 25 players.</li>
            <li><strong>Overseas Limit:</strong> A maximum of 8 overseas (international) players is permitted per squad. The auction engine automatically rejects bids from franchises that have reached their overseas ceiling.</li>
          </ul>
        </div>

        {/* SECTION 2 */}
        <div className="ipl-card p-6 rounded-2xl border border-slate-800">
          <h2 className="text-base font-bold text-amber-400 mb-3">2. Bid Increment Schedule</h2>
          <p className="text-xs text-slate-400 mb-3">
            IPL Auction Arena enforces standard progressive price bands for valid minimum raises:
          </p>
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left border border-slate-800 rounded-xl overflow-hidden">
              <thead className="bg-slate-900 text-slate-400 uppercase text-[10px]">
                <tr>
                  <th className="p-2.5">Current Bid Band</th>
                  <th className="p-2.5">Minimum Bid Increment</th>
                  <th className="p-2.5">Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 bg-slate-950/60">
                <tr>
                  <td className="p-2.5 font-medium text-white">Opening Bid (₹0)</td>
                  <td className="p-2.5 text-amber-400 font-bold">Player Base Price</td>
                  <td className="p-2.5 text-slate-400">₹2.00 Cr</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium text-white">Below ₹1.00 Crore</td>
                  <td className="p-2.5 text-amber-400 font-bold">+ ₹20 Lakhs</td>
                  <td className="p-2.5 text-slate-400">₹60 L → ₹80 L</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium text-white">₹1.00 Cr to ₹5.00 Crore</td>
                  <td className="p-2.5 text-amber-400 font-bold">+ ₹25 Lakhs</td>
                  <td className="p-2.5 text-slate-400">₹2.00 Cr → ₹2.25 Cr</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium text-white">₹5.00 Cr to ₹10.00 Crore</td>
                  <td className="p-2.5 text-amber-400 font-bold">+ ₹50 Lakhs</td>
                  <td className="p-2.5 text-slate-400">₹7.00 Cr → ₹7.50 Cr</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium text-white">Above ₹10.00 Crore</td>
                  <td className="p-2.5 text-amber-400 font-bold">+ ₹1.00 Crore</td>
                  <td className="p-2.5 text-slate-400">₹14.00 Cr → ₹15.00 Cr</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 3 */}
        <div className="ipl-card p-6 rounded-2xl border border-slate-800">
          <h2 className="text-base font-bold text-amber-400 mb-3">3. 100-Point Squad Evaluation Model</h2>
          <p className="text-xs text-slate-400 mb-4 leading-relaxed">
            Upon auction completion, the engine runs an explainable 100-point evaluation framework across 6 dimensions to rank all squads:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="font-bold text-white block">🏏 Batting Quality & Depth (25%)</span>
              <span className="text-[11px] text-slate-400 block mt-1">
                Top-order firepower, strike rates, aggregate career runs, boundary percentages, and middle-overs acceleration.
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="font-bold text-white block">🎯 Bowling Quality & Depth (25%)</span>
              <span className="text-[11px] text-slate-400 block mt-1">
                Pace-spin balance, death yorker specialists, economy rates under 8.0, and aggregate career wickets.
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="font-bold text-white block">⚖️ Role Balance & Flexibility (15%)</span>
              <span className="text-[11px] text-slate-400 block mt-1">
                Wicketkeeper coverage, multi-dimensional all-rounders, and left/right batting combinations.
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="font-bold text-white block">📜 Historical Performance (15%)</span>
              <span className="text-[11px] text-slate-400 block mt-1">
                Total IPL match experience, centuries, and proven tournament match-winners.
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="font-bold text-white block">💰 Budget Efficiency (10%)</span>
              <span className="text-[11px] text-slate-400 block mt-1">
                Price-to-value ratio, bargain signings acquired below baseline models, and remaining purse management.
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="font-bold text-white block">📋 Squad Completeness (10%)</span>
              <span className="text-[11px] text-slate-400 block mt-1">
                Compliance with minimum squad size (18) and adherence to the 8-player overseas quota.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
