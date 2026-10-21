export interface Franchise {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  logo: string;
  city: string;
  titles: number;
}

export const IPL_FRANCHISES: Franchise[] = [
  {
    id: 'csk',
    slug: 'csk',
    name: 'Chennai Super Kings',
    shortName: 'CSK',
    primaryColor: '#FDB913',
    secondaryColor: '#002B49',
    accentColor: '#F2A900',
    logo: '🦁',
    city: 'Chennai',
    titles: 5,
  },
  {
    id: 'mi',
    slug: 'mi',
    name: 'Mumbai Indians',
    shortName: 'MI',
    primaryColor: '#004BA0',
    secondaryColor: '#D1AB3E',
    accentColor: '#0077B6',
    logo: '🌀',
    city: 'Mumbai',
    titles: 5,
  },
  {
    id: 'kkr',
    slug: 'kkr',
    name: 'Kolkata Knight Riders',
    shortName: 'KKR',
    primaryColor: '#3A225D',
    secondaryColor: '#D4AF37',
    accentColor: '#582C83',
    logo: '⚔️',
    city: 'Kolkata',
    titles: 3,
  },
  {
    id: 'srh',
    slug: 'srh',
    name: 'Sunrisers Hyderabad',
    shortName: 'SRH',
    primaryColor: '#F26522',
    secondaryColor: '#000000',
    accentColor: '#FF7F32',
    logo: '🦅',
    city: 'Hyderabad',
    titles: 2,
  },
  {
    id: 'rr',
    slug: 'rr',
    name: 'Rajasthan Royals',
    shortName: 'RR',
    primaryColor: '#EA1A85',
    secondaryColor: '#001D48',
    accentColor: '#FF2E93',
    logo: '👑',
    city: 'Jaipur',
    titles: 1,
  },
  {
    id: 'gt',
    slug: 'gt',
    name: 'Gujarat Titans',
    shortName: 'GT',
    primaryColor: '#1B2133',
    secondaryColor: '#B08D57',
    accentColor: '#2B3956',
    logo: '⚡',
    city: 'Ahmedabad',
    titles: 1,
  },
  {
    id: 'rcb',
    slug: 'rcb',
    name: 'Royal Challengers Bengaluru',
    shortName: 'RCB',
    primaryColor: '#EC1C24',
    secondaryColor: '#000000',
    accentColor: '#C4122F',
    logo: '🛡️',
    city: 'Bengaluru',
    titles: 0,
  },
  {
    id: 'dc',
    slug: 'dc',
    name: 'Delhi Capitals',
    shortName: 'DC',
    primaryColor: '#0078BC',
    secondaryColor: '#EF1B23',
    accentColor: '#005A9C',
    logo: '🐅',
    city: 'Delhi',
    titles: 0,
  },
  {
    id: 'lsg',
    slug: 'lsg',
    name: 'Lucknow Super Giants',
    shortName: 'LSG',
    primaryColor: '#A72056',
    secondaryColor: '#003B73',
    accentColor: '#C72C68',
    logo: '🏹',
    city: 'Lucknow',
    titles: 0,
  },
  {
    id: 'pbks',
    slug: 'pbks',
    name: 'Punjab Kings',
    shortName: 'PBKS',
    primaryColor: '#DD1F2D',
    secondaryColor: '#DCDDDF',
    accentColor: '#E63946',
    logo: '🦁',
    city: 'Mohali',
    titles: 0,
  },
];

export const FRANCHISE_MAP = new Map<string, Franchise>(
  IPL_FRANCHISES.map((f) => [f.id, f])
);
