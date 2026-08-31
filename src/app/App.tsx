import { useEffect, useMemo, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowDown, ArrowUpRight, CalendarDays, Instagram, MapPin, Menu, MessageCircle, Phone, X } from 'lucide-react';
import { vehicles as seedVehicles, formatPrice, type Vehicle } from '../data/vehicles';
import { VehicleConfigurator } from './components/showroom/VehicleConfigurator';
import Admin from './pages/Admin';
import './components/showroom/showroom.css';
import './pages/admin.css';

const whatsapp = 'https://wa.me/2348126507771';
const phone = 'tel:+2348126507771';
const maps = 'https://maps.app.goo.gl/amXuVpGiJFSiKFde8';
const instagram = 'https://www.instagram.com/yomsanautomobile';

type InventoryFilter = 'All' | 'SUV' | 'Sedan' | 'Coupe' | 'Available';

export default function App() {
  if (window.location.pathname.startsWith('/admin')) return <><Admin /><Analytics /></>;
  return <Showroom />;
}

function Showroom() {
  const [selected, setSelected] = useState<Vehicle | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeVehicle, setActiveVehicle] = useState(0);
  const [inventoryFilter, setInventoryFilter] = useState<InventoryFilter>('All');
  const [vehicles, setVehicles] = useState<Vehicle[]>(seedVehicles);

  useEffect(() => {
    fetch('/api/vehicles').then(r => r.ok ? r.json() : null).then(data => {
      if (Array.isArray(data?.vehicles) && data.vehicles.length) setVehicles(data.vehicles);
    }).catch(() => undefined);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const section = document.getElementById('experience');
      if (!section || !vehicles.length) return;
      const progress = Math.max(0, Math.min(0.999, window.scrollY / Math.max(1, section.offsetTop)));
      setActiveVehicle(Math.min(vehicles.length - 1, Math.floor(progress * vehicles.length)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [vehicles.length]);

  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  const filteredInventory = useMemo(() => vehicles.filter(vehicle => {
    if (inventoryFilter === 'Available') return vehicle.status === 'Available';
    if (inventoryFilter === 'All') return true;
    return vehicle.type === inventoryFilter;
  }), [vehicles, inventoryFilter]);

  if (selected) return <><AnimatePresence mode="wait"><VehicleConfigurator vehicle={selected} onClose={() => setSelected(null)} /></AnimatePresence><Analytics /></>;
  const heroVehicle = vehicles[activeVehicle] ?? vehicles[0];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return <>
    <main className="yomsan">
      <header className="nav">
        <a className="wordmark" href="#top" aria-label="Yomsan Automobile home"><span>Y</span>OMSAN</a>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          <a href="#collection" onClick={() => setMenuOpen(false)}>Collection</a>
          <a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          <a href="#inventory" onClick={() => setMenuOpen(false)}>Inventory</a>
        </nav>
        <div className="nav-actions">
          <a href={whatsapp} target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight size={14} /></a>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </header>

      <section className="hero" id="top">
        <AnimatePresence mode="wait"><motion.img key={heroVehicle?.id} src={heroVehicle?.hero} alt={`${heroVehicle?.brand} ${heroVehicle?.model}`} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: .7 }} /></AnimatePresence>
        <div className="hero__veil" />
        <div className="hero__copy">
          <p className="eyebrow">YOMSAN AUTOMOBILE / LAGOS</p>
          <h1>YOMSAN<br /><i>AUTOMOBILE.</i></h1>
          <p className="hero__lead">Cars in Lagos. Tokunbo and Nigerian-used automobiles, curated for drivers who expect more.</p>
          <button className="hero-cta" onClick={() => scrollTo('collection')}>Explore collection <ArrowDown size={17} /></button>
        </div>
        <div className="hero__meta"><span>{String(activeVehicle + 1).padStart(2, '0')}</span><span>{String(vehicles.length).padStart(2, '0')}</span><div className="progress"><i style={{ width: `${((activeVehicle + 1) / Math.max(vehicles.length,1)) * 100}%` }} /></div></div>
      </section>

      <section className="intro" id="experience"><div><p className="eyebrow">YOMSAN AUTOMOBILE</p><h2>Not a catalogue.<br /><i>A showroom.</i></h2></div><p>Yomsan Nig. Enterprise, also known as Yomsan Autos, is a car dealership based in Egbeda, Lagos, Nigeria. Explore luxury sedans, SUVs and other vehicles, including Tokunbo and Nigerian-used cars.</p></section>

      <section className="feature" aria-label="Featured vehicle"><div className="feature__image"><img src={vehicles[0]?.hero} alt="Featured Yomsan Automobile vehicle" /><span>01 / FEATURED</span></div><div className="feature__copy"><p className="eyebrow">THE COLLECTION</p><h2>{vehicles[0]?.brand}<br /><i>{vehicles[0]?.model}</i></h2><p>{vehicles[0]?.hp} horsepower. {vehicles[0]?.engine}. {vehicles[0]?.mileage?.toLocaleString()} miles. Selected for drivers who refuse ordinary.</p><button onClick={() => vehicles[0] && setSelected(vehicles[0])}>Configure this vehicle <ArrowUpRight /></button></div></section>

      <section className="collection" id="collection"><div className="section-head"><div><p className="eyebrow">CURATED / {String(vehicles.length).padStart(2, '0')} VEHICLES</p><h2>The collection</h2></div><p>Explore, select, configure. Your next drive starts here.</p></div><div className="vehicle-grid">{vehicles.map(vehicle => <motion.article className="vehicle-card" key={vehicle.id} whileHover={{ y: -6 }} onClick={() => setSelected(vehicle)}><div className="vehicle-card__image"><img src={vehicle.hero} alt={`${vehicle.brand} ${vehicle.model}`} /><span>{vehicle.status}</span></div><div className="vehicle-card__body"><div><small>{vehicle.year} / {vehicle.type}</small><h3>{vehicle.brand} <i>{vehicle.model}</i></h3></div><strong>{formatPrice(vehicle.price)}</strong></div><div className="vehicle-card__footer"><span>{vehicle.hp} HP</span><span>{vehicle.mileage.toLocaleString()} MI</span><button aria-label={`Configure ${vehicle.model}`}><ArrowUpRight size={16} /></button></div></motion.article>)}</div></section>

      <section className="inventory" id="inventory">
        <div className="inventory__top">
          <div><p className="eyebrow">YOMSAN AUTOMOBILE / LIVE STOCK</p><h2>Inventory</h2><p className="inventory__intro">Browse vehicles currently in the Yomsan collection. Filter, compare at a glance and open any vehicle to configure or enquire.</p></div>
          <div className="inventory__count"><strong>{String(filteredInventory.length).padStart(2, '0')}</strong><span>vehicles shown</span></div>
        </div>
        <div className="inventory__filters" aria-label="Inventory filters">{(['All', 'SUV', 'Sedan', 'Coupe', 'Available'] as InventoryFilter[]).map(filter => <button key={filter} className={inventoryFilter === filter ? 'active' : ''} onClick={() => setInventoryFilter(filter)}>{filter}</button>)}</div>
        <div className="inventory-list">
          {filteredInventory.map((vehicle, index) => <motion.article className="inventory-item" key={vehicle.id} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .45, delay: Math.min(index * .04, .2) }}>
            <button className="inventory-item__visual" onClick={() => setSelected(vehicle)} aria-label={`View ${vehicle.brand} ${vehicle.model}`}><img src={vehicle.hero} alt={`${vehicle.brand} ${vehicle.model}`} /><span className="inventory-status">{vehicle.status}</span></button>
            <div className="inventory-item__main"><div className="inventory-item__identity"><small>{vehicle.year} / {vehicle.type} / {vehicle.mileage.toLocaleString()} MI</small><h3>{vehicle.brand}<br /><i>{vehicle.model}</i></h3></div><div className="inventory-item__price"><small>ASKING PRICE</small><strong>{formatPrice(vehicle.price)}</strong><span>{vehicle.engine}</span></div></div>
            <div className="inventory-item__specs"><span><b>{vehicle.hp}</b> HP</span><span><b>{vehicle.mileage.toLocaleString()}</b> MI</span><span><b>{vehicle.year}</b> YEAR</span><button onClick={() => setSelected(vehicle)}>View vehicle <ArrowUpRight size={15} /></button></div>
          </motion.article>)}
          {!filteredInventory.length && <div className="inventory-empty">No vehicles match this filter. <button onClick={() => setInventoryFilter('All')}>View all inventory</button></div>}
        </div>
      </section>

      <section className="manifesto"><p className="eyebrow">YOUR NEXT DRIVE</p><h2>Yomsan Automobile.<br /><i>Cars in Lagos.</i></h2><a href={whatsapp} target="_blank" rel="noreferrer">Start a conversation <ArrowUpRight /></a></section>

      <footer id="contact" className="footer">
        <div className="footer__top"><div className="footer-region"><p className="footer-label">Current Region / Language</p><div className="region-pill"><span>NG</span><strong>Nigeria / English</strong><button>Change</button></div></div><a className="scroll-top" href="#top">Scroll up <ArrowDown size={13} /></a></div>
        <div className="footer__grid">
          <div><p className="footer-label">Locations & Contacts</p><a className="footer-heading" href={whatsapp} target="_blank" rel="noreferrer">Get in touch <ArrowUpRight size={14} /></a><p>Egbeda, Lagos, Nigeria</p><p>+234 812 650 7771</p></div>
          <div><p className="footer-label">Yomsan Automobile</p><a href="#collection">The Collection</a><a href="#inventory">Inventory</a><a href="#experience">The Experience</a><a href={maps} target="_blank" rel="noreferrer">Find our showroom</a></div>
          <div><p className="footer-label">Connect</p><a href={instagram} target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={14} /></a><a href={whatsapp} target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight size={14} /></a><a href={phone}>Call Yomsan <ArrowUpRight size={14} /></a><a href={maps} target="_blank" rel="noreferrer">Google Maps <ArrowUpRight size={14} /></a></div>
        </div>
        <div className="footer__bottom"><div className="social-icons"><a href={instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={18} /></a><a href={whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle size={18} /></a><a href={maps} target="_blank" rel="noreferrer" aria-label="Location"><MapPin size={18} /></a><a href={phone} aria-label="Phone"><Phone size={18} /></a><a href={whatsapp} target="_blank" rel="noreferrer" aria-label="Book inspection"><CalendarDays size={18} /></a></div><small>© 2026 Yomsan Motors Sdn. Bhd. All rights reserved.</small><a href="#top" className="footer-wordmark"><span>Y</span>OMSAN</a></div>
      </footer>
    </main><Analytics />
  </>;
}
