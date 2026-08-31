import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowDown, ArrowUpRight, Menu, X, MessageCircle, Phone, CalendarDays } from 'lucide-react';
import { vehicles, formatPrice, type Vehicle } from '../data/vehicles';
import { VehicleConfigurator } from './components/showroom/VehicleConfigurator';
import './components/showroom/showroom.css';

const whatsapp = 'https://wa.me/2348033090335';

export default function App() {
  const [selected, setSelected] = useState<Vehicle | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeVehicle, setActiveVehicle] = useState(0);

  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  if (selected) return <AnimatePresence mode="wait"><VehicleConfigurator vehicle={selected} onClose={() => setSelected(null)} /></AnimatePresence>;

  return (
    <main className="yomsan">
      <header className="nav">
        <a className="wordmark" href="#top" aria-label="YOMSAN home"><span>Y</span>OMSAN</a>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          <a href="#collection" onClick={() => setMenuOpen(false)}>Collection</a>
          <a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
        <div className="nav-actions"><a href={whatsapp} target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight size={14} /></a><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button></div>
      </header>

      <section className="hero" id="top">
        <img src={vehicles[activeVehicle].hero} alt={`${vehicles[activeVehicle].brand} ${vehicles[activeVehicle].model}`} />
        <div className="hero__veil" />
        <div className="hero__copy">
          <p className="eyebrow">YOMSAN AUTOMOTIVE / LAGOS</p>
          <h1>AUTOMOTIVE.<br /><i>REDEFINED.</i></h1>
          <p className="hero__lead">A private digital showroom for exceptional automobiles. Choose the car. Shape the specification. Make it yours.</p>
          <button className="hero-cta" onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}>Explore collection <ArrowDown size={17} /></button>
        </div>
        <div className="hero__meta"><span>01</span><span>04</span><div className="progress"><i style={{ width: `${((activeVehicle + 1) / vehicles.length) * 100}%` }} /></div></div>
      </section>

      <section className="intro" id="experience">
        <div><p className="eyebrow">THE YOMSAN STANDARD</p><h2>Not a catalogue.<br /><i>A showroom.</i></h2></div>
        <p>Every vehicle deserves more than a thumbnail and a price tag. YOMSAN brings the theatre of a private showroom to the screen — considered photography, decisive typography and an interface built around the vehicle.</p>
      </section>

      <section className="feature" aria-label="Featured vehicle">
        <div className="feature__image"><img src={vehicles[0].hero} alt="Featured YOMSAN vehicle" /><span>01 / FEATURED</span></div>
        <div className="feature__copy"><p className="eyebrow">THE PERFORMANCE COLLECTION</p><h2>{vehicles[0].brand}<br /><i>{vehicles[0].model}</i></h2><p>625 horsepower. V8 biturbo. 8,200 miles. A flagship performance sedan selected for drivers who refuse ordinary.</p><button onClick={() => setSelected(vehicles[0])}>Configure this vehicle <ArrowUpRight /></button></div>
      </section>

      <section className="collection" id="collection">
        <div className="section-head"><div><p className="eyebrow">CURATED / 04 VEHICLES</p><h2>The collection</h2></div><p>Swipe, select, configure. Your next drive starts here.</p></div>
        <div className="vehicle-grid">
          {vehicles.map((vehicle, index) => <motion.article className="vehicle-card" key={vehicle.id} whileHover={{ y: -6 }} onClick={() => setSelected(vehicle)}>
            <div className="vehicle-card__image"><img src={vehicle.hero} alt={`${vehicle.brand} ${vehicle.model}`} /><span>{vehicle.status}</span></div>
            <div className="vehicle-card__body"><div><small>{vehicle.year} / {vehicle.type}</small><h3>{vehicle.brand} <i>{vehicle.model}</i></h3></div><strong>{formatPrice(vehicle.price)}</strong></div>
            <div className="vehicle-card__footer"><span>{vehicle.hp} HP</span><span>{vehicle.mileage.toLocaleString()} MI</span><button aria-label={`Configure ${vehicle.model}`}><ArrowUpRight size={16} /></button></div>
          </motion.article>)}
        </div>
      </section>

      <section className="manifesto"><p className="eyebrow">YOUR NEXT DRIVE</p><h2>Come for the car.<br /><i>Stay for the experience.</i></h2><a href={whatsapp} target="_blank" rel="noreferrer">Start a conversation <ArrowUpRight /></a></section>

      <footer id="contact" className="footer"><div><a className="wordmark" href="#top"><span>Y</span>OMSAN</a><p>Automotive, redefined.</p></div><div className="footer-links"><a href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle /> WhatsApp</a><a href="tel:+2348033090335"><Phone /> +234 803 309 0335</a><a href={whatsapp} target="_blank" rel="noreferrer"><CalendarDays /> Book an inspection</a></div><small>© {new Date().getFullYear()} YOMSAN Autos. All rights reserved.</small></footer>
    </main>
  );
}
