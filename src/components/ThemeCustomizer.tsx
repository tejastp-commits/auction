'use client';

import { useState, useEffect, useRef } from 'react';
import { Palette, Check, X, RotateCcw, Sparkles, ChevronDown, Moon, Sun, Pencil } from 'lucide-react';

export interface ThemeDefinition {
  id: string;
  name: string;
  category: 'dark' | 'light' | 'pastel';
  bg: string;
  surface: string;
  subtle: string;
  subtleBorder: string;
  text: string;
  muted: string;
  border: string;
  accent: string;
  accentHover: string;
  accentLight: string;
  accentText: string;
  shadow: string;
  description: string;
  swatches: [string, string, string]; // [bg, surface, accent]
  isDoodle?: boolean;
}

export const THEMES: ThemeDefinition[] = [
  // 1. HAND-DRAWN DOODLE & PASTEL MODES
  {
    id: 'doodle',
    name: 'Hand-Drawn Doodle',
    category: 'pastel',
    isDoodle: true,
    bg: '#FAF7F0',
    surface: '#FFFFFF',
    subtle: '#F3EFE6',
    subtleBorder: '#2C2825',
    text: '#24201D',
    muted: '#685E53',
    border: '#2C2825',
    accent: '#6366F1',
    accentHover: '#4F46E5',
    accentLight: 'rgba(99, 102, 241, 0.15)',
    accentText: '#FFFFFF',
    shadow: '3px 3px 0px #2C2825',
    description: 'Sketched parchment & chalk doodles',
    swatches: ['#FAF7F0', '#FFFFFF', '#6366F1'],
  },
  {
    id: 'pastel-lavender',
    name: 'Pastel Lavender Mist',
    category: 'pastel',
    bg: '#F8F5FF',
    surface: '#FFFFFF',
    subtle: '#F3EBFF',
    subtleBorder: 'rgba(168, 85, 247, 0.2)',
    text: '#2E1065',
    muted: '#7E22CE',
    border: 'rgba(168, 85, 247, 0.22)',
    accent: '#8B5CF6',
    accentHover: '#7C3AED',
    accentLight: 'rgba(139, 92, 246, 0.15)',
    accentText: '#FFFFFF',
    shadow: '0 10px 30px -5px rgba(139, 92, 246, 0.08)',
    description: 'Soothing lilac cream & gentle violet',
    swatches: ['#F8F5FF', '#FFFFFF', '#8B5CF6'],
  },
  {
    id: 'pastel-mint',
    name: 'Pastel Matcha Mint',
    category: 'pastel',
    bg: '#F0FDF4',
    surface: '#FFFFFF',
    subtle: '#DCFCE7',
    subtleBorder: 'rgba(34, 197, 94, 0.2)',
    text: '#14532D',
    muted: '#16A34A',
    border: 'rgba(34, 197, 94, 0.22)',
    accent: '#10B981',
    accentHover: '#059669',
    accentLight: 'rgba(16, 185, 129, 0.15)',
    accentText: '#FFFFFF',
    shadow: '0 10px 30px -5px rgba(16, 185, 129, 0.08)',
    description: 'Gentle pistachio cream & soft jade',
    swatches: ['#F0FDF4', '#FFFFFF', '#10B981'],
  },
  {
    id: 'pastel-sky',
    name: 'Pastel Powder Sky',
    category: 'pastel',
    bg: '#F0F7FF',
    surface: '#FFFFFF',
    subtle: '#E0F2FE',
    subtleBorder: 'rgba(14, 165, 233, 0.2)',
    text: '#0C4A6E',
    muted: '#0284C7',
    border: 'rgba(14, 165, 233, 0.22)',
    accent: '#0284C7',
    accentHover: '#0369A1',
    accentLight: 'rgba(2, 132, 199, 0.15)',
    accentText: '#FFFFFF',
    shadow: '0 10px 30px -5px rgba(2, 132, 199, 0.08)',
    description: 'Soft morning sky blue & airy cyan',
    swatches: ['#F0F7FF', '#FFFFFF', '#0284C7'],
  },
  {
    id: 'pastel-peach',
    name: 'Pastel Peach Sorbet',
    category: 'pastel',
    bg: '#FFF7ED',
    surface: '#FFFFFF',
    subtle: '#FFEDD5',
    subtleBorder: 'rgba(249, 115, 22, 0.2)',
    text: '#7C2D12',
    muted: '#EA580C',
    border: 'rgba(249, 115, 22, 0.22)',
    accent: '#F97316',
    accentHover: '#C2410C',
    accentLight: 'rgba(249, 115, 22, 0.15)',
    accentText: '#FFFFFF',
    shadow: '0 10px 30px -5px rgba(249, 115, 22, 0.08)',
    description: 'Soft apricot cream & gentle coral',
    swatches: ['#FFF7ED', '#FFFFFF', '#F97316'],
  },
  {
    id: 'pastel',
    name: 'Pastel Alabaster',
    category: 'pastel',
    bg: '#FAF9F6',
    surface: '#FFFFFF',
    subtle: '#F1F5F9',
    subtleBorder: 'rgba(226, 232, 240, 0.9)',
    text: '#0F172A',
    muted: '#64748B',
    border: 'rgba(226, 232, 240, 0.9)',
    accent: '#4F46E5',
    accentHover: '#4338CA',
    accentLight: 'rgba(79, 70, 229, 0.12)',
    accentText: '#FFFFFF',
    shadow: '0 10px 30px -5px rgba(15, 23, 42, 0.05)',
    description: 'Porcelain alabaster with royal indigo',
    swatches: ['#FAF9F6', '#FFFFFF', '#4F46E5'],
  },
  {
    id: 'sakura',
    name: 'Sakura Blossom',
    category: 'pastel',
    bg: '#FDF2F4',
    surface: '#FFFFFF',
    subtle: '#FCE7EB',
    subtleBorder: 'rgba(244, 114, 182, 0.2)',
    text: '#1F1014',
    muted: '#9F6274',
    border: 'rgba(244, 114, 182, 0.25)',
    accent: '#EC4899',
    accentHover: '#DB2777',
    accentLight: 'rgba(236, 72, 153, 0.15)',
    accentText: '#FFFFFF',
    shadow: '0 10px 30px -5px rgba(236, 72, 153, 0.1)',
    description: 'Cherry blossom pink & soft blush',
    swatches: ['#FDF2F4', '#FFFFFF', '#EC4899'],
  },
  {
    id: 'sage',
    name: 'Nordic Sage',
    category: 'pastel',
    bg: '#F2F6F3',
    surface: '#FFFFFF',
    subtle: '#E2ECE4',
    subtleBorder: 'rgba(16, 185, 129, 0.2)',
    text: '#0E1A12',
    muted: '#567360',
    border: 'rgba(16, 185, 129, 0.25)',
    accent: '#059669',
    accentHover: '#047857',
    accentLight: 'rgba(5, 150, 105, 0.15)',
    accentText: '#FFFFFF',
    shadow: '0 10px 30px -5px rgba(5, 150, 105, 0.1)',
    description: 'Scandinavian eucalyptus & pastel jade',
    swatches: ['#F2F6F3', '#FFFFFF', '#059669'],
  },
  {
    id: 'mocha',
    name: 'Warm Mocha',
    category: 'pastel',
    bg: '#FAF4EE',
    surface: '#FFFFFF',
    subtle: '#F3EAE0',
    subtleBorder: 'rgba(217, 119, 6, 0.2)',
    text: '#1F1510',
    muted: '#8C6F60',
    border: 'rgba(217, 119, 6, 0.25)',
    accent: '#D97706',
    accentHover: '#B45309',
    accentLight: 'rgba(217, 119, 6, 0.15)',
    accentText: '#FFFFFF',
    shadow: '0 10px 30px -5px rgba(217, 119, 6, 0.1)',
    description: 'Warm almond cream with amber caramel',
    swatches: ['#FAF4EE', '#FFFFFF', '#D97706'],
  },

  // 2. DARK & STADIUM MODES
  {
    id: 'midnight',
    name: 'Midnight Black',
    category: 'dark',
    bg: '#070B14',
    surface: '#0E1626',
    subtle: '#16233B',
    subtleBorder: 'rgba(255, 255, 255, 0.1)',
    text: '#F8FAFC',
    muted: '#94A3B8',
    border: 'rgba(255, 255, 255, 0.12)',
    accent: '#F59E0B',
    accentHover: '#D97706',
    accentLight: 'rgba(245, 158, 11, 0.18)',
    accentText: '#070B14',
    shadow: '0 16px 40px rgba(0, 0, 0, 0.6)',
    description: 'Deep obsidian stadium & gold',
    swatches: ['#070B14', '#0E1626', '#F59E0B'],
  },
  {
    id: 'purple',
    name: 'Cyber Purple',
    category: 'dark',
    bg: '#0C0617',
    surface: '#170D2C',
    subtle: '#251347',
    subtleBorder: 'rgba(192, 132, 252, 0.16)',
    text: '#FAF5FF',
    muted: '#D8B4FE',
    border: 'rgba(192, 132, 252, 0.2)',
    accent: '#A855F7',
    accentHover: '#9333EA',
    accentLight: 'rgba(168, 85, 247, 0.2)',
    accentText: '#FFFFFF',
    shadow: '0 16px 40px rgba(12, 6, 23, 0.7)',
    description: 'Royal amethyst & neon violet',
    swatches: ['#0C0617', '#170D2C', '#A855F7'],
  },
  {
    id: 'noir',
    name: 'OLED Pure Black',
    category: 'dark',
    bg: '#000000',
    surface: '#111111',
    subtle: '#1C1C1C',
    subtleBorder: 'rgba(255, 255, 255, 0.14)',
    text: '#FFFFFF',
    muted: '#A1A1AA',
    border: 'rgba(255, 255, 255, 0.18)',
    accent: '#FFFFFF',
    accentHover: '#E4E4E7',
    accentLight: 'rgba(255, 255, 255, 0.15)',
    accentText: '#000000',
    shadow: '0 16px 40px rgba(0, 0, 0, 0.9)',
    description: 'Minimalist true black & platinum',
    swatches: ['#000000', '#111111', '#FFFFFF'],
  },
  {
    id: 'emerald',
    name: 'Cricket Emerald',
    category: 'dark',
    bg: '#03130C',
    surface: '#082317',
    subtle: '#103B29',
    subtleBorder: 'rgba(110, 231, 183, 0.16)',
    text: '#ECFDF5',
    muted: '#6EE7B7',
    border: 'rgba(110, 231, 183, 0.2)',
    accent: '#10B981',
    accentHover: '#059669',
    accentLight: 'rgba(16, 185, 129, 0.2)',
    accentText: '#03130C',
    shadow: '0 16px 40px rgba(3, 19, 12, 0.7)',
    description: 'Pitch forest green & mint neon',
    swatches: ['#03130C', '#082317', '#10B981'],
  },
  {
    id: 'ocean',
    name: 'Sapphire Ocean',
    category: 'dark',
    bg: '#050F1D',
    surface: '#0A1C35',
    subtle: '#12305C',
    subtleBorder: 'rgba(125, 211, 252, 0.16)',
    text: '#F0F9FF',
    muted: '#7DD3FC',
    border: 'rgba(125, 211, 252, 0.2)',
    accent: '#0EA5E9',
    accentHover: '#0284C7',
    accentLight: 'rgba(14, 165, 233, 0.2)',
    accentText: '#FFFFFF',
    shadow: '0 16px 40px rgba(5, 15, 29, 0.7)',
    description: 'Nautical navy & electric cyan',
    swatches: ['#050F1D', '#0A1C35', '#0EA5E9'],
  },
  {
    id: 'crimson',
    name: 'Sunset Crimson',
    category: 'dark',
    bg: '#140508',
    surface: '#250B10',
    subtle: '#3D121A',
    subtleBorder: 'rgba(253, 164, 175, 0.16)',
    text: '#FFF1F2',
    muted: '#FDA4AF',
    border: 'rgba(253, 164, 175, 0.2)',
    accent: '#F43F5E',
    accentHover: '#E11D48',
    accentLight: 'rgba(244, 63, 94, 0.2)',
    accentText: '#FFFFFF',
    shadow: '0 16px 40px rgba(20, 5, 8, 0.7)',
    description: 'Maroon ruby & warm coral',
    swatches: ['#140508', '#250B10', '#F43F5E'],
  },
  {
    id: 'bumblebee',
    name: 'Electric Gold',
    category: 'dark',
    bg: '#0E0F12',
    surface: '#191A20',
    subtle: '#252630',
    subtleBorder: 'rgba(250, 204, 21, 0.2)',
    text: '#FFFFFF',
    muted: '#FDE047',
    border: 'rgba(250, 204, 21, 0.25)',
    accent: '#FACC15',
    accentHover: '#EAB308',
    accentLight: 'rgba(250, 204, 21, 0.2)',
    accentText: '#000000',
    shadow: '0 16px 40px rgba(14, 15, 18, 0.8)',
    description: 'Graphite charcoal & electric yellow',
    swatches: ['#0E0F12', '#191A20', '#FACC15'],
  },
];

const ACCENT_SWATCHES = [
  '#4F46E5', // Indigo
  '#A855F7', // Purple
  '#7C3AED', // Deep Violet
  '#EC4899', // Pink
  '#F43F5E', // Rose
  '#E11D48', // Crimson Red
  '#F59E0B', // Amber Gold
  '#FACC15', // Electric Yellow
  '#10B981', // Emerald
  '#059669', // Mint
  '#06B6D4', // Cyan
  '#0EA5E9', // Sky Blue
  '#3B82F6', // Cobalt Blue
  '#F97316', // Neon Orange
  '#FFFFFF', // Pure White
];

export default function ThemeCustomizer() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeThemeId, setActiveThemeId] = useState<string>('midnight');
  const [customAccent, setCustomAccent] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'all' | 'pastel' | 'dark' | 'light'>('all');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const currentTheme = THEMES.find((t) => t.id === activeThemeId) || THEMES[0];

  const getContrastColor = (hex: string) => {
    const cleanHex = hex.replace('#', '');
    if (cleanHex.length !== 6) return '#FFFFFF';
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 160 ? '#0F172A' : '#FFFFFF';
  };

  const applyThemeToDOM = (theme: ThemeDefinition, accentOverride?: string) => {
    const root = document.documentElement;
    const finalAccent = accentOverride || theme.accent;

    root.style.setProperty('--theme-bg', theme.bg);
    root.style.setProperty('--theme-surface', theme.surface);
    root.style.setProperty('--theme-subtle', theme.subtle);
    root.style.setProperty('--theme-subtle-border', theme.subtleBorder);
    root.style.setProperty('--theme-text', theme.text);
    root.style.setProperty('--theme-muted', theme.muted);
    root.style.setProperty('--theme-border', theme.border);
    root.style.setProperty('--theme-accent', finalAccent);
    root.style.setProperty('--theme-accent-hover', theme.accentHover);
    root.style.setProperty('--theme-accent-light', `${finalAccent}28`);
    root.style.setProperty('--theme-accent-text', getContrastColor(finalAccent));
    root.style.setProperty('--theme-shadow', theme.shadow);
    root.setAttribute('data-theme', theme.id);

    localStorage.setItem('auction_theme_id', theme.id);
    if (accentOverride) {
      localStorage.setItem('auction_custom_accent', accentOverride);
    } else {
      localStorage.removeItem('auction_custom_accent');
    }
  };

  const handleSelectTheme = (theme: ThemeDefinition) => {
    setActiveThemeId(theme.id);
    setCustomAccent('');
    applyThemeToDOM(theme);
  };

  const handleSelectAccent = (color: string) => {
    setCustomAccent(color);
    applyThemeToDOM(currentTheme, color);
  };

  const handleReset = () => {
    const defaultTheme = THEMES[0]; // Hand-Drawn Doodle / Midnight Black
    setActiveThemeId(defaultTheme.id);
    setCustomAccent('');
    applyThemeToDOM(defaultTheme);
  };

  // Close when clicking outside and reset scroll on open
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Ensure the scroll starts at the absolute top
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Hydrate on mount
  useEffect(() => {
    const savedThemeId = localStorage.getItem('auction_theme_id') || 'midnight';
    const savedAccent = localStorage.getItem('auction_custom_accent') || '';
    const theme = THEMES.find((t) => t.id === savedThemeId) || THEMES[0];

    setActiveThemeId(theme.id);
    if (savedAccent) setCustomAccent(savedAccent);
    applyThemeToDOM(theme, savedAccent || undefined);
  }, []);

  const visibleThemes = THEMES.filter((t) => {
    if (activeTab === 'pastel') return t.category === 'pastel' || t.isDoodle;
    if (activeTab === 'dark') return t.category === 'dark';
    if (activeTab === 'light') return t.category === 'light' || t.category === 'pastel';
    return true;
  });

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* NAVBAR PILL BUTTON (WITH LIVE PALETTE SWATCH & CHEVRON) */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold theme-subtle-box hover:opacity-90 transition-all border theme-border shadow-sm cursor-pointer"
        title="Choose Theme & Color"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <div className="flex items-center -space-x-1">
          <span
            className="w-2.5 h-2.5 rounded-full border border-black/20"
            style={{ backgroundColor: currentTheme.swatches[0] }}
          />
          <span
            className="w-2.5 h-2.5 rounded-full border border-black/20"
            style={{ backgroundColor: currentTheme.swatches[1] }}
          />
          <span
            className="w-2.5 h-2.5 rounded-full border border-black/20"
            style={{ backgroundColor: customAccent || currentTheme.swatches[2] }}
          />
        </div>
        <span className="hidden sm:inline font-bold">{currentTheme.name}</span>
        <ChevronDown className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* ANCHORED LUXURY DROPDOWN POPOVER (PERFECTLY ANCHORED, ALWAYS STARTS AT THE TOP) */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 z-50 w-[min(calc(100vw-24px),480px)] theme-card rounded-2xl shadow-2xl border theme-border overflow-hidden text-left animate-fade-in">
          {/* HEADER */}
          <div className="px-4 py-3 border-b theme-border flex items-center justify-between theme-subtle-box">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg theme-accent-badge flex items-center justify-center">
                <Palette className="w-3.5 h-3.5 theme-accent-text" />
              </div>
              <div>
                <h3 className="text-xs font-black tracking-tight uppercase">
                  Website Color Studio
                </h3>
                <p className="text-[10px] opacity-65">
                  Select any preset theme or custom accent below
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* CATEGORY TABS */}
          <div className="px-3 pt-3 pb-1 flex flex-wrap gap-1 border-b theme-border theme-subtle-box">
            <button
              type="button"
              onClick={() => {
                setActiveTab('all');
                if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'theme-card shadow-sm font-black'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              All ({THEMES.length})
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('pastel');
                if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                activeTab === 'pastel'
                  ? 'theme-card shadow-sm font-black ring-1 ring-[var(--theme-accent)]'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              <Pencil className="w-3 h-3 text-indigo-400" />
              <span>Pastel & Doodle ({THEMES.filter(t => t.category === 'pastel').length})</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('dark');
                if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                activeTab === 'dark'
                  ? 'theme-card shadow-sm font-black'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              <Moon className="w-3 h-3" />
              <span>Dark ({THEMES.filter(t => t.category === 'dark').length})</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('light');
                if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                activeTab === 'light'
                  ? 'theme-card shadow-sm font-black'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              <Sun className="w-3 h-3" />
              <span>Light ({THEMES.filter(t => t.category === 'light' || t.category === 'pastel').length})</span>
            </button>
          </div>

          {/* THEMES GRID (STARTS PROPERLY FROM THE VERY FIRST OPTION: MIDNIGHT BLACK & CYBER PURPLE) */}
          <div
            ref={scrollContainerRef}
            className="p-3 sm:p-4 max-h-[min(55vh,420px)] overflow-y-auto space-y-3"
          >
            <div className="grid grid-cols-2 gap-2">
              {visibleThemes.map((theme) => {
                const isSelected = activeThemeId === theme.id;
                return (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => handleSelectTheme(theme)}
                    className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2.5 cursor-pointer ${
                      isSelected
                        ? 'ring-2 ring-[var(--theme-accent)] border-transparent shadow-md font-bold'
                        : 'theme-subtle-box opacity-80 hover:opacity-100 hover:scale-[1.01]'
                    }`}
                  >
                    {/* Swatch indicator */}
                    <div
                      className="w-7 h-7 rounded-lg shrink-0 flex items-center justify-center border shadow-inner relative overflow-hidden"
                      style={{ backgroundColor: theme.bg }}
                    >
                      <div
                        className="w-3.5 h-3.5 rounded-full absolute bottom-0.5 right-0.5 border"
                        style={{ backgroundColor: theme.accent }}
                      />
                      {isSelected && (
                        <Check
                          className="w-3.5 h-3.5 relative z-10"
                          style={{
                            color: theme.category === 'dark' ? '#FFFFFF' : '#000000',
                          }}
                        />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold block truncate">
                          {theme.name}
                        </span>
                        {theme.isDoodle && (
                          <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-700 border border-amber-400/40 shrink-0">
                            ✏️ DOODLE
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] opacity-60 block truncate">
                        {theme.description}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* CUSTOM ACCENT SWATCHES (15 SWATCHES + COLOR WHEEL) */}
            <div className="pt-2 border-t theme-border space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="flex items-center gap-1.5 opacity-80">
                  <Sparkles className="w-3 h-3 theme-accent-text" />
                  <span>Custom Accent Highlight</span>
                </span>
                {customAccent && (
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded theme-accent-badge font-bold uppercase">
                    {customAccent}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {ACCENT_SWATCHES.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => handleSelectAccent(color)}
                    className="w-6 h-6 rounded-full border transition-transform hover:scale-125 active:scale-95 flex items-center justify-center cursor-pointer shadow-sm"
                    style={{
                      backgroundColor: color,
                      borderColor:
                        customAccent === color ? 'var(--theme-text)' : 'rgba(0,0,0,0.2)',
                    }}
                    title={color}
                  >
                    {customAccent === color && (
                      <Check
                        className="w-3 h-3"
                        style={{ color: getContrastColor(color) }}
                      />
                    )}
                  </button>
                ))}

                {/* NATIVE COLOR WHEEL PICKER */}
                <label className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg border theme-border theme-card cursor-pointer hover:opacity-90 transition-all text-[11px] font-bold ml-auto">
                  <input
                    type="color"
                    value={customAccent || currentTheme.accent}
                    onChange={(e) => handleSelectAccent(e.target.value)}
                    className="w-3.5 h-3.5 rounded cursor-pointer border-0 p-0"
                  />
                  <span>Wheel</span>
                </label>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="px-4 py-2.5 border-t theme-border flex items-center justify-between theme-subtle-box text-xs">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1 text-[11px] opacity-70 hover:opacity-100 transition-opacity cursor-pointer font-medium"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset to Default</span>
            </button>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-1.5 rounded-xl text-xs font-bold theme-btn-primary shadow-sm hover:opacity-90 transition-all cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
