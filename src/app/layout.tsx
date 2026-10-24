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

        {/* DYNAMIC THEMED HEADER */}
        <header className="sticky top-0 z-40 border-b border-[#FED7AA] bg-[#FFFBF8]/95 backdrop-blur-md transition-all">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="group-hover:scale-105 transition-transform duration-300 drop-shadow-sm">
                <AuctionArenaLogo size="md" />
              </div>
              <div>
                <span className="font-black text-lg sm:text-xl tracking-tight flex items-center gap-1.5 text-[#1E1B18] relative inline-block pb-1.5">
                  <span>IPL <span className="text-orange-600">Auction</span> Arena 🏏</span>
                  {/* Modern Hand-Drawn Doodle Underline (Zero Overlap) */}
                  <svg
                    className="w-full h-2.5 absolute bottom-0 left-0 pointer-events-none"
                    viewBox="0 0 120 10"
                    preserveAspectRatio="none"
                    fill="none"
                  >
                    <path
                      d="M2 5 Q 30 9, 60 4 T 118 5"
                      stroke="#EA580C"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M6 7 Q 34 10, 64 6 T 112 7"
                      stroke="#FDBA74"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeDasharray="3 2"
                    />
                  </svg>
                </span>
                <span className="hidden sm:block text-[10px] font-mono tracking-widest uppercase opacity-70 mt-0.5">
                  Official War Room Simulator
                </span>
              </div>
            </Link>

            <nav className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold">
              <Link
                href="/players"
                className="hidden sm:inline-flex items-center gap-1.5 opacity-80 hover:opacity-100 px-3 py-1.5 rounded-xl hover:bg-orange-50 transition-all text-[#1E1B18]"
              >
                <Users className="w-3.5 h-3.5 opacity-70" />
                <span>Player Catalog</span>
                <span className="text-[10px] bg-orange-100 text-orange-900 px-1.5 py-0.5 rounded font-mono font-bold">622</span>
              </Link>

              <Link
                href="/rules"
                className="hidden md:inline-flex items-center gap-1.5 opacity-80 hover:opacity-100 px-3 py-1.5 rounded-xl hover:bg-orange-50 transition-all text-[#1E1B18]"
              >
                <FileText className="w-3.5 h-3.5 opacity-70" />
                <span>Rules</span>
              </Link>

              <Link
                href="/reports/sample-mega-auction-2024"
                className="hidden xs:inline-flex items-center gap-1.5 opacity-80 hover:opacity-100 px-3 py-1.5 rounded-xl hover:bg-orange-50 transition-all text-[#1E1B18]"
              >
                <BarChart3 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Sample Report</span>
              </Link>

              {/* ANCHORED SIDE PALETTE PICKER */}
              <ThemeCustomizer />
            </nav>
          </div>
        </header>

        <main className="flex-1 flex flex-col">{children}</main>

        {/* MINIMAL THEMED FOOTER */}
        <footer className="border-t border-[#FED7AA] bg-[#FFFBF8] py-8 text-xs text-[#786C64]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <AuctionArenaLogo size="sm" />
              <div>
                <p className="font-extrabold text-sm tracking-tight text-[#1E1B18]">
                  IPL <span className="text-orange-600">Auction</span> Arena 🏏
                </p>
                <p className="text-[11px] opacity-75 mt-0.5">
                  Multiplayer cricket auction simulator. 622 official BCCI players with server-authoritative bidding.
                </p>
              </div>
            </div>
            <div className="text-[11px] opacity-70">
              © {new Date().getFullYear()} IPL Auction Arena. Built for competitive cricket fans.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
