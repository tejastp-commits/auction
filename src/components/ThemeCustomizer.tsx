'use client';

import { useState, useEffect } from 'react';
import { Palette, Check, X, RotateCcw, Sparkles } from 'lucide-react';

export interface ThemeOption {
  id: string;
  name: string;
  category: 'light' | 'dark';
  bgPreview: string;
  surfacePreview: string;
  accentPreview: string;
  description: string;
}

export const PRESET_THEMES: ThemeOption[] = [
  {
    id: 'pastel',
    name: 'Pastel Clean',
    category: 'light',
    bgPreview: '#FAF9F6',
    surfacePreview: '#FFFFFF',
    accentPreview: '#4F46E5',
    description: 'Soft porcelain alabaster with clean indigo accents',
  },
  {
    id: 'midnight',
    name: 'Midnight Black',
    category: 'dark',
    bgPreview: '#070B14',
    surfacePreview: '#0E1626',
    accentPreview: '#F59E0B',
    description: 'Deep obsidian stadium night with glowing gold highlights',
  },
  {
    id: 'purple',
    name: 'Cyber Purple',
    category: 'dark',
    bgPreview: '#0C0617',
    surfacePreview: '#180C2E',
    accentPreview: '#A855F7',
    description: 'Deep royal amethyst with neon violet energy',
  },
  {
    id: 'noir',
    name: 'OLED Pure Black',
    category: 'dark',
    bgPreview: '#000000',
    surfacePreview: '#121212',
    accentPreview: '#FFFFFF',
    description: 'Minimalist true black with clean platinum contrast',
  },
  {
    id: 'emerald',
    name: 'Cricket Emerald',
    category: 'dark',
    bgPreview: '#04140D',
    surfacePreview: '#0A261A',
    accentPreview: '#10B981',
    description: 'Deep pitch green with fresh mint accents',
  },
  {
    id: 'ocean',
    name: 'Sapphire Ocean',
    category: 'dark',
    bgPreview: '#05101E',
    surfacePreview: '#0B1F3B',
    accentPreview: '#0EA5E9',
    description: 'Deep nautical navy with electric cyan sparks',
  },
  {
    id: 'crimson',
    name: 'Sunset Crimson',
    category: 'dark',
    bgPreview: '#140508',
    surfacePreview: '#260B10',
    accentPreview: '#F43F5E',
    description: 'Rich royal ruby with warm coral highlights',
  },
  {
    id: 'sakura',
    name: 'Sakura Blossom',
    category: 'light',
    bgPreview: '#FDF4F5',
    surfacePreview: '#FFFFFF',
    accentPreview: '#EC4899',
    description: 'Soft Japanese cherry blossom pink & light rose',
  },
  {
    id: 'sage',
    name: 'Nordic Sage',
    category: 'light',
    bgPreview: '#F4F7F4',
    surfacePreview: '#FFFFFF',
    accentPreview: '#059669',
    description: 'Calm Scandinavian eucalyptus & pastel jade',
  },
  {
    id: 'mocha',
    name: 'Warm Mocha',
    category: 'dark',
    bgPreview: '#110B08',
    surfacePreview: '#1E140F',
    accentPreview: '#D97706',
    description: 'Warm dark espresso with rich amber caramel',
  },
  {
    id: 'glacier',
    name: 'Glacier Cyan',
    category: 'dark',
    bgPreview: '#030F17',
    surfacePreview: '#071C2B',
    accentPreview: '#06B6D4',
    description: 'Deep Arctic night with ice-cold cyan glow',
  },
  {
    id: 'bumblebee',
    name: 'Electric Yellow',
    category: 'dark',
    bgPreview: '#0D0E11',
    surfacePreview: '#181920',
    accentPreview: '#FACC15',
    description: 'Charcoal graphite with electric bumblebee gold',
  },
];

// Expanded 16 Curated Swatches
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
  const [activeTheme, setActiveTheme] = useState<string>('pastel');
  const [customAccent, setCustomAccent] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'dark' | 'light'>('all');

  // Helper to calculate contrast text color (black or white)
  const getContrastColor = (hex: string) => {
    const cleanHex = hex.replace('#', '');
    if (cleanHex.length !== 6) return '#FFFFFF';
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 160 ? '#0F172A' : '#FFFFFF';
  };

  const applyTheme = (themeId: string, accentColor?: string) => {
    setActiveTheme(themeId);
    document.documentElement.setAttribute('data-theme', themeId);
    localStorage.setItem('auction_theme_preference', themeId);

    if (accentColor) {
      setCustomAccent(accentColor);
      localStorage.setItem('auction_theme_accent', accentColor);
      document.documentElement.style.setProperty('--theme-accent', accentColor);
      document.documentElement.style.setProperty(
        '--theme-accent-light',
        `${accentColor}25`
      );
      document.documentElement.style.setProperty(
        '--theme-accent-text',
        getContrastColor(accentColor)
      );
    } else {
      setCustomAccent('');
      localStorage.removeItem('auction_theme_accent');
      document.documentElement.style.removeProperty('--theme-accent');
      document.documentElement.style.removeProperty('--theme-accent-light');
      document.documentElement.style.removeProperty('--theme-accent-text');
    }
  };

  // Hydrate theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('auction_theme_preference') || 'pastel';
    const savedAccent = localStorage.getItem('auction_theme_accent') || '';
    setActiveTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    if (savedAccent) {
      setCustomAccent(savedAccent);
      document.documentElement.style.setProperty('--theme-accent', savedAccent);
      document.documentElement.style.setProperty(
        '--theme-accent-light',
        `${savedAccent}25`
      );
      document.documentElement.style.setProperty(
        '--theme-accent-text',
        getContrastColor(savedAccent)
      );
    }
  }, []);

  const handleReset = () => {
    applyTheme('pastel');
  };

  const filteredThemes = PRESET_THEMES.filter((t) => {
    if (activeCategory === 'all') return true;
    return t.category === activeCategory;
  });

  return (
    <>
      {/* HEADER LAUNCH BUTTON */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold theme-subtle-box hover:opacity-90 transition-all shadow-sm cursor-pointer"
        title="Customize Color Theme"
      >
        <Palette className="w-3.5 h-3.5 theme-accent-text" />
        <span className="hidden sm:inline">Color Theme</span>
        <span className="w-2 h-2 rounded-full theme-btn-primary ml-0.5" />
      </button>

      {/* FLOATING ACTION PILL (BOTTOM-RIGHT CORNER) */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full theme-card border theme-border shadow-xl hover:scale-105 active:scale-95 transition-all text-xs font-bold cursor-pointer backdrop-blur-md"
        >
          <div className="w-5 h-5 rounded-full theme-btn-primary flex items-center justify-center text-[10px]">
            <Palette className="w-3 h-3 text-white" />
          </div>
          <span>Color Grade</span>
        </button>
      </div>

      {/* SLIDE-OVER DRAWER (NEVER CLIPPED ON LAPTOPS) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Subtle backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-4 sm:pl-10">
            <aside
              className="w-screen max-w-md h-full flex flex-col theme-card border-l theme-border shadow-2xl animate-slide-in-right relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* STICKY HEADER */}
              <div className="px-5 py-4 border-b theme-border flex items-center justify-between shrink-0 theme-subtle-box">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl theme-accent-badge flex items-center justify-center">
                    <Palette className="w-4 h-4 theme-accent-text" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black tracking-tight">
                      Color Grading Studio
                    </h3>
                    <p className="text-[11px] opacity-70">
                      Customize how your auction arena looks
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-xl opacity-70 hover:opacity-100 hover:bg-slate-500/10 transition-all cursor-pointer"
                  title="Close Color Studio"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* SCROLLABLE BODY (PERFECT FOR ALL LAPTOPS) */}
              <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6 overscroll-contain">
                {/* CATEGORY FILTER PILLS */}
                <div className="flex rounded-xl theme-subtle-box p-1 border theme-border">
                  <button
                    type="button"
                    onClick={() => setActiveCategory('all')}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      activeCategory === 'all'
                        ? 'theme-card shadow-sm font-black'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    All ({PRESET_THEMES.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveCategory('dark')}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      activeCategory === 'dark'
                        ? 'theme-card shadow-sm font-black'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    Dark Modes
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveCategory('light')}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      activeCategory === 'light'
                        ? 'theme-card shadow-sm font-black'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    Light & Pastel
                  </button>
                </div>

                {/* 12 PRESET THEMES LIST */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider opacity-75">
                    <span>Preset Themes</span>
                    <span className="text-[10px] font-mono lowercase opacity-60">
                      live preview
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {filteredThemes.map((theme) => {
                      const isSelected = activeTheme === theme.id;
                      return (
                        <button
                          key={theme.id}
                          type="button"
                          onClick={() => applyTheme(theme.id)}
                          className={`p-2.5 rounded-xl border text-left transition-all flex items-start gap-2.5 cursor-pointer ${
                            isSelected
                              ? 'ring-2 ring-[var(--theme-accent)] border-transparent shadow-md'
                              : 'theme-subtle-box opacity-80 hover:opacity-100'
                          }`}
                        >
                          {/* Color Swatch Preview */}
                          <div
                            className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center border shadow-inner relative overflow-hidden"
                            style={{ backgroundColor: theme.bgPreview }}
                          >
                            <div
                              className="w-3.5 h-3.5 rounded-full absolute bottom-0.5 right-0.5 border"
                              style={{ backgroundColor: theme.accentPreview }}
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
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold truncate">
                                {theme.name}
                              </span>
                            </div>
                            <p className="text-[10px] opacity-65 leading-tight line-clamp-1 mt-0.5">
                              {theme.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 16 CUSTOM ACCENT COLOR SWATCHES */}
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
                        onClick={() => applyTheme(activeTheme, color)}
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

                  {/* HTML NATIVE COLOR PICKER */}
                  <div className="pt-2 border-t theme-border flex items-center justify-between">
                    <span className="text-[11px] opacity-70">
                      Pick any custom HEX color:
                    </span>
                    <label className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border theme-border theme-card cursor-pointer hover:opacity-90 transition-all text-xs font-bold">
                      <input
                        type="color"
                        value={customAccent || '#4F46E5'}
                        onChange={(e) => applyTheme(activeTheme, e.target.value)}
                        className="w-4 h-4 rounded cursor-pointer border-0 p-0"
                      />
                      <span>Palette Wheel</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* STICKY FOOTER (ALWAYS VISIBLE ON ANY SCREEN) */}
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
                  Apply & Close
                </button>
              </div>
            </aside>
          </div>
        </div>
      )}
    </>
  );
}
