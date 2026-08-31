import { useEffect, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { vehicles as seedVehicles, formatPrice, type Vehicle } from '../../data/vehicles';
import { VehicleConfigurator } from '../components/showroom/VehicleConfigurator';
import { PageShell } from '../components/navigation/SiteChrome';

export default function Collection() {
  const [vehicles,setVehicles]=useState<Vehicle[]>(seedVehicles); const [selected,setSelected]=useState<Vehicle|null>(null);
  useEffect(()=>{fetch('/api/vehicles').then(r=>r.ok?r.json():null).then(d=>Array.isArray(d?.vehicles)&&d.vehicles.length&&setVehicles(d.vehicles)).catch(()=>undefined)},[]);
  useEffect(()=>{document.body.style.overflow=selected?'hidden':'';return()=>{document.body.style.overflow=''}},[selected]);
  return <PageShell><section className="page-hero"><p className="eyebrow">YOMSAN AUTOMOBILE / THE COLLECTION</p><h1>Cars chosen<br/><i>with intent.</i></h1><p>Luxury sedans, SUVs, coupes and more. Every vehicle presented with the detail it deserves.</p></section><section className="collection collection-page"><div className="section-head"><div><p className="eyebrow">CURATED / {String(vehicles.length).padStart(2,'0')} VEHICLES</p><h2>The collection</h2></div><p>Explore, select and configure your next vehicle.</p></div><div className="vehicle-grid">{vehicles.map(v=><motion.article className="vehicle-card" key={v.id} whileHover={{y:-6}} onClick={()=>setSelected(v)}><div className="vehicle-card__image"><img src={v.hero} alt={`${v.brand} ${v.model}`}/><span>{v.status}</span></div><div className="vehicle-card__body"><div><small>{v.year} / {v.type}</small><h3>{v.brand} <i>{v.model}</i></h3></div><strong>{formatPrice(v.price)}</strong></div><div className="vehicle-card__footer"><span>{v.hp} HP</span><span>{v.mileage.toLocaleString()} MI</span><button aria-label={`Configure ${v.model}`}><ArrowUpRight size={16}/></button></div></motion.article>)}</div></section>{selected&&<AnimatePresence mode="wait"><VehicleConfigurator vehicle={selected} onClose={()=>setSelected(null)}/></AnimatePresence>}<div className="page-close-hint"><X size={13}/> Select a vehicle to open its showroom configurator.</div></PageShell>;
}
