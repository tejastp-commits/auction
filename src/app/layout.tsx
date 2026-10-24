import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { Gavel, Users, FileText, BarChart3 } from 'lucide-react';
import ThemeCustomizer from '@/components/ThemeCustomizer';

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
      <head>
        {/* Anti-FOUC script for instant theme hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var themeId = localStorage.getItem('auction_theme_id') || localStorage.getItem('auction_theme_preference') || 'pastel';
                var accent = localStorage.getItem('auction_custom_accent') || localStorage.getItem('auction_theme_accent');
                document.documentElement.setAttribute('data-theme', themeId);
                if (accent) {
                  document.documentElement.style.setProperty('--theme-accent', accent);
                  document.documentElement.style.setProperty('--theme-accent-light', accent + '28');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased selection:bg-indigo-500/20 selection:text-indigo-400">
        {/* SUBTLE THEMED TOP NOTIFICATION RIBBON */}
        <div className="w-full theme-subtle-box border-b text-[11px] py-1.5 px-4 text-center flex items-center justify-center gap-3">
          <span className="flex items-center gap-1.5 font-medium tracking-wide">
            <span className="inline-block w-2 h-2 rounded-full theme-btn-primary animate-pulse" />
            2025 BCCI Auction Pool Ready • 622 Official Players Loaded
          </span>
          <span className="hidden sm:inline opacity-40">•</span>
          <span className="hidden sm:inline opacity-70 font-normal">
            Server-synchronized live multiplayer bidding
          </span>
        </div>

        {/* DYNAMIC THEMED HEADER */}
        <header className="sticky top-0 z-40 border-b theme-border theme-card/90 backdrop-blur-md transition-all">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl theme-accent-badge flex items-center justify-center font-bold theme-accent-text shadow-sm group-hover:scale-105 transition-all">
                <Gavel className="w-4 h-4 stroke-[2.2]" />
              </div>
              <div>
                <span className="font-extrabold text-base sm:text-lg tracking-tight flex items-center gap-1">
                  IPL <span className="theme-accent-text">Auction</span> Arena
                </span>
              </div>
            </Link>

            <nav className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/players"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium opacity-80 hover:opacity-100 px-3 py-1.5 rounded-lg hover:bg-slate-500/10 transition-all"
              >
                <Users className="w-3.5 h-3.5 opacity-60" />
                <span>Player Catalog</span>
                <span className="text-[10px] theme-subtle-box px-1.5 py-0.5 rounded font-mono font-medium">622</span>
              </Link>

              <Link
                href="/rules"
                className="hidden md:inline-flex items-center gap-1.5 text-xs font-medium opacity-80 hover:opacity-100 px-3 py-1.5 rounded-lg hover:bg-slate-500/10 transition-all"
              >
                <FileText className="w-3.5 h-3.5 opacity-60" />
                <span>Rules</span>
              </Link>

              <Link
                href="/reports/sample-mega-auction-2024"
                className="hidden xs:inline-flex items-center gap-1.5 text-xs font-medium opacity-80 hover:opacity-100 px-3 py-1.5 rounded-lg hover:bg-slate-500/10 transition-all"
              >
                <BarChart3 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Sample Report</span>
              </Link>

              {/* INTEGRATED LUXURY THEME PILL */}
              <ThemeCustomizer />
            </nav>
          </div>
        </header>

        <main className="flex-1 flex flex-col">{children}</main>

        {/* MINIMAL THEMED FOOTER */}
        <footer className="border-t theme-border theme-card py-8 text-xs opacity-75">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <p className="font-semibold">
                IPL Auction Arena
              </p>
              <p className="text-[11px] opacity-70 mt-0.5">
                Multiplayer cricket auction simulator. 622 official BCCI players with server-authoritative bidding.
              </p>
            </div>
            <div className="text-[11px] opacity-60">
              © {new Date().getFullYear()} IPL Auction Arena. Built for competitive cricket fans.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
