import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { Gavel, Users, FileText, BarChart3 } from 'lucide-react';

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
    <html lang="en">
      <body className="min-h-screen bg-[#FAF9F6] text-slate-900 flex flex-col selection:bg-indigo-100 selection:text-indigo-900 antialiased pastel-mesh-bg">
        {/* SUBTLE PASTEL NOTIFICATION RIBBON */}
        <div className="w-full bg-indigo-50/70 border-b border-indigo-100/70 text-[11px] py-1.5 px-4 text-center text-indigo-900 flex items-center justify-center gap-3">
          <span className="flex items-center gap-1.5 font-medium tracking-wide">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            2025 BCCI Auction Pool Ready • 622 Official Players Loaded
          </span>
          <span className="hidden sm:inline text-indigo-300">•</span>
          <span className="hidden sm:inline text-indigo-700/80 font-normal">
            Server-synchronized live multiplayer bidding
          </span>
        </div>

        {/* CLEAN PASTEL HEADER */}
        <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-md transition-all">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center font-bold text-indigo-600 shadow-sm group-hover:bg-indigo-100 group-hover:scale-105 transition-all">
                <Gavel className="w-4 h-4 stroke-[2.2]" />
              </div>
              <div>
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 flex items-center gap-1">
                  IPL <span className="text-indigo-600">Auction</span> Arena
                </span>
              </div>
            </Link>

            <nav className="flex items-center gap-2 sm:gap-4">
              <Link
                href="/players"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-indigo-600 px-3 py-1.5 rounded-lg hover:bg-slate-100/70 transition-all"
              >
                <Users className="w-3.5 h-3.5 text-slate-400" />
                <span>Player Catalog</span>
                <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono font-medium">622</span>
              </Link>

              <Link
                href="/rules"
                className="hidden md:inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-indigo-600 px-3 py-1.5 rounded-lg hover:bg-slate-100/70 transition-all"
              >
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                <span>Rules</span>
              </Link>

              <Link
                href="/reports/sample-mega-auction-2024"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-indigo-600 px-3 py-1.5 rounded-lg hover:bg-slate-100/70 transition-all"
              >
                <BarChart3 className="w-3.5 h-3.5 text-emerald-500" />
                <span className="hidden xs:inline">Sample</span> Report
              </Link>

              <Link
                href="/"
                className="inline-flex items-center gap-1 text-xs font-bold px-3.5 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-sm active:scale-95"
              >
                <span>+ New Room</span>
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1 flex flex-col">{children}</main>

        {/* MINIMAL CLEAN FOOTER */}
        <footer className="border-t border-slate-200/70 bg-white py-8 text-xs text-slate-500">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <p className="font-semibold text-slate-800">
                IPL Auction Arena
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Simulated cricket war room for friends & fantasy leagues. 622 official players with server-authoritative bidding.
              </p>
            </div>
            <div className="text-[11px] text-slate-400">
              © {new Date().getFullYear()} IPL Auction Arena. Fan simulation project.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
