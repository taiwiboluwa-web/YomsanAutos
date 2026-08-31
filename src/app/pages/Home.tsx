import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import { motion, AnimatePresence } from 'motion/react';
import { vehicles as seedVehicles, type Vehicle } from '../../data/vehicles';
import { PageShell } from '../components/navigation/SiteChrome';

export default function Home() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(seedVehicles);
  const [active, setActive] = useState(0);
  useEffect(() => { fetch('/api/vehicles').then(r => r.ok ? r.json() : null).then(d => Array.isArray(d?.vehicles) && d.vehicles.length && setVehicles(d.vehicles)).catch(() => undefined); }, []);
  useEffect(() => { const id = window.setInterval(() => setActive(v => (v + 1) % Math.max(vehicles.length, 1)), 6000); return () => window.clearInterval(id); }, [vehicles.length]);
  const vehicle = vehicles[active];
  return <PageShell>
    <section className="hero home-hero"><AnimatePresence mode="wait"><motion.img key={vehicle?.id} src={vehicle?.hero} alt={`${vehicle?.brand} ${vehicle?.model}`} initial={{opacity:0,scale:1.04}} animate={{opacity:1,scale:1}} exit={{opacity:0}} transition={{duration:.7}} /></AnimatePresence><div className="hero__veil"/><div className="hero__copy"><p className="eyebrow">YOMSAN AUTOMOBILE / LAGOS</p><h1>YOMSAN<br/><i>AUTOMOBILE.</i></h1><p className="hero__lead">Cars in Lagos. Tokunbo and Nigerian-used automobiles, curated for drivers who expect more.</p><a className="hero-cta" href="/collection">Explore collection <ArrowDown size={17}/></a></div><div className="hero__meta"><span>{String(active+1).padStart(2,'0')}</span><span>{String(vehicles.length).padStart(2,'0')}</span><div className="progress"><i style={{width:`${((active+1)/Math.max(vehicles.length,1))*100}%`}}/></div></div></section>
    <section className="intro"><div><p className="eyebrow">YOMSAN AUTOMOBILE</p><h2>Not a catalogue.<br/><i>A showroom.</i></h2></div><p>Yomsan Nig. Enterprise, also known as Yomsan Autos, is a car dealership based in Egbeda, Lagos, Nigeria. Explore luxury sedans, SUVs and other vehicles, including Tokunbo and Nigerian-used cars.</p></section>
    <section className="home-links"><a href="/collection"><span>01</span><strong>Collection</strong><ArrowUpRight/></a><a href="/experience"><span>02</span><strong>Experience</strong><ArrowUpRight/></a><a href="/inventory"><span>03</span><strong>Inventory</strong><ArrowUpRight/></a><a href="/contact"><span>04</span><strong>Contact</strong><ArrowUpRight/></a></section>
    <Analytics/>
  </PageShell>;
}
