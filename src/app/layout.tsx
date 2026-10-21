import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'IPL Auction Arena — Live Multiplayer IPL Auction Simulator',
  description:
    'Experience the live bidding tension of an official IPL auction with friends. Real-time multiplayer, 10 iconic franchises, authentic player stats, and persistent squad intelligence reports.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
        <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center font-black text-slate-950 text-xl shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
                🏏
              </div>
              <div>
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center gap-1.5">
                  IPL <span className="text-amber-400">AUCTION</span> ARENA
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block -mt-1">
                  Live Multiplayer Simulator
                </span>
              </div>
            </Link>

            <nav className="flex items-center gap-4">
              <Link
                href="/players"
                className="text-xs sm:text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors"
              >
                Player Database
              </Link>
              <Link
                href="/rules"
                className="text-xs sm:text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors"
              >
                Rules & Scoring
              </Link>
              <Link
                href="/"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500 hover:text-slate-950 transition-all"
              >
                + New Room
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1 flex flex-col">{children}</main>

        <footer className="border-t border-slate-900 bg-slate-950/60 py-6 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p>© {new Date().getFullYear()} IPL Auction Arena. Built for competitive cricket enthusiasts.</p>
            <p className="text-[11px] text-slate-500">
              Verified historical statistics • Server-authoritative bidding transactions
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
