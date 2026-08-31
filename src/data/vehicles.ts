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
  specifications?: Record<string, string>;
};

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=2000&q=88`;
const bmw = img('photo-1555215695-3004980ad54e');
const porsche = img('photo-1503376780353-7e6692767b70');
const porscheAlt = img('photo-1614200187524-dc4b892acf16');
const mercedes = img('photo-1618843479313-40f8afb4b4d8');
const g63 = img('photo-1520031441872-265e4ff70366');
const sedan = img('photo-1494976388531-d1058494cdd8');
const suv = img('photo-1519641471654-76ce0107ad1b');
const pickup = img('photo-1551830820-330a71b99659');
const luxury = img('photo-1542362567-b07e54358753');

const colors = (...names: string[]) => names.map((name, i) => ({ name, value: ['#111111','#f3f3ef','#234d82','#7a1f2b','#777777','#d65a45'][i % 6] }));

export const vehicles: Vehicle[] = [
  { id: 1, brand: 'BMW', model: 'M5 Competition', year: 2023, type: 'Sedan', status: 'Available', price: 115000, mileage: 8200, engine: '4.4L V8 Biturbo', hp: 625, hero: bmw, gallery: [bmw, porscheAlt, mercedes], colors: colors('Obsidian Black','Alpine White','Marina Bay Blue','Brooklyn Grey'), wheels: ['19” M Sport','20” M Performance'], interiors: ['Black Merino Leather','Silverstone / Black'] },
  { id: 2, brand: 'Porsche', model: 'Cayenne GTS', year: 2022, type: 'SUV', status: 'Available', price: 98000, mileage: 14500, engine: '4.0L V8 Twin-Turbo', hp: 453, hero: porsche, gallery: [porsche, porscheAlt, g63], colors: colors('Chalk','Jet Black','Guards Red','Arctic Grey'), wheels: ['21” RS Spyder Design','22” Sport'], interiors: ['Black GTS','Black / Bordeaux'] },
  { id: 3, brand: 'Mercedes-AMG', model: 'GT 63 S', year: 2023, type: 'Coupe', status: 'Reserved', price: 158000, mileage: 3100, engine: '4.0L V8 Biturbo', hp: 630, hero: mercedes, gallery: [mercedes, g63, bmw], colors: colors('Obsidian Black','Polar White','Iridium Silver'), wheels: ['21” AMG Multi-Spoke','21” AMG Forged'], interiors: ['Nappa Black','Red Pepper / Black'] },
  { id: 4, brand: 'Mercedes-AMG', model: 'G 63', year: 2023, type: 'SUV', status: 'Available', price: 185000, mileage: 3400, engine: '4.0L V8 Biturbo', hp: 577, hero: g63, gallery: [g63, mercedes, bmw], colors: colors('Designo White','Night Black','Manufaktur Green'), wheels: ['22” AMG 5-Twin-Spoke','22” AMG Forged'], interiors: ['G Manufaktur Black','Macchiato Beige'] },

  { id: 5, brand: 'Honda', model: 'Accord 2.0T Sport', year: 2021, type: 'Sedan', status: 'Available', price: 38500, mileage: 32000, engine: '2.0L Turbo 4-Cylinder', hp: 252, hero: sedan, gallery: [sedan, bmw, porscheAlt], colors: colors('Crystal Black','Platinum White','Sonic Grey','Still Night Blue'), wheels: ['19” Sport Alloy'], interiors: ['Black Sport Cloth / Leather'] },
  { id: 6, brand: 'Toyota', model: 'RAV4', year: 2022, type: 'SUV', status: 'Available', price: 42000, mileage: 28000, engine: '2.5L 4-Cylinder', hp: 203, hero: suv, gallery: [suv, sedan, g63], colors: colors('Red','Black','White'), wheels: ['19” Alloy'], interiors: ['Black SofTex'] },
  { id: 7, brand: 'Hyundai', model: 'Sonata', year: 2022, type: 'Sedan', status: 'Available', price: 33000, mileage: 24000, engine: '2.5L 4-Cylinder', hp: 191, hero: sedan, gallery: [sedan, porscheAlt, luxury], colors: colors('Blue'), wheels: ['18” Alloy'], interiors: ['Black'] },
  { id: 8, brand: 'Toyota', model: 'Tacoma', year: 2022, type: 'SUV', status: 'Available', price: 48500, mileage: 31000, engine: '3.5L V6', hp: 278, hero: pickup, gallery: [pickup, suv, g63], colors: colors('White','Orange','Black','Blue'), wheels: ['16” Alloy','17” TRD Alloy'], interiors: ['Black Fabric','Black SofTex'] },
  { id: 9, brand: 'Lexus', model: 'RX 350 Sport', year: 2017, type: 'SUV', status: 'Available', price: 36500, mileage: 48000, engine: '3.5L V6', hp: 295, hero: luxury, gallery: [luxury, suv, sedan], colors: colors('White','Black','Wine','Blue'), wheels: ['19” Sport Alloy'], interiors: ['Black Leather','Parchment Leather'] },
  { id: 10, brand: 'Hyundai', model: 'Sonata', year: 2021, type: 'Sedan', status: 'Available', price: 29500, mileage: 39000, engine: '2.5L 4-Cylinder', hp: 191, hero: sedan, gallery: [sedan, luxury, porscheAlt], colors: colors('Grey'), wheels: ['18” Alloy'], interiors: ['Black'] },
  { id: 11, brand: 'Hyundai', model: 'Santa Fe', year: 2022, type: 'SUV', status: 'Available', price: 41000, mileage: 27000, engine: '2.5L 4-Cylinder', hp: 191, hero: suv, gallery: [suv, luxury, pickup], colors: colors('White','Black','Grey'), wheels: ['19” Alloy'], interiors: ['Black Leather'] },
  { id: 12, brand: 'Toyota', model: 'Camry XSE', year: 2021, type: 'Sedan', status: 'Available', price: 36500, mileage: 29000, engine: '3.5L V6', hp: 301, hero: sedan, gallery: [sedan, bmw, luxury], colors: colors('Wine'), wheels: ['19” XSE Alloy'], interiors: ['Black Leather'] },
  { id: 13, brand: 'Toyota', model: 'Camry XSE', year: 2018, type: 'Sedan', status: 'Available', price: 31500, mileage: 52000, engine: '2.5L 4-Cylinder', hp: 203, hero: sedan, gallery: [sedan, luxury, bmw], colors: colors('White','Black','Blue','Wine'), wheels: ['18” Alloy'], interiors: ['Black Leather','Red Leather'], specifications: { 'Engine': '2.5L 4-cylinder engine', 'Power': '203 horsepower', 'Transmission': '8-speed automatic transmission', 'Wheels': '18-inch alloy wheels', 'Infotainment': '7-inch touchscreen | Apple CarPlay & Android Auto', 'Connectivity': 'Bluetooth & keyless entry', 'Safety': 'Toyota Safety Sense: adaptive cruise control, lane departure warning, automatic emergency braking', 'Camera': 'Rearview camera', 'Start': 'Push button start' } }
];

export const formatPrice = (value: number) => `₦${new Intl.NumberFormat('en-NG', { maximumFractionDigits: 0 }).format(value * 1000)}`;
