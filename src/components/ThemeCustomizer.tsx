'use client';

import { useState, useEffect } from 'react';
import { Palette, Check, X, RotateCcw, Sparkles, Sliders, ChevronDown } from 'lucide-react';

export interface ThemeDefinition {
  id: string;
  name: string;
  category: 'dark' | 'light';
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
}

export const THEMES: ThemeDefinition[] = [
  {
    id: 'pastel',
    name: 'Pastel Alabaster',
    category: 'light',
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
    description: 'Soft porcelain alabaster with clean royal indigo',
    swatches: ['#FAF9F6', '#FFFFFF', '#4F46E5'],
  },
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
    description: 'Deep obsidian stadium night with glowing gold highlights',
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
    description: 'Deep royal amethyst with neon violet energy',
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
    description: 'Minimalist true black with clean platinum contrast',
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
    description: 'Deep pitch green with fresh mint accents',
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
    description: 'Deep nautical navy with electric cyan sparks',
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
    description: 'Rich royal ruby with warm coral highlights',
    swatches: ['#140508', '#250B10', '#F43F5E'],
  },
  {
    id: 'sakura',
    name: 'Sakura Blossom',
    category: 'light',
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
    description: 'Soft Japanese cherry blossom pink & light rose',
    swatches: ['#FDF2F4', '#FFFFFF', '#EC4899'],
  },
  {
    id: 'sage',
    name: 'Nordic Sage',
    category: 'light',
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
    description: 'Calm Scandinavian eucalyptus & pastel jade',
    swatches: ['#F2F6F3', '#FFFFFF', '#059669'],
  },
  {
    id: 'mocha',
    name: 'Warm Mocha',
    category: 'dark',
    bg: '#120C09',
    surface: '#201510',
    subtle: '#2B1D16',
    subtleBorder: 'rgba(217, 119, 6, 0.2)',
    text: '#FDF8F5',
    muted: '#BFA094',
    border: 'rgba(217, 119, 6, 0.25)',
    accent: '#D97706',
    accentHover: '#B45309',
    accentLight: 'rgba(217, 119, 6, 0.2)',
    accentText: '#FFFFFF',
    shadow: '0 16px 40px rgba(18, 12, 9, 0.8)',
    description: 'Warm dark espresso with rich amber caramel',
    swatches: ['#120C09', '#201510', '#D97706'],
  },
  {
    id: 'glacier',
    name: 'Glacier Cyan',
    category: 'dark',
    bg: '#030F17',
    surface: '#082030',
    subtle: '#0D2D44',
    subtleBorder: 'rgba(34, 211, 238, 0.2)',
    text: '#F0FDFF',
    muted: '#67E8F9',
    border: 'rgba(34, 211, 238, 0.25)',
    accent: '#06B6D4',
    accentHover: '#0891B2',
    accentLight: 'rgba(6, 182, 212, 0.2)',
    accentText: '#030F17',
    shadow: '0 16px 40px rgba(3, 15, 23, 0.8)',
    description: 'Deep Arctic night with ice-cold cyan glow',
    swatches: ['#030F17', '#082030', '#06B6D4'],
  },
  {
    id: 'bumblebee',
    name: 'Electric Yellow',
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
    description: 'Charcoal graphite with electric bumblebee gold',
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
  '#84CC16', // Lime
  '#06B6D4', // Cyan
  '#0EA5E9', // Sky Blue
  '#3B82F6', // Cobalt Blue
  '#F97316', // Neon Orange
  '#FFFFFF', // Pure White
];

export default function ThemeCustomizer() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeThemeId, setActiveThemeId] = useState<string>('pastel');
  const [customAccent, setCustomAccent] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'dark' | 'light'>('all');

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
    const defaultTheme = THEMES[0];
    setActiveThemeId('pastel');
    setCustomAccent('');
    applyThemeToDOM(defaultTheme);
  };

  // Hydrate on mount
  useEffect(() => {
    const savedThemeId = localStorage.getItem('auction_theme_id') || 'pastel';
    const savedAccent = localStorage.getItem('auction_custom_accent') || '';
    const theme = THEMES.find((t) => t.id === savedThemeId) || THEMES[0];

    setActiveThemeId(theme.id);
    if (savedAccent) setCustomAccent(savedAccent);
    applyThemeToDOM(theme, savedAccent || undefined);
  }, []);

  const filteredThemes = THEMES.filter((t) => {
    if (categoryFilter === 'all') return true;
    return t.category === categoryFilter;
  });

  return (
    <>
      {/* INTEGRATED NAVBAR THEME PILL (PREMIUM & ACCESSIBLE) */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold theme-subtle-box hover:opacity-90 transition-all border theme-border shadow-sm cursor-pointer"
        title="Open Color Studio"
      >
        {/* 3-Dot Color Swatch Preview */}
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
        <span className="hidden sm:inline">{currentTheme.name}</span>
        <ChevronDown className="w-3 h-3 opacity-60" />
      </button>

      {/* LUXURY COLOR STUDIO MODAL / DRAWER (PERFECT FIT ON ALL SCREENS) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div
            className="w-full max-w-lg theme-card rounded-3xl shadow-2xl relative border theme-border flex flex-col max-h-[85vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* PINNED HEADER */}
            <div className="px-5 py-4 border-b theme-border flex items-center justify-between shrink-0 theme-subtle-box">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl theme-accent-badge flex items-center justify-center">
                  <Palette className="w-4 h-4 theme-accent-text" />
                </div>
                <div>
                  <h3 className="text-sm font-black tracking-tight">
                    Website Color Studio
                  </h3>
                  <p className="text-[11px] opacity-70">
                    Live color grading — updates instantly as you click
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl opacity-70 hover:opacity-100 hover:bg-slate-500/10 transition-all cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* SCROLLABLE INTERIOR (SMOOTH, NO CUTOFF) */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5 overscroll-contain">
              {/* CATEGORY SWITCHER */}
              <div className="flex rounded-xl theme-subtle-box p-1 border theme-border">
                <button
                  type="button"
                  onClick={() => setCategoryFilter('all')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    categoryFilter === 'all'
                      ? 'theme-card shadow-sm font-black'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  All ({THEMES.length})
                </button>
                <button
                  type="button"
                  onClick={() => setCategoryFilter('dark')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    categoryFilter === 'dark'
                      ? 'theme-card shadow-sm font-black'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  Dark & Stadium
                </button>
                <button
                  type="button"
                  onClick={() => setCategoryFilter('light')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    categoryFilter === 'light'
                      ? 'theme-card shadow-sm font-black'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  Light & Pastel
                </button>
              </div>

              {/* PRESET THEMES GRID */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider opacity-75">
                  <span>Curated Palettes</span>
                  <span className="text-[10px] font-mono lowercase opacity-60">
                    instant grade
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {filteredThemes.map((theme) => {
                    const isSelected = activeThemeId === theme.id;
                    return (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => handleSelectTheme(theme)}
                        className={`p-3 rounded-2xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                          isSelected
                            ? 'ring-2 ring-[var(--theme-accent)] border-transparent shadow-md scale-[1.01]'
                            : 'theme-subtle-box opacity-80 hover:opacity-100 hover:scale-[1.01]'
                        }`}
                      >
                        {/* 3-Part Color Disk */}
                        <div
                          className="w-9 h-9 rounded-xl shrink-0 flex items-center justify-center border shadow-inner relative overflow-hidden"
                          style={{ backgroundColor: theme.bg }}
                        >
                          <div
                            className="w-4 h-4 rounded-full absolute bottom-1 right-1 border"
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
                          <span className="text-xs font-bold block truncate">
                            {theme.name}
                          </span>
                          <p className="text-[10px] opacity-65 leading-tight line-clamp-1 mt-0.5">
                            {theme.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 16 ACCENT HIGHLIGHTS & NATIVE PICKER */}
              <div className="p-4 rounded-2xl theme-subtle-box border theme-border space-y-3">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 theme-accent-text" />
                    <span>Custom Accent Color (16 Swatches)</span>
                  </span>
                  {customAccent && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded theme-accent-badge font-bold uppercase">
                      {customAccent}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-8 gap-2">
                  {ACCENT_SWATCHES.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => handleSelectAccent(color)}
                      className="w-7 h-7 rounded-full border-2 transition-transform hover:scale-115 active:scale-95 flex items-center justify-center cursor-pointer shadow-sm mx-auto"
                      style={{
                        backgroundColor: color,
                        borderColor:
                          customAccent === color ? 'var(--theme-text)' : 'rgba(0,0,0,0.2)',
                      }}
                      title={color}
                    >
                      {customAccent === color && (
                        <Check
                          className="w-3.5 h-3.5"
                          style={{ color: getContrastColor(color) }}
                        />
                      )}
                    </button>
                  ))}
                </div>

                {/* NATIVE COLOR WHEEL */}
                <div className="pt-2 border-t theme-border flex items-center justify-between">
                  <span className="text-[11px] opacity-70">
                    Pick exact color with native wheel:
                  </span>
                  <label className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border theme-border theme-card cursor-pointer hover:opacity-90 transition-all text-xs font-bold">
                    <input
                      type="color"
                      value={customAccent || currentTheme.accent}
                      onChange={(e) => handleSelectAccent(e.target.value)}
                      className="w-4 h-4 rounded cursor-pointer border-0 p-0"
                    />
                    <span>Color Wheel</span>
                  </label>
                </div>
              </div>
            </div>

            {/* PINNED FOOTER (ALWAYS VISIBLE) */}
            <div className="px-5 py-3.5 border-t theme-border flex items-center justify-between shrink-0 theme-subtle-box">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs opacity-70 hover:opacity-100 transition-opacity cursor-pointer font-medium"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Default</span>
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-5 py-2 rounded-xl text-xs font-bold theme-btn-primary shadow-sm hover:opacity-90 transition-all cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
