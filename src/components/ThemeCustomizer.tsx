'use client';

import { useState, useEffect, useRef } from 'react';
import { Palette, Check, X, Sparkles, ChevronDown, Heart } from 'lucide-react';

export interface ThemeDefinition {
  id: string;
  name: string;
  category: 'pastel';
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

/**
 * 9 PURE PASTEL & DOODLE COLOR PALETTES
 * Hand-drawn sketchbook aesthetic with soft pastel paper & organic ink
 */
export const THEMES: ThemeDefinition[] = [
  // 1. PASTEL ROSE PINK (DEFAULT)
  {
    id: 'pastel-rose',
    name: 'Pastel Rose Pink',
    category: 'pastel',
    bg: '#FFF1F5',
    surface: '#FFFFFF',
    subtle: '#FCE7F3',
    subtleBorder: '#F472B6',
    text: '#2C2825',
    muted: '#831843',
    border: '#2C2825',
    accent: '#E11D48',
    accentHover: '#BE123C',
    accentLight: 'rgba(225, 29, 72, 0.15)',
    accentText: '#FFFFFF',
    shadow: '4px 4px 0px #2C2825',
    description: 'Strawberry milk paper & soft rose ink (Default)',
    swatches: ['#FFF1F5', '#FFFFFF', '#E11D48'],
  },
  // 2. PASTEL LAVENDER MIST
  {
    id: 'pastel-lavender',
    name: 'Pastel Lavender',
    category: 'pastel',
    bg: '#FAF5FF',
    surface: '#FFFFFF',
    subtle: '#F3E8FF',
    subtleBorder: '#C084FC',
    text: '#2C2825',
    muted: '#581C87',
    border: '#2C2825',
    accent: '#9333EA',
    accentHover: '#7E22CE',
    accentLight: 'rgba(147, 51, 234, 0.15)',
    accentText: '#FFFFFF',
    shadow: '4px 4px 0px #2C2825',
    description: 'Soft lilac parchment & gentle purple ink',
    swatches: ['#FAF5FF', '#FFFFFF', '#9333EA'],
  },
  // 3. PASTEL MATCHA MINT
  {
    id: 'pastel-mint',
    name: 'Pastel Matcha Mint',
    category: 'pastel',
    bg: '#F0FDF4',
    surface: '#FFFFFF',
    subtle: '#DCFCE7',
    subtleBorder: '#4ADE80',
    text: '#2C2825',
    muted: '#14532D',
    border: '#2C2825',
    accent: '#10B981',
    accentHover: '#059669',
    accentLight: 'rgba(16, 185, 129, 0.15)',
    accentText: '#FFFFFF',
    shadow: '4px 4px 0px #2C2825',
    description: 'Gentle pistachio cream & soft jade ink',
    swatches: ['#F0FDF4', '#FFFFFF', '#10B981'],
  },
  // 4. PASTEL BUTTER CHALK
  {
    id: 'pastel-butter',
    name: 'Pastel Butter Yellow',
    category: 'pastel',
    bg: '#FEFCE8',
    surface: '#FFFFFF',
    subtle: '#FEF9C3',
    subtleBorder: '#FACC15',
    text: '#2C2825',
    muted: '#713F12',
    border: '#2C2825',
    accent: '#D97706',
    accentHover: '#B45309',
    accentLight: 'rgba(217, 119, 6, 0.15)',
    accentText: '#FFFFFF',
    shadow: '4px 4px 0px #2C2825',
    description: 'Buttermilk paper & warm honey ink',
    swatches: ['#FEFCE8', '#FFFFFF', '#D97706'],
  },
  // 5. PASTEL POWDER SKY
  {
    id: 'pastel-sky',
    name: 'Pastel Powder Sky',
    category: 'pastel',
    bg: '#F0F9FF',
    surface: '#FFFFFF',
    subtle: '#E0F2FE',
    subtleBorder: '#38BDF8',
    text: '#2C2825',
    muted: '#0C4A6E',
    border: '#2C2825',
    accent: '#0284C7',
    accentHover: '#0369A1',
    accentLight: 'rgba(2, 132, 199, 0.15)',
    accentText: '#FFFFFF',
    shadow: '4px 4px 0px #2C2825',
    description: 'Morning sky blue & airy cyan ink',
    swatches: ['#F0F9FF', '#FFFFFF', '#0284C7'],
  },
  // 6. PASTEL PEACH SORBET
  {
    id: 'pastel-peach',
    name: 'Pastel Peach Sorbet',
    category: 'pastel',
    bg: '#FFF7ED',
    surface: '#FFFFFF',
    subtle: '#FFEDD5',
    subtleBorder: '#FB923C',
    text: '#2C2825',
    muted: '#7C2D12',
    border: '#2C2825',
    accent: '#F97316',
    accentHover: '#C2410C',
    accentLight: 'rgba(249, 115, 22, 0.15)',
    accentText: '#FFFFFF',
    shadow: '4px 4px 0px #2C2825',
    description: 'Apricot cream & warm coral ink',
    swatches: ['#FFF7ED', '#FFFFFF', '#F97316'],
  },
  // 7. PASTEL OAT PARCHMENT
  {
    id: 'pastel-parchment',
    name: 'Pastel Oat Paper',
    category: 'pastel',
    bg: '#FAF7F0',
    surface: '#FFFFFF',
    subtle: '#F3EFE6',
    subtleBorder: '#DCD4C4',
    text: '#2C2825',
    muted: '#685E53',
    border: '#2C2825',
    accent: '#6366F1',
    accentHover: '#4F46E5',
    accentLight: 'rgba(99, 102, 241, 0.15)',
    accentText: '#FFFFFF',
    shadow: '4px 4px 0px #2C2825',
    description: 'Classic sketchbook linen & indigo chalk',
    swatches: ['#FAF7F0', '#FFFFFF', '#6366F1'],
  },
  // 8. PASTEL COTTON CANDY
  {
    id: 'pastel-cotton',
    name: 'Pastel Cotton Candy',
    category: 'pastel',
    bg: '#FFF0F5',
    surface: '#FFFFFF',
    subtle: '#FDF2F8',
    subtleBorder: '#F472B6',
    text: '#2C2825',
    muted: '#9D174D',
    border: '#2C2825',
    accent: '#EC4899',
    accentHover: '#DB2777',
    accentLight: 'rgba(236, 72, 153, 0.15)',
    accentText: '#FFFFFF',
    shadow: '4px 4px 0px #2C2825',
    description: 'Bubblegum pastel blush & soft pink ink',
    swatches: ['#FFF0F5', '#FFFFFF', '#EC4899'],
  },
  // 9. PASTEL SAGE MIST
  {
    id: 'pastel-sage',
    name: 'Pastel Sage Leaf',
    category: 'pastel',
    bg: '#F4F7F4',
    surface: '#FFFFFF',
    subtle: '#E2ECE4',
    subtleBorder: '#86EFAC',
    text: '#2C2825',
    muted: '#1E3A24',
    border: '#2C2825',
    accent: '#059669',
    accentHover: '#047857',
    accentLight: 'rgba(5, 150, 105, 0.15)',
    accentText: '#FFFFFF',
    shadow: '4px 4px 0px #2C2825',
    description: 'Scandinavian eucalyptus & botanical ink',
    swatches: ['#F4F7F4', '#FFFFFF', '#059669'],
  },
];

export default function ThemeCustomizer() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeThemeId, setActiveThemeId] = useState<string>('pastel-rose');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const currentTheme = THEMES.find((t) => t.id === activeThemeId) || THEMES[0];

  const applyThemeToDOM = (theme: ThemeDefinition) => {
    const root = document.documentElement;

    root.style.setProperty('--theme-bg', theme.bg);
    root.style.setProperty('--theme-surface', theme.surface);
    root.style.setProperty('--theme-subtle', theme.subtle);
    root.style.setProperty('--theme-subtle-border', theme.subtleBorder);
    root.style.setProperty('--theme-text', theme.text);
    root.style.setProperty('--theme-muted', theme.muted);
    root.style.setProperty('--theme-border', theme.border);
    root.style.setProperty('--theme-accent', theme.accent);
    root.style.setProperty('--theme-accent-hover', theme.accentHover);
    root.style.setProperty('--theme-accent-light', theme.accentLight);
    root.style.setProperty('--theme-accent-text', theme.accentText);
    root.style.setProperty('--theme-shadow', theme.shadow);
    root.setAttribute('data-theme', theme.id);

    localStorage.setItem('auction_theme_id', theme.id);
  };

  const handleSelectTheme = (theme: ThemeDefinition) => {
    setActiveThemeId(theme.id);
    applyThemeToDOM(theme);
  };

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Hydrate on mount
  useEffect(() => {
    const savedThemeId = localStorage.getItem('auction_theme_id') || 'pastel-rose';
    const theme = THEMES.find((t) => t.id === savedThemeId) || THEMES[0];

    setActiveThemeId(theme.id);
    applyThemeToDOM(theme);
  }, []);

  return (
    <div className="relative inline-block text-left font-doodle" ref={dropdownRef}>
      {/* NAVBAR PILL BUTTON (HAND-DRAWN DOODLE PALETTE PICKER) */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl text-base font-bold bg-[var(--theme-surface)] hover:scale-105 transition-all border-2 border-[var(--theme-border)] shadow-[2px_2px_0px_var(--theme-border)] cursor-pointer"
        title="Pick Pastel Doodle Theme"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <div className="flex items-center -space-x-1">
          <span
            className="w-3 h-3 rounded-full border border-[#2C2825]"
            style={{ backgroundColor: currentTheme.swatches[0] }}
          />
          <span
            className="w-3 h-3 rounded-full border border-[#2C2825]"
            style={{ backgroundColor: currentTheme.swatches[1] }}
          />
          <span
            className="w-3 h-3 rounded-full border border-[#2C2825]"
            style={{ backgroundColor: currentTheme.swatches[2] }}
          />
        </div>
        <span className="font-bold text-sm tracking-tight">{currentTheme.name}</span>
        <ChevronDown className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* DROPDOWN POPOVER (9 PURE PASTEL DOODLE OPTIONS) */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 z-50 w-[min(calc(100vw-24px),380px)] bg-[var(--theme-surface)] rounded-[2rem] shadow-2xl border-2 border-[#2C2825] overflow-hidden text-left animate-fade-in">
          {/* HEADER */}
          <div className="px-5 py-3.5 border-b-2 border-dashed border-[#2C2825] flex items-center justify-between bg-[var(--theme-subtle)]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-white border-2 border-[#2C2825] flex items-center justify-center shadow-[2px_2px_0px_#2C2825]">
                <Palette className="w-4 h-4 text-[var(--theme-accent)]" />
              </div>
              <div>
                <h3 className="text-base font-black tracking-tight leading-none">
                  Pastel Doodle Palette
                </h3>
                <p className="text-xs opacity-75 mt-0.5">
                  9 Hand-Drawn Pastel Shades
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

          {/* 9 PASTEL DOODLE THEMES LIST */}
          <div
            ref={scrollContainerRef}
            className="p-3 sm:p-4 max-h-[420px] overflow-y-auto space-y-2.5"
          >
            {THEMES.map((theme) => {
              const isSelected = activeThemeId === theme.id;
              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => handleSelectTheme(theme)}
                  className={`w-full p-2.5 rounded-2xl border-2 border-[#2C2825] text-left transition-all flex items-center gap-3 cursor-pointer ${
                    isSelected
                      ? 'bg-[var(--theme-subtle)] shadow-[3px_3px_0px_#2C2825] font-black'
                      : 'bg-white/80 hover:bg-[var(--theme-subtle)] hover:translate-x-0.5'
                  }`}
                >
                  {/* Swatches circle */}
                  <div
                    className="w-9 h-9 rounded-xl shrink-0 flex items-center justify-center border-2 border-[#2C2825] shadow-[2px_2px_0px_#2C2825] relative overflow-hidden"
                    style={{ backgroundColor: theme.bg }}
                  >
                    <div
                      className="w-4 h-4 rounded-full absolute bottom-0.5 right-0.5 border border-[#2C2825]"
                      style={{ backgroundColor: theme.accent }}
                    />
                    {isSelected && (
                      <Check className="w-4 h-4 relative z-10 text-[#2C2825]" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-base font-bold truncate">
                        {theme.name}
                      </span>
                      {theme.id === 'pastel-rose' && (
                        <span className="text-[11px] font-black px-1.5 py-0.2 rounded bg-pink-100 text-pink-800 border border-pink-300">
                          ❤️ Default
                        </span>
                      )}
                    </div>
                    <span className="text-xs opacity-75 block truncate">
                      {theme.description}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* FOOTER */}
          <div className="px-4 py-2.5 bg-[var(--theme-subtle)] border-t-2 border-dashed border-[#2C2825] text-xs text-center font-bold opacity-80">
            ✏️ Hand-drawn pastel sketchbook aesthetic
          </div>
        </div>
      )}
    </div>
  );
}
