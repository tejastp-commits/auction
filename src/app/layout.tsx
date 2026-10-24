import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { Gavel, Users, FileText, BarChart3 } from 'lucide-react';
import ThemeCustomizer from '@/components/ThemeCustomizer';
import AuctionArenaLogo from '@/components/AuctionArenaLogo';

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
        {/* Google Fonts Preloads */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />

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

        {/* DYNAMIC THEMED HEADER (DOODLE AESTHETIC) */}
        <header className="sticky top-0 z-40 border-b-2 border-dashed theme-border bg-[var(--theme-surface)]/95 backdrop-blur-md transition-all font-doodle">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="group-hover:scale-105 transition-transform duration-300 drop-shadow-md">
                <AuctionArenaLogo size="md" />
              </div>
              <div>
                <span className="font-black text-xl sm:text-2xl tracking-tight flex items-center gap-1 text-[var(--theme-text)]">
                  IPL <span className="theme-accent-text">Auction</span> Arena 🏏
                </span>
                <span className="hidden sm:block text-xs font-bold opacity-75">
                  Hand-Drawn Multiplayer War Room
                </span>
              </div>
            </Link>

            <nav className="flex items-center gap-2 sm:gap-3 text-base font-bold">
              <Link
                href="/players"
                className="hidden sm:inline-flex items-center gap-1.5 opacity-80 hover:opacity-100 px-3 py-1.5 rounded-xl hover:bg-pink-100 transition-all border border-transparent hover:border-[#2C2825]"
              >
                <Users className="w-4 h-4 opacity-75" />
                <span>Player Catalog</span>
                <span className="text-xs bg-pink-100 px-2 py-0.5 rounded-md border border-pink-300 font-bold">622</span>
              </Link>

              <Link
                href="/rules"
                className="hidden md:inline-flex items-center gap-1.5 opacity-80 hover:opacity-100 px-3 py-1.5 rounded-xl hover:bg-pink-100 transition-all border border-transparent hover:border-[#2C2825]"
              >
                <FileText className="w-4 h-4 opacity-75" />
                <span>Rules</span>
              </Link>

              <Link
                href="/reports/sample-mega-auction-2024"
                className="hidden xs:inline-flex items-center gap-1.5 opacity-80 hover:opacity-100 px-3 py-1.5 rounded-xl hover:bg-pink-100 transition-all border border-transparent hover:border-[#2C2825]"
              >
                <BarChart3 className="w-4 h-4 text-emerald-600" />
                <span>Sample Report</span>
              </Link>

              {/* ANCHORED LUXURY THEME PICKER */}
              <ThemeCustomizer />
            </nav>
          </div>
        </header>

        <main className="flex-1 flex flex-col">{children}</main>

        {/* MINIMAL THEMED FOOTER (DOODLE STYLE) */}
        <footer className="border-t-2 border-dashed theme-border bg-[var(--theme-surface)] py-8 font-doodle text-sm opacity-90">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <AuctionArenaLogo size="sm" />
              <div>
                <p className="font-black text-lg tracking-tight">
                  IPL <span className="theme-accent-text">Auction</span> Arena 🏏
                </p>
                <p className="text-xs opacity-75 mt-0.5">
                  Multiplayer cricket auction simulator. 622 official BCCI players with server-authoritative bidding.
                </p>
              </div>
            </div>
            <div className="text-xs opacity-70">
              © {new Date().getFullYear()} IPL Auction Arena • Hand-drawn sketchbook edition
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
