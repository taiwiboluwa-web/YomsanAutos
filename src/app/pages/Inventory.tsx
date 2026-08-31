import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, Grid3X3, List } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { vehicles as seedVehicles, formatPrice, type Vehicle } from '../../data/vehicles';
import { VehicleConfigurator } from '../components/showroom/VehicleConfigurator';
import { PageShell } from '../components/navigation/SiteChrome';

type Filter='All'|'SUV'|'Sedan'|'Coupe'|'Available';
type ViewMode='list'|'grid';

export default function Inventory(){
  const [vehicles,setVehicles]=useState<Vehicle[]>(seedVehicles);
  const [filter,setFilter]=useState<Filter>('All');
  const [viewMode,setViewMode]=useState<ViewMode>('list');
  const [selected,setSelected]=useState<Vehicle|null>(null);

  useEffect(()=>{
    fetch('/api/vehicles')
      .then(r=>r.ok?r.json():null)
      .then(d=>Array.isArray(d?.vehicles)&&d.vehicles.length&&setVehicles(d.vehicles))
      .catch(()=>undefined)
  },[]);

  const filtered=useMemo(()=>vehicles.filter(v=>filter==='All'||(filter==='Available'?v.status==='Available':v.type===filter)),[vehicles,filter]);

  return <PageShell>
    <section className="inventory inventory-page">
      <div className="inventory__top">
        <div>
          <p className="eyebrow">YOMSAN AUTOMOBILE / LIVE STOCK</p>
          <h1>Inventory</h1>
          <p className="inventory__intro">Current Yomsan vehicles in Lagos. Filter the stock, compare the essentials and open any vehicle for its full showroom presentation.</p>
        </div>
        <div className="inventory__count"><strong>{String(filtered.length).padStart(2,'0')}</strong><span>vehicles shown</span></div>
      </div>

      <div className="inventory__toolbar">
        <div className="inventory__filters">
          {(['All','SUV','Sedan','Coupe','Available'] as Filter[]).map(f=><button key={f} className={filter===f?'active':''} onClick={()=>setFilter(f)}>{f}</button>)}
        </div>
        <div className="inventory__view-toggle" aria-label="Inventory view">
          <button type="button" className={viewMode==='list'?'active':''} aria-label="List view" aria-pressed={viewMode==='list'} onClick={()=>setViewMode('list')}><List size={17}/></button>
          <button type="button" className={viewMode==='grid'?'active':''} aria-label="Grid view" aria-pressed={viewMode==='grid'} onClick={()=>setViewMode('grid')}><Grid3X3 size={17}/></button>
        </div>
      </div>

      <div className={`inventory-list inventory-list--${viewMode}`}>
        {filtered.map(v=><article className="inventory-item" key={v.id}>
          <button className="inventory-item__visual" onClick={()=>setSelected(v)}>
            <img src={v.hero} alt={`${v.brand} ${v.model}`}/>
            <span className="inventory-status">{v.status}</span>
          </button>
          <div className="inventory-item__main">
            <div className="inventory-item__identity"><small>{v.year} / {v.type} / {v.mileage.toLocaleString()} MI</small><h2>{v.brand}<br/><i>{v.model}</i></h2></div>
            <div className="inventory-item__price"><small>ASKING PRICE</small><strong>{formatPrice(v.price)}</strong><span>{v.engine}</span></div>
          </div>
          <div className="inventory-item__specs"><span><b>{v.hp}</b> HP</span><span><b>{v.mileage.toLocaleString()}</b> MI</span><span><b>{v.year}</b> YEAR</span><button onClick={()=>setSelected(v)}>View vehicle <ArrowUpRight size={15}/></button></div>
        </article>)}
        {!filtered.length&&<div className="inventory-empty">No vehicles match this filter.</div>}
      </div>
    </section>
    {selected&&<AnimatePresence mode="wait"><VehicleConfigurator vehicle={selected} onClose={()=>setSelected(null)}/></AnimatePresence>}
  </PageShell>
}
