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

const img = (url: string) => url;
const bmw = img('https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=2000&q=88');
const porsche = img('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=88');
const porscheAlt = img('https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=2000&q=88');
const mercedes = img('https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=2000&q=88');
const g63 = img('https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=2000&q=88');

// Model-correct reference photography for the Yomsan inventory.
const accordSport = 'https://images.dealersync.com/2074/Photos/1151857/20240626011726375140_image-5.jpg?_=43eaf64ca3928a3405712b75193a00f22a5d0400';
const accordSportRear = 'https://www.groovecar.com/stock/images/color/2021/honda/accord/touring-4dr-sedan/2021-honda-accord-touring-4dr-sedan-crystal-black-pearl-composite-large.jpg';
const rav4Red = 'https://superauto.wpcdn.pl/articles/61f1ddf2c8a36b5f56fe46b8bf55dc5b.jpg';
const rav4White = 'https://platform.cstatic-images.com/in/v2/stock_photos/2456b757-6be1-4f33-941b-96c9f29a05ae/4e58f880-8185-4f80-a475-31a4e93928f2.png';
const rav4Black = 'https://images.dealer.com/autodata/us/color/2022/USD20TOS202D0/218.jpg?imdensity=1&impolicy=downsize_bkpt&w=520';
const rav4Rear = 'https://img.sm360.ca/images/newcar/ca/2022/toyota/rav4/xle-awd/suv/exteriorColors/13427_cc0640_014_03t3.png';
const sonataBlue = 'https://platform.cstatic-images.com/in/v2/stock_photos/2bfeecf8-1ded-4256-9340-7e5aa4959fc6/441dbf1a-1dd6-4545-a9c4-8d422ffc00b1.png';
const sonataBlueRear = 'https://cdn.jdpower.com/ChromeImageGallery/Expanded/Transparent/640/2022HYC03_640/2022HYC030002_640_02.png';
const sonataGrey = 'https://d2jmpenrqu1d7z.cloudfront.net/wp-content/uploads/2021/04/Large-36007-2021Sonata-scaled.jpg';
const sonataGreyRear = 'https://imgcdnblog.carbay.com/wp-content/uploads/2020/07/24163416/2-98.jpg';
const tacomaBlue = 'https://inventory.autoznetwork.com/16/65674/w_800%2Ch_600%2Cfit_cover%2Cpos_attention/6815795d4dc03.jpg';
const tacomaBlueOfficial = 'https://media.toyota.ca/content/dam/media-toyota/toyota-models/tacoma/2019-2021-toyota-tacoma/IMG_1382.jpg';
const tacomaBlack = 'https://static.cargurus.com/images/forsale/2026/05/17/01/18/2022_toyota_tacoma-pic-131219847761190473-1024x768.jpeg';
const lexusWhite = 'https://hips.hearstapps.com/autoweek/assets/s3fs-public/2016_lexus_rx_350_005_3cab33?';
const lexusWhiteExact = 'https://hips.hearstapps.com/autoweek/assets/s3fs-public/2016_lexus_rx_350_005_3cab3fa335162c2335af48894b52728ee7698eeb.jpg';
const lexusWhiteRear = 'https://hips.hearstapps.com/autoweek/assets/s3fs-public/2016_lexus_rx_350_007_f6ad61482b815d8fec9ca0a44026e6d83e282f9e.jpg';
const lexusBlack = 'https://img2.carmax.com/assets/28815986/hero.jpg?height=600&width=800';
const lexusBlue = 'https://www.sayartii.com/uploads/cars/17592199565740/f47ec655867303610a0182fdd09026437fd94638_med.jpg';
const santaFeWhite = 'https://static.cargurus.com/images/forsale/2026/02/14/07/05/2022_hyundai_santa_fe-pic-3410722865192520442-1024x768.jpeg';
const santaFeWhiteStudio = 'https://www.groovecar.com/stock/images/color/2022/hyundai/santa-fe-plug-in-hybrid/awd-sel-convenience-4dr-crossover/2022-hyundai-santa-fe-plug-in-hybrid-awd-sel-convenience-4dr-crossover-quartz-white-composite-large.jpg';
const camryWhite = 'https://doubleclutch.ca/wp-content/uploads/2017/10/IMG_1648.jpg';
const camryBlack = 'https://static.cargurus.com/images/site/2019/04/23/11/06/2018_toyota_camry_xse-pic-7647287773869276944-1600x1200.jpeg';
const camryBlue = 'https://automanagerprodcdn.azureedge.net/wmphotos/034940/b9ee3ade41f54860bad1a2b12b3b964c/fd2415f208_1280.jpg';
const camryWine = 'https://cdn.ebizautos.media/used-2018-toyota-camry-xsev6automatic-14395-22960575-4-640.jpg';
const camryWineAngles = 'https://www.groovecar.com/stock/images/color/2021/toyota/camry/xse-4dr-sedan/2021-toyota-camry-xse-4dr-sedan-supersonic-red-w-midnight-black-roof-composite-large.jpg';

const colors = (...names: string[]) => names.map((name, i) => ({ name, value: ['#111111','#f3f3ef','#234d82','#7a1f2b','#777777','#d65a45'][i % 6] }));

export const vehicles: Vehicle[] = [
  { id: 1, brand: 'BMW', model: 'M5 Competition', year: 2023, type: 'Sedan', status: 'Available', price: 115000, mileage: 8200, engine: '4.4L V8 Biturbo', hp: 625, hero: bmw, gallery: [bmw, porscheAlt, mercedes], colors: colors('Obsidian Black','Alpine White','Marina Bay Blue','Brooklyn Grey'), wheels: ['19” M Sport','20” M Performance'], interiors: ['Black Merino Leather','Silverstone / Black'] },
  { id: 2, brand: 'Porsche', model: 'Cayenne GTS', year: 2022, type: 'SUV', status: 'Available', price: 98000, mileage: 14500, engine: '4.0L V8 Twin-Turbo', hp: 453, hero: porsche, gallery: [porsche, porscheAlt, g63], colors: colors('Chalk','Jet Black','Guards Red','Arctic Grey'), wheels: ['21” RS Spyder Design','22” Sport'], interiors: ['Black GTS','Black / Bordeaux'] },
  { id: 3, brand: 'Mercedes-AMG', model: 'GT 63 S', year: 2023, type: 'Coupe', status: 'Reserved', price: 158000, mileage: 3100, engine: '4.0L V8 Biturbo', hp: 630, hero: mercedes, gallery: [mercedes, g63, bmw], colors: colors('Obsidian Black','Polar White','Iridium Silver'), wheels: ['21” AMG Multi-Spoke','21” AMG Forged'], interiors: ['Nappa Black','Red Pepper / Black'] },
  { id: 4, brand: 'Mercedes-AMG', model: 'G 63', year: 2023, type: 'SUV', status: 'Available', price: 185000, mileage: 3400, engine: '4.0L V8 Biturbo', hp: 577, hero: g63, gallery: [g63, mercedes, bmw], colors: colors('Designo White','Night Black','Manufaktur Green'), wheels: ['22” AMG 5-Twin-Spoke','22” AMG Forged'], interiors: ['G Manufaktur Black','Macchiato Beige'] },
  { id: 5, brand: 'Honda', model: 'Accord 2.0T Sport', year: 2021, type: 'Sedan', status: 'Available', price: 38500, mileage: 32000, engine: '2.0L Turbo 4-Cylinder', hp: 252, hero: accordSport, gallery: [accordSport, accordSportRear], colors: colors('Platinum White','Crystal Black','Sonic Grey','San Marino Red'), wheels: ['19” Sport Alloy'], interiors: ['Black Sport Cloth / Leather'], specifications: { 'Engine': '2.0L turbocharged 4-cylinder', 'Power': '252 horsepower', 'Transmission': '10-speed automatic' } },
  { id: 6, brand: 'Toyota', model: 'RAV4', year: 2022, type: 'SUV', status: 'Available', price: 42000, mileage: 28000, engine: '2.5L 4-Cylinder', hp: 203, hero: rav4Red, gallery: [rav4Red, rav4Rear, rav4White, rav4Black], colors: [{ name: 'Red', value: '#b51e2b', image: rav4Red }, { name: 'Black', value: '#111111', image: rav4Black }, { name: 'White', value: '#f3f3ef', image: rav4White }], wheels: ['19” Alloy'], interiors: ['Black SofTex'] },
  { id: 7, brand: 'Hyundai', model: 'Sonata', year: 2022, type: 'Sedan', status: 'Available', price: 33000, mileage: 24000, engine: '2.5L 4-Cylinder', hp: 191, hero: sonataBlue, gallery: [sonataBlue, sonataBlueRear], colors: [{ name: 'Blue', value: '#183f70', image: sonataBlue }], wheels: ['18” Alloy'], interiors: ['Black'] },
  { id: 8, brand: 'Toyota', model: 'Tacoma', year: 2022, type: 'Pickup', status: 'Available', price: 48500, mileage: 31000, engine: '3.5L V6', hp: 278, hero: tacomaBlue, gallery: [tacomaBlue, tacomaBlueOfficial, tacomaBlack], colors: [{ name: 'White', value: '#f3f3ef' }, { name: 'Orange', value: '#e36a27' }, { name: 'Black', value: '#111111', image: tacomaBlack }, { name: 'Blue', value: '#263e91', image: tacomaBlue }], wheels: ['16” Alloy','17” TRD Alloy'], interiors: ['Black Fabric','Black SofTex'] },
  { id: 9, brand: 'Lexus', model: 'RX 350 Sport', year: 2017, type: 'SUV', status: 'Available', price: 36500, mileage: 48000, engine: '3.5L V6', hp: 295, hero: lexusWhiteExact, gallery: [lexusWhiteExact, lexusWhiteRear, lexusBlack, lexusBlue], colors: [{ name: 'White', value: '#f3f3ef', image: lexusWhiteExact }, { name: 'Black', value: '#111111', image: lexusBlack }, { name: 'Wine', value: '#7a1f2b' }, { name: 'Blue', value: '#183f70', image: lexusBlue }], wheels: ['19” Sport Alloy'], interiors: ['Black Leather','Parchment Leather'] },
  { id: 10, brand: 'Hyundai', model: 'Sonata', year: 2021, type: 'Sedan', status: 'Available', price: 29500, mileage: 39000, engine: '2.5L 4-Cylinder', hp: 191, hero: sonataGrey, gallery: [sonataGrey, sonataGreyRear], colors: [{ name: 'Grey', value: '#777777', image: sonataGrey }], wheels: ['18” Alloy'], interiors: ['Black'] },
  { id: 11, brand: 'Hyundai', model: 'Santa Fe', year: 2022, type: 'SUV', status: 'Available', price: 41000, mileage: 27000, engine: '2.5L 4-Cylinder', hp: 191, hero: santaFeWhite, gallery: [santaFeWhite, santaFeWhiteStudio], colors: colors('White','Black','Grey'), wheels: ['19” Alloy'], interiors: ['Black Leather'] },
  { id: 12, brand: 'Toyota', model: 'Camry XSE', year: 2021, type: 'Sedan', status: 'Available', price: 36500, mileage: 29000, engine: '3.5L V6', hp: 301, hero: camryWine, gallery: [camryWine, camryWineAngles], colors: [{ name: 'Wine', value: '#7a1f2b', image: camryWine }], wheels: ['19” XSE Alloy'], interiors: ['Black Leather'] },
  { id: 13, brand: 'Toyota', model: 'Camry XSE', year: 2018, type: 'Sedan', status: 'Available', price: 31500, mileage: 52000, engine: '2.5L 4-Cylinder', hp: 203, hero: camryWhite, gallery: [camryWhite, camryBlack, camryBlue, camryWine], colors: [{ name: 'White', value: '#f3f3ef', image: camryWhite }, { name: 'Black', value: '#111111', image: camryBlack }, { name: 'Blue', value: '#234d82', image: camryBlue }, { name: 'Wine', value: '#7a1f2b', image: camryWine }], wheels: ['18” Alloy'], interiors: ['Black Leather','Red Leather'], specifications: { 'Engine': '2.5L 4-cylinder engine', 'Power': '203 horsepower', 'Transmission': '8-speed automatic transmission', 'Wheels': '18-inch alloy wheels', 'Infotainment': '7-inch touchscreen | Apple CarPlay & Android Auto', 'Connectivity': 'Bluetooth & keyless entry', 'Safety': 'Toyota Safety Sense: adaptive cruise control, lane departure warning, automatic emergency braking', 'Camera': 'Rearview camera', 'Start': 'Push button start' } }
];

export const formatPrice = (value: number) => `₦${new Intl.NumberFormat('en-NG', { maximumFractionDigits: 0 }).format(value * 1000)}`;
