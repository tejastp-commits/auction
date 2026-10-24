import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { Gavel, Users, FileText, BarChart3, Radio } from 'lucide-react';

export const metadata: Metadata = {
  title: 'IPL Auction Arena — Live Multiplayer IPL Auction Simulator',
  description:
    'Experience the live bidding tension of an official IPL auction with friends. Real-time multiplayer, 10 iconic franchises, authentic player stats, and persistent squad intelligence reports.',
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#060913] text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950 antialiased stadium-grid">
        {/* TOP STATUS TICKER */}
        <div className="w-full bg-slate-950/90 border-b border-amber-500/10 text-[11px] py-1 px-4 text-center text-slate-400 flex items-center justify-center gap-4">
          <span className="flex items-center gap-1.5 text-amber-400 font-semibold tracking-wide">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            OFFICIAL 2025 BCCI AUCTION REGISTRY LOADED
          </span>
          <span className="hidden sm:inline text-slate-600">•</span>
          <span className="hidden sm:inline text-slate-400">
            622 Verified Players • 10 Franchises • Server-Authoritative Bidding
          </span>
        </div>

        {/* BROADCAST HEADER */}
        <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#060913]/85 backdrop-blur-xl shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3.5 group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 flex items-center justify-center font-black text-slate-950 text-xl shadow-lg shadow-amber-500/20 group-hover:scale-105 group-hover:shadow-amber-500/40 transition-all border border-amber-300/40">
                <Gavel className="w-6 h-6 text-slate-950 stroke-[2.5]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-lg sm:text-xl tracking-tight text-white flex items-center gap-1.5">
                    IPL <span className="text-amber-400">AUCTION</span> ARENA
                  </span>
                  <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    PRO BROADCAST
                  </span>
                </div>
                <span className="text-[11px] font-medium tracking-wide text-slate-400 block -mt-0.5">
                  High-Stakes Live Multiplayer War Room
                </span>
              </div>
            </Link>

            <nav className="flex items-center gap-2 sm:gap-4">
              <Link
                href="/players"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-amber-400 px-3 py-2 rounded-lg hover:bg-white/[0.04] transition-all"
              >
                <Users className="w-4 h-4 text-amber-400" />
                <span>Player Catalog</span>
                <span className="text-[10px] bg-slate-800 text-amber-400 px-1.5 py-0.2 rounded font-mono font-bold">622</span>
              </Link>

              <Link
                href="/rules"
                className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-amber-400 px-3 py-2 rounded-lg hover:bg-white/[0.04] transition-all"
              >
                <FileText className="w-4 h-4 text-blue-400" />
                <span>Rules & RTM</span>
              </Link>

              <Link
                href="/reports/sample-mega-auction-2024"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-amber-400 px-3 py-2 rounded-lg hover:bg-white/[0.04] transition-all border border-slate-800"
              >
                <BarChart3 className="w-4 h-4 text-emerald-400" />
                <span className="hidden xs:inline">Sample</span> Report
              </Link>

              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-black px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 hover:from-amber-300 hover:to-yellow-300 transition-all shadow-md shadow-amber-500/20 active:scale-95"
              >
                <span>+ Launch Room</span>
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1 flex flex-col">{children}</main>

        {/* BROADCAST FOOTER */}
        <footer className="border-t border-white/[0.08] bg-[#04060d]/90 py-10 text-xs text-slate-400">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div className="md:col-span-2 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center font-black text-slate-950 text-sm">
                    🏏
                  </div>
                  <span className="font-black text-base tracking-tight text-white">
                    IPL AUCTION ARENA
                  </span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed max-w-md">
                  A high-fidelity multiplayer cricket auction simulator engineered for competitive fans, fantasy leagues, and cricket strategists. Recreating the broadcast adrenaline of the IPL Mega Auction with authoritative server-side timing and analytics.
                </p>
                <div className="flex items-center gap-3 pt-1">
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20 font-medium">
                    <Radio className="w-3.5 h-3.5 animate-pulse" />
                    Websocket & Polling Engine Online
                  </div>
                  <div className="text-[11px] text-slate-500">
                    v2.4.0 High-Performance Release
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
                  Auction Intelligence
                </h4>
                <ul className="space-y-2 text-slate-400">
                  <li>
                    <Link href="/players" className="hover:text-amber-400 transition-colors">
                      Official 2025 Player Catalog (622)
                    </Link>
                  </li>
                  <li>
                    <Link href="/rules" className="hover:text-amber-400 transition-colors">
                      Purse, Squad Quotas & RTM Rules
                    </Link>
                  </li>
                  <li>
                    <Link href="/reports/sample-mega-auction-2024" className="hover:text-amber-400 transition-colors">
                      100-Point Squad Intel Report
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
                  Franchise Hub
                </h4>
                <div className="grid grid-cols-5 gap-2 text-center text-[10px] font-bold">
                  {['CSK', 'MI', 'RCB', 'KKR', 'SRH', 'RR', 'GT', 'DC', 'LSG', 'PBKS'].map((team) => (
                    <span key={team} className="py-1 px-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                      {team}
                    </span>
                  ))}
                </div>
                <p className="text-[11px] text-slate-500 mt-3">
                  All 10 official franchises supported with verified historical purse allocations and roster minimums.
                </p>
              </div>
            </div>

            <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
              <p>© {new Date().getFullYear()} IPL Auction Arena. Built with passion for cricket fans worldwide.</p>
              <p>Disclaimer: Fan simulation project. Team names and marks belong to their respective franchise owners and BCCI.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}