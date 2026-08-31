import { useMemo, useState } from 'react';
import { ArrowUpRight, Check, ChevronLeft, ChevronRight, MessageCircle, Phone, CalendarDays } from 'lucide-react';
import { motion } from 'motion/react';
import type { Vehicle } from '../../../data/vehicles';
import { formatPrice } from '../../../data/vehicles';

type Props = { vehicle: Vehicle; onClose: () => void };

export function VehicleConfigurator({ vehicle, onClose }: Props) {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [color, setColor] = useState(0);
  const [wheel, setWheel] = useState(0);
  const [interior, setInterior] = useState(0);

  const image = useMemo(() => {
    const colorImage = vehicle.colors[color]?.image;
    if (colorImage) return colorImage;
    return vehicle.gallery[galleryIndex];
  }, [vehicle, galleryIndex, color]);

  const visualFilter = useMemo(() => {
    const hue = [0, 0, -8, 5][color] ?? 0;
    const brightness = interior === 1 ? 1.04 : 1;
    const contrast = wheel === 1 ? 1.08 : 1.02;
    return `saturate(${color === 0 ? 0.72 : 0.94}) hue-rotate(${hue}deg) brightness(${brightness}) contrast(${contrast})`;
  }, [color, wheel, interior]);

  const whatsapp = `https://wa.me/2348033090335?text=${encodeURIComponent(`Hello YOMSAN, I am interested in the ${vehicle.year} ${vehicle.brand} ${vehicle.model}. Exterior: ${vehicle.colors[color].name}. Wheels: ${vehicle.wheels[wheel]}. Interior: ${vehicle.interiors[interior]}. Please send me availability and viewing details.`)}`;
  const next = () => setGalleryIndex((i) => (i + 1) % vehicle.gallery.length);
  const prev = () => setGalleryIndex((i) => (i - 1 + vehicle.gallery.length) % vehicle.gallery.length);

  return (
    <motion.section className="configurator" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="configurator__visual">
        <div className="configurator__topbar"><button className="ghost-button" onClick={onClose}><ChevronLeft size={17} /> Collection</button><span>YOMSAN / {vehicle.brand}</span></div>
        <motion.img key={`${image}-${color}-${wheel}-${interior}`} src={image} alt={`${vehicle.brand} ${vehicle.model}`} style={{ filter: visualFilter }} initial={{ opacity: .15, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .45 }} />
        <div className="visual-shade" />
        <div className="configurator__caption"><span>{vehicle.year}</span><strong>{vehicle.model}</strong><small>{vehicle.status}</small></div>
        <div className="gallery-controls"><button onClick={prev} aria-label="Previous image"><ChevronLeft /></button><span>{String(galleryIndex + 1).padStart(2, '0')} / {String(vehicle.gallery.length).padStart(2, '0')}</span><button onClick={next} aria-label="Next image"><ChevronRight /></button></div>
      </div>
      <aside className="configurator__panel">
        <div className="panel-heading"><p>BUILD YOUR YOMSAN</p><h1>{vehicle.brand}<br /><em>{vehicle.model}</em></h1><div className="price-row"><strong>{formatPrice(vehicle.price)}</strong><span>Estimated vehicle price</span></div></div>
        <ConfigGroup label="EXTERIOR" options={vehicle.colors.map(c => c.name)} value={color} onChange={setColor} swatches={vehicle.colors.map(c => c.value)} />
        <ConfigGroup label="WHEELS" options={vehicle.wheels} value={wheel} onChange={setWheel} />
        <ConfigGroup label="INTERIOR" options={vehicle.interiors} value={interior} onChange={setInterior} />
        <div className="spec-strip"><div><b>{vehicle.hp}</b><span>HP</span></div><div><b>{vehicle.engine.split(' ')[0]}</b><span>ENGINE</span></div><div><b>{vehicle.mileage.toLocaleString()}</b><span>MILES</span></div></div>
        <div className="enquiry-actions"><a className="primary-action" href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={17} /> Request this vehicle <ArrowUpRight size={16} /></a><div className="secondary-actions"><a href="tel:+2348033090335"><Phone size={15} /> Call YOMSAN</a><a href={whatsapp} target="_blank" rel="noreferrer"><CalendarDays size={15} /> Book inspection</a></div></div>
      </aside>
    </motion.section>
  );
}

function ConfigGroup({ label, options, value, onChange, swatches }: { label: string; options: string[]; value: number; onChange: (v: number) => void; swatches?: string[] }) {
  return <div className="config-group"><div className="config-group__label"><span>{label}</span><small>{options[value]}</small></div><div className="option-row">{options.map((option, i) => <button key={option} className={value === i ? 'selected' : ''} onClick={() => onChange(i)}>{swatches ? <i style={{ background: swatches[i] }} /> : null}<span>{option}</span>{value === i ? <Check size={14} /> : null}</button>)}</div></div>;
}
