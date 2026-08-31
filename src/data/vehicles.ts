export type Vehicle = {
  id: number;
  brand: string;
  model: string;
  year: number;
  type: string;
  status: 'Available' | 'Reserved';
  price: number;
  mileage: number;
  engine: string;
  hp: number;
  hero: string;
  gallery: string[];
  colors: { name: string; value: string; image?: string }[];
  wheels: string[];
  interiors: string[];
};

// Use stable, direct image URLs instead of /src/imports browser paths.
// The old local paths were not valid public Vite URLs in production.
const bmw = 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=2000&q=88';
const porsche = 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=88';
const porscheAlt = 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=1800&q=85';
const mercedes = 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=2000&q=88';
const g63 = 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=2000&q=88';

export const vehicles: Vehicle[] = [
  {
    id: 1, brand: 'BMW', model: 'M5 Competition', year: 2023, type: 'Sedan', status: 'Available',
    price: 115000, mileage: 8200, engine: '4.4L V8 Biturbo', hp: 625,
    hero: bmw, gallery: [bmw, porscheAlt, mercedes],
    colors: [{ name: 'Obsidian Black', value: '#0b0d0f' }, { name: 'Alpine White', value: '#f0f0ec' }, { name: 'Marina Bay Blue', value: '#254b78' }, { name: 'Brooklyn Grey', value: '#777b7e' }],
    wheels: ['19” M Sport', '20” M Performance'], interiors: ['Black Merino Leather', 'Silverstone / Black']
  },
  {
    id: 2, brand: 'Porsche', model: 'Cayenne GTS', year: 2022, type: 'SUV', status: 'Available',
    price: 98000, mileage: 14500, engine: '4.0L V8 Twin-Turbo', hp: 453,
    hero: porsche, gallery: [porsche, porscheAlt, g63],
    colors: [{ name: 'Chalk', value: '#d7d5cc' }, { name: 'Jet Black', value: '#101113' }, { name: 'Guards Red', value: '#7c1d20' }, { name: 'Arctic Grey', value: '#73777a' }],
    wheels: ['21” RS Spyder Design', '22” Sport'], interiors: ['Black GTS', 'Black / Bordeaux']
  },
  {
    id: 3, brand: 'Mercedes-AMG', model: 'GT 63 S', year: 2023, type: 'Coupe', status: 'Reserved',
    price: 158000, mileage: 3100, engine: '4.0L V8 Biturbo', hp: 630,
    hero: mercedes, gallery: [mercedes, g63, bmw],
    colors: [{ name: 'Obsidian Black', value: '#0c0d0e' }, { name: 'Polar White', value: '#e9e9e5' }, { name: 'Iridium Silver', value: '#888b8d' }],
    wheels: ['21” AMG Multi-Spoke', '21” AMG Forged'], interiors: ['Nappa Black', 'Red Pepper / Black']
  },
  {
    id: 4, brand: 'Mercedes-AMG', model: 'G 63', year: 2023, type: 'SUV', status: 'Available',
    price: 185000, mileage: 3400, engine: '4.0L V8 Biturbo', hp: 577,
    hero: g63, gallery: [g63, mercedes, bmw],
    colors: [{ name: 'Designo White', value: '#e8e7df' }, { name: 'Night Black', value: '#111214' }, { name: 'Manufaktur Green', value: '#3e5144' }],
    wheels: ['22” AMG 5-Twin-Spoke', '22” AMG Forged'], interiors: ['G Manufaktur Black', 'Macchiato Beige']
  }
];

export const formatPrice = (value: number) => `₦${new Intl.NumberFormat('en-NG', { maximumFractionDigits: 0 }).format(value * 1000)}`;
