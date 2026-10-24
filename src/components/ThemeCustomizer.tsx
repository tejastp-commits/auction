'use client';

import { useState, useEffect } from 'react';
import { Palette, Check, Sun, Moon, Sparkles, X, RotateCcw } from 'lucide-react';

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
];

const ACCENT_SWATCHES = [
  '#4F46E5', // Indigo
  '#A855F7', // Purple
  '#EC4899', // Pink
  '#F43F5E', // Rose
  '#F59E0B', // Amber
  '#10B981', // Emerald
  '#06B6D4', // Cyan
  '#3B82F6', // Blue
  '#FFFFFF', // White
  '#E11D48', // Crimson
];

export default function ThemeCustomizer() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState<string>('pastel');
  const [customAccent, setCustomAccent] = useState<string>('');

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

      {/* FLOATING ACTION PILL (BOTTOM CORNER) */}
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

      {/* MODAL / DRAWER */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div
            className="w-full max-w-lg theme-card rounded-3xl p-6 sm:p-7 shadow-2xl relative border theme-border max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b theme-border mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl theme-accent-badge flex items-center justify-center">
                  <Palette className="w-4 h-4 theme-accent-text" />
                </div>
                <div>
                  <h3 className="text-base font-black tracking-tight">
                    Website Color Grading
                  </h3>
                  <p className="text-xs opacity-70">
                    Choose presets or customize colors to match your taste.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl opacity-70 hover:opacity-100 hover:bg-slate-500/10 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* PRESET THEMES GRID */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider opacity-75">
                <span>Curated Color Themes</span>
                <span className="text-[10px] font-mono lowercase opacity-60">
                  {PRESET_THEMES.length} options
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {PRESET_THEMES.map((theme) => {
                  const isSelected = activeTheme === theme.id;
                  return (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => applyTheme(theme.id)}
                      className={`p-3 rounded-2xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                        isSelected
                          ? 'ring-2 ring-indigo-500 border-transparent shadow-md'
                          : 'theme-subtle-box opacity-80 hover:opacity-100'
                      }`}
                    >
                      {/* Color Preview Swatch */}
                      <div
                        className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center border shadow-inner relative overflow-hidden"
                        style={{ backgroundColor: theme.bgPreview }}
                      >
                        <div
                          className="w-5 h-5 rounded-full absolute bottom-1 right-1 border"
                          style={{ backgroundColor: theme.accentPreview }}
                        />
                        {isSelected && (
                          <Check
                            className="w-4 h-4 relative z-10"
                            style={{ color: theme.category === 'dark' ? '#FFFFFF' : '#000000' }}
                          />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold truncate">
                            {theme.name}
                          </span>
                          <span className="text-[9px] px-1.5 py-0.2 rounded font-mono uppercase opacity-70 border">
                            {theme.category}
                          </span>
                        </div>
                        <p className="text-[11px] opacity-65 leading-tight mt-0.5 line-clamp-1">
                          {theme.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CUSTOM ACCENT COLOR PICKER */}
            <div className="p-4 rounded-2xl theme-subtle-box border theme-border space-y-3 mb-6">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 theme-accent-text" />
                  <span>Custom Accent Highlight</span>
                </span>
                {customAccent && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded theme-accent-badge font-bold uppercase">
                    {customAccent}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {ACCENT_SWATCHES.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => applyTheme(activeTheme, color)}
                    className="w-7 h-7 rounded-full border-2 transition-transform hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer shadow-sm"
                    style={{
                      backgroundColor: color,
                      borderColor: customAccent === color ? '#FFFFFF' : 'rgba(0,0,0,0.2)',
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

                {/* HTML Native Color Picker */}
                <label
                  className="w-7 h-7 rounded-full border-2 border-dashed flex items-center justify-center cursor-pointer hover:scale-110 transition-transform relative overflow-hidden"
                  title="Pick Any Custom Color"
                >
                  <input
                    type="color"
                    value={customAccent || '#4F46E5'}
                    onChange={(e) => applyTheme(activeTheme, e.target.value)}
                    className="opacity-0 absolute inset-0 cursor-pointer w-full h-full"
                  />
                  <span className="text-[10px] font-bold">+</span>
                </label>
              </div>
            </div>

            {/* FOOTER ACTIONS */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs opacity-70 hover:opacity-100 transition-opacity cursor-pointer font-medium"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Pastel Default</span>
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
