import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { vehicles as seedVehicles, type Vehicle } from '../../data/vehicles';
import { PageShell } from '../components/navigation/SiteChrome';

export default function Home() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(seedVehicles);
  const [active, setActive] = useState(0);
  useEffect(() => { fetch('/api/vehicles', { cache: 'no-store' }).then(r => r.ok ? r.json() : null).then(d => Array.isArray(d?.vehicles) && d.vehicles.length && setVehicles(d.vehicles)).catch(() => undefined); }, []);
  useEffect(() => { const id = window.setInterval(() => setActive(v => (v + 1) % Math.max(vehicles.length, 1)), 6000); return () => window.clearInterval(id); }, [vehicles.length]);
  const vehicle = vehicles[active] || seedVehicles[0];
  const spotlight = vehicles.find(v => v.brand === 'Toyota' && v.model === 'Camry XSE') || vehicle;
  return <PageShell>
    <section className="hero home-hero">
      <AnimatePresence mode="wait"><motion.img key={vehicle?.id} src={vehicle?.hero} alt={`${vehicle?.brand} ${vehicle?.model}`} initial={{opacity:0,scale:1.04}} animate={{opacity:1,scale:1}} exit={{opacity:0}} transition={{duration:.7}} /></AnimatePresence>
      <div className="hero__veil"/>
      <div className="hero__copy"><p className="eyebrow">YOMSAN AUTOMOBILE / LAGOS</p><h1>THE ART<br/><i>OF THE DRIVE.</i></h1><p className="hero__lead">A curated automotive showroom for drivers who expect considered design, verified detail and a better way to find their next car.</p><a className="hero-cta" href="/collection">Explore the collection <ArrowDown size={17}/></a></div>
      <div className="hero__meta"><span>{String(active+1).padStart(2,'0')}</span><span>{String(vehicles.length).padStart(2,'0')}</span><div className="progress"><i style={{width:`${((active+1)/Math.max(vehicles.length,1))*100}%`}}/></div></div>
    </section>
    <div className="showroom-rail"><span>Yomsan Automobile</span><i/><b>Curated inventory</b><i/><b>Tokunbo &amp; Nigerian-used</b><i/><b>Egbeda · Lagos</b><i/><b>By appointment</b></div>
    <section className="intro"><div><p className="eyebrow">01 / THE SHOWROOM</p><h2>Not a catalogue.<br/><i>A point of view.</i></h2></div><p>We present automobiles as they should be experienced: with space, context and attention to the details that make each vehicle worth choosing. Browse the collection, configure a car and speak with Yomsan when you are ready.</p></section>
    <section className="home-spotlight"><div className="home-spotlight__visual"><img src={spotlight.hero} alt={`${spotlight.brand} ${spotlight.model}`} /><div className="home-spotlight__veil"/><span className="home-spotlight__label">02 / FEATURED VEHICLE</span><div className="home-spotlight__caption"><small>{spotlight.year} / {spotlight.type} / {spotlight.status}</small><strong>{spotlight.brand} <em>{spotlight.model}</em></strong></div></div><div className="home-spotlight__copy"><p className="eyebrow">THE CURRENT EDIT</p><h2>Chosen for<br/><em>the road ahead.</em></h2><p>{spotlight.engine} · {spotlight.hp} HP · {spotlight.mileage.toLocaleString()} miles. Explore the vehicle in the Yomsan configurator and see its available finishes, wheels and interior choices.</p><a href="/collection">Open vehicle <ArrowUpRight size={15}/></a></div></section>
    <section className="home-links"><a href="/collection"><span>03</span><strong>The Collection</strong><ArrowUpRight/></a><a href="/experience"><span>04</span><strong>The Experience</strong><ArrowUpRight/></a><a href="/inventory"><span>05</span><strong>Live Inventory</strong><ArrowUpRight/></a><a href="/contact"><span>06</span><strong>Visit Yomsan</strong><ArrowUpRight/></a></section>
  </PageShell>;
}
