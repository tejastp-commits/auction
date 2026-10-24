'use client';

import { useState, useEffect, useRef } from 'react';
import { Palette, Check, X, ChevronDown } from 'lucide-react';

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
 * EYE-CATCHING PASTEL COLOR PALETTES
 * Default fixed to: Pastel Peach Sorbet (Warm apricot cream & vibrant coral)
 */
export const THEMES: ThemeDefinition[] = [
  // 1. PASTEL PEACH SORBET (DEFAULT)
  {
    id: 'pastel-peach',
    name: 'Pastel Peach Sorbet',
    category: 'pastel',
    bg: '#FFF7ED',
    surface: '#FFFFFF',
    subtle: '#FFEDD5',
    subtleBorder: '#FB923C',
    text: '#1E1B18',
    muted: '#7C2D12',
    border: 'rgba(234, 88, 12, 0.22)',
    accent: '#EA580C',
    accentHover: '#C2410C',
    accentLight: 'rgba(234, 88, 12, 0.15)',
    accentText: '#FFFFFF',
    shadow: '0 10px 30px -5px rgba(234, 88, 12, 0.1)',
    description: 'Warm apricot cream & coral (Default)',
    swatches: ['#FFF7ED', '#FFFFFF', '#EA580C'],
  },
  // 2. PASTEL ROSE PINK
  {
    id: 'pastel-rose',
    name: 'Pastel Rose Pink',
    category: 'pastel',
    bg: '#FFF1F5',
    surface: '#FFFFFF',
    subtle: '#FCE7F3',
    subtleBorder: '#F472B6',
    text: '#1E1B18',
    muted: '#831843',
    border: 'rgba(225, 29, 72, 0.22)',
    accent: '#E11D48',
    accentHover: '#BE123C',
    accentLight: 'rgba(225, 29, 72, 0.15)',
    accentText: '#FFFFFF',
    shadow: '0 10px 30px -5px rgba(225, 29, 72, 0.1)',
    description: 'Strawberry cream & soft rose',
    swatches: ['#FFF1F5', '#FFFFFF', '#E11D48'],
  },
  // 3. PASTEL LAVENDER MIST
  {
    id: 'pastel-lavender',
    name: 'Pastel Lavender',
    category: 'pastel',
    bg: '#FAF5FF',
    surface: '#FFFFFF',
    subtle: '#F3E8FF',
    subtleBorder: '#C084FC',
    text: '#1E1B18',
    muted: '#581C87',
    border: 'rgba(147, 51, 234, 0.22)',
    accent: '#9333EA',
    accentHover: '#7E22CE',
    accentLight: 'rgba(147, 51, 234, 0.15)',
    accentText: '#FFFFFF',
    shadow: '0 10px 30px -5px rgba(147, 51, 234, 0.1)',
    description: 'Soft lilac & gentle purple',
    swatches: ['#FAF5FF', '#FFFFFF', '#9333EA'],
  },
  // 4. PASTEL MATCHA MINT
  {
    id: 'pastel-mint',
    name: 'Pastel Matcha Mint',
    category: 'pastel',
    bg: '#F0FDF4',
    surface: '#FFFFFF',
    subtle: '#DCFCE7',
    subtleBorder: '#4ADE80',
    text: '#1E1B18',
    muted: '#14532D',
    border: 'rgba(16, 185, 129, 0.22)',
    accent: '#10B981',
    accentHover: '#059669',
    accentLight: 'rgba(16, 185, 129, 0.15)',
    accentText: '#FFFFFF',
    shadow: '0 10px 30px -5px rgba(16, 185, 129, 0.1)',
    description: 'Gentle pistachio & soft jade',
    swatches: ['#F0FDF4', '#FFFFFF', '#10B981'],
  },
  // 5. PASTEL BUTTER CHALK
  {
    id: 'pastel-butter',
    name: 'Pastel Butter Yellow',
    category: 'pastel',
    bg: '#FEFCE8',
    surface: '#FFFFFF',
    subtle: '#FEF9C3',
    subtleBorder: '#FACC15',
    text: '#1E1B18',
    muted: '#713F12',
    border: 'rgba(217, 119, 6, 0.22)',
    accent: '#D97706',
    accentHover: '#B45309',
    accentLight: 'rgba(217, 119, 6, 0.15)',
    accentText: '#FFFFFF',
    shadow: '0 10px 30px -5px rgba(217, 119, 6, 0.1)',
    description: 'Buttermilk cream & warm amber',
    swatches: ['#FEFCE8', '#FFFFFF', '#D97706'],
  },
  // 6. PASTEL POWDER SKY
  {
    id: 'pastel-sky',
    name: 'Pastel Powder Sky',
    category: 'pastel',
    bg: '#F0F9FF',
    surface: '#FFFFFF',
    subtle: '#E0F2FE',
    subtleBorder: '#38BDF8',
    text: '#1E1B18',
    muted: '#0C4A6E',
    border: 'rgba(2, 132, 199, 0.22)',
    accent: '#0284C7',
    accentHover: '#0369A1',
    accentLight: 'rgba(2, 132, 199, 0.15)',
    accentText: '#FFFFFF',
    shadow: '0 10px 30px -5px rgba(2, 132, 199, 0.1)',
    description: 'Morning sky blue & airy cyan',
    swatches: ['#F0F9FF', '#FFFFFF', '#0284C7'],
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
    text: '#1E1B18',
    muted: '#685E53',
    border: 'rgba(99, 102, 241, 0.22)',
    accent: '#6366F1',
    accentHover: '#4F46E5',
    accentLight: 'rgba(99, 102, 241, 0.15)',
    accentText: '#FFFFFF',
    shadow: '0 10px 30px -5px rgba(99, 102, 241, 0.1)',
    description: 'Classic warm linen & soft indigo',
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
    text: '#1E1B18',
    muted: '#9D174D',
    border: 'rgba(236, 72, 153, 0.22)',
    accent: '#EC4899',
    accentHover: '#DB2777',
    accentLight: 'rgba(236, 72, 153, 0.15)',
    accentText: '#FFFFFF',
    shadow: '0 10px 30px -5px rgba(236, 72, 153, 0.1)',
    description: 'Bubblegum blush & pastel magenta',
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
    text: '#1E1B18',
    muted: '#1E3A24',
    border: 'rgba(5, 150, 105, 0.22)',
    accent: '#059669',
    accentHover: '#047857',
    accentLight: 'rgba(5, 150, 105, 0.15)',
    accentText: '#FFFFFF',
    shadow: '0 10px 30px -5px rgba(5, 150, 105, 0.1)',
    description: 'Eucalyptus & soft botanical green',
    swatches: ['#F4F7F4', '#FFFFFF', '#059669'],
  },
];

export default function ThemeCustomizer() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeThemeId, setActiveThemeId] = useState<string>('pastel-peach');
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

  // Hydrate on mount - defaults to pastel-peach
  useEffect(() => {
    const savedThemeId = localStorage.getItem('auction_theme_id') || 'pastel-peach';
    const theme = THEMES.find((t) => t.id === savedThemeId) || THEMES[0];

    setActiveThemeId(theme.id);
    applyThemeToDOM(theme);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* NAVBAR PILL BUTTON (CLEAN SIDE PALETTE PICKER) */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold bg-white text-[#1E1B18] hover:bg-orange-50 transition-all border border-[#FED7AA] shadow-xs cursor-pointer"
        title="Palette Options (Side Utility)"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <div className="flex items-center -space-x-1">
          <span
            className="w-2.5 h-2.5 rounded-full border border-black/10"
            style={{ backgroundColor: currentTheme.swatches[0] }}
          />
          <span
            className="w-2.5 h-2.5 rounded-full border border-black/10"
            style={{ backgroundColor: currentTheme.swatches[1] }}
          />
          <span
            className="w-2.5 h-2.5 rounded-full border border-black/10"
            style={{ backgroundColor: currentTheme.swatches[2] }}
          />
        </div>
        <span className="font-bold text-xs tracking-tight">{currentTheme.name}</span>
        <ChevronDown className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* DROPDOWN POPOVER (9 PASTEL OPTIONS) */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 z-50 w-[min(calc(100vw-24px),340px)] bg-white text-[#1E1B18] rounded-2xl shadow-xl border border-[#FED7AA] overflow-hidden text-left animate-fade-in">
          {/* HEADER */}
          <div className="px-4 py-3 border-b border-[#FED7AA] flex items-center justify-between bg-[#FFF7ED]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-700">
                <Palette className="w-3.5 h-3.5" />
              </div>
              <div>
                <h3 className="text-xs font-black tracking-tight leading-none text-[#1E1B18]">
                  Website Color Palette
                </h3>
                <p className="text-[10px] text-[#786C64] mt-0.5">
                  Default: Pastel Peach Sorbet
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-[#786C64] hover:text-[#1E1B18] hover:bg-orange-100 transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* THEMES LIST */}
          <div
            ref={scrollContainerRef}
            className="p-2.5 max-h-[380px] overflow-y-auto space-y-1.5"
          >
            {THEMES.map((theme) => {
              const isSelected = activeThemeId === theme.id;
              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => handleSelectTheme(theme)}
                  className={`w-full p-2 rounded-xl border text-left transition-all flex items-center gap-2.5 cursor-pointer ${
                    isSelected
                      ? 'bg-[#FFF7ED] border-orange-400 font-bold shadow-xs'
                      : 'border-transparent hover:bg-orange-50 hover:border-[#FED7AA]'
                  }`}
                >
                  <div
                    className="w-7 h-7 rounded-lg shrink-0 flex items-center justify-center border border-black/10 shadow-xs relative overflow-hidden"
                    style={{ backgroundColor: theme.bg }}
                  >
                    <div
                      className="w-3 h-3 rounded-full absolute bottom-0.5 right-0.5 border border-black/10"
                      style={{ backgroundColor: theme.accent }}
                    />
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 relative z-10 text-orange-800" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold truncate text-[#1E1B18]">
                        {theme.name}
                      </span>
                      {theme.id === 'pastel-peach' && (
                        <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-orange-100 text-orange-800 border border-orange-200">
                          Default
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-[#786C64] block truncate">
                      {theme.description}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
