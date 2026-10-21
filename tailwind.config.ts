import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ipl: {
          dark: '#0a0e1a',
          card: '#131b2e',
          border: '#1e293b',
          gold: '#eab308',
          accent: '#3b82f6',
        },
        franchise: {
          csk: '#FDB913',
          mi: '#004BA0',
          rcb: '#EC1C24',
          kkr: '#3A225D',
          dc: '#0078BC',
          rr: '#EA1A85',
          pbks: '#DD1F2D',
          srh: '#F26522',
          lsg: '#A72056',
          gt: '#1B2133',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
