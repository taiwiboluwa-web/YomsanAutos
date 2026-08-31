import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, CalendarDays, Check, ChevronLeft, ChevronRight, MessageCircle, Phone, X } from 'lucide-react';
import { motion } from 'motion/react';
import type { Vehicle } from '../../../data/vehicles';
import { formatPrice } from '../../../data/vehicles';

type Props = { vehicle: Vehicle; onClose: () => void };

export function VehicleConfigurator({ vehicle, onClose }: Props) {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [color, setColor] = useState(0);
  const [wheel, setWheel] = useState(0);
  const [interior, setInterior] = useState(0);
  const [brokenImages, setBrokenImages] = useState<string[]>([]);

  const gallery = useMemo(() => {
    const candidates = [vehicle.hero, ...(vehicle.gallery || [])].map(s => String(s || '').trim()).filter(Boolean);
    return [...new Set(candidates)].filter(src => !brokenImages.includes(src));
  }, [vehicle.hero, vehicle.gallery, brokenImages]);

  useEffect(() => {
    setGalleryIndex(0);
    setBrokenImages([]);
    setColor(0);
    setWheel(0);
    setInterior(0);
  }, [vehicle.id]);

  useEffect(() => {
    if (galleryIndex >= gallery.length) setGalleryIndex(Math.max(0, gallery.length - 1));
  }, [gallery.length, galleryIndex]);

  const activeColor = vehicle.colors?.[color];
  const colorImage = String(activeColor?.image || '').trim();
  const image = colorImage && !brokenImages.includes(colorImage) ? colorImage : gallery[galleryIndex] || vehicle.hero;
  const whatsapp = `https://wa.me/2348033090335?text=${encodeURIComponent(`Hello YOMSAN, I am interested in the ${vehicle.year} ${vehicle.brand} ${vehicle.model}. Exterior: ${activeColor?.name || 'Standard'}. Wheels: ${vehicle.wheels?.[wheel] || 'Standard'}. Interior: ${vehicle.interiors?.[interior] || 'Standard'}. Please send me availability and viewing details.`)}`;

  const markBroken = (src: string) => setBrokenImages(current => current.includes(src) ? current : [...current, src]);
  const next = () => gallery.length && setGalleryIndex(i => (i + 1) % gallery.length);
  const prev = () => gallery.length && setGalleryIndex(i => (i - 1 + gallery.length) % gallery.length);

  const visualStyle = useMemo(() => ({ filter: color === 0 ? 'saturate(.92) contrast(1.02)' : 'saturate(1) contrast(1.02)' }), [color]);

  return (
    <motion.section className="yomsan-configurator-reference" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <header className="reference-topbar">
        <button className="reference-menu" onClick={onClose} aria-label="Close configurator"><X size={18} /></button>
        <div className="reference-mark">Y</div>
        <a href={whatsapp} target="_blank" rel="noreferrer" className="reference-package">Request a Package <ArrowUpRight size={13} /></a>
      </header>

      <main className="reference-main">
        <section className="reference-info">
          <div className="reference-title-row"><div><p className="reference-kicker">{vehicle.year} / {vehicle.type}</p><h1>{vehicle.brand} <em>{vehicle.model}</em></h1><p className="reference-subtitle">Premium selection · Yomsan Automobile</p></div></div>
          <div className="reference-colors"><span>Colours</span><div>{(vehicle.colors || []).map((c, i) => <button key={`${c.name}-${i}`} aria-label={`Select ${c.name}`} className={color === i ? 'active' : ''} onClick={() => { setColor(i); setGalleryIndex(0); }}><i style={{ background: c.value }} /></button>)}</div></div>
          <div className="reference-body-options"><div className="reference-dots"><span className="active" /><span /><span /><span /></div><div className="reference-option-box"><div><span>Vehicle details</span><strong>{vehicle.type}</strong></div><div className="reference-option-thumbs"><button className="selected">{vehicle.model}</button></div></div></div>
        </section>

        <section className="reference-vehicle">
          <div className="reference-image-wrap">
            {image ? <motion.img key={`${image}-${galleryIndex}-${color}`} src={image} alt={`${vehicle.brand} ${vehicle.model}`} style={visualStyle} onError={() => markBroken(image)} initial={{ opacity: 0, scale: .98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .35 }} /> : <div className="reference-image-fallback">No vehicle image available</div>}
          </div>
          <div className="reference-gallery">
            <button onClick={prev} aria-label="Previous angle" disabled={gallery.length < 2}><ChevronLeft size={16} /></button>
            <div className="reference-gallery-track">
              {gallery.slice(0, 8).map((src, i) => <button key={`${src}-${i}`} className={galleryIndex === i ? 'active' : ''} onClick={() => setGalleryIndex(i)}><img src={src} alt={`${vehicle.model} angle ${i + 1}`} onError={() => markBroken(src)} /></button>)}
            </div>
            <button onClick={next} aria-label="Next angle" disabled={gallery.length < 2}><ChevronRight size={16} /></button>
          </div>
        </section>

        <aside className="reference-details"><p className="reference-kicker">Yomsan Automobile</p><h2>Luxury in Motion.<br /><em>Confidence Delivered.</em></h2><p className="reference-copy">A carefully selected {vehicle.year} {vehicle.brand} {vehicle.model}, presented with the specification and finish you want.</p><ul>{Object.entries(vehicle.specifications || {}).slice(0, 5).map(([key, value]) => <li key={key}>{key}: {value}</li>)}{!vehicle.specifications && <><li>{vehicle.engine}</li><li>{vehicle.hp} horsepower</li><li>{vehicle.status} inventory</li><li>{vehicle.mileage.toLocaleString()} miles</li></>}</ul><div className="reference-price"><span>Starting from</span><strong>{formatPrice(vehicle.price)}</strong></div><a className="reference-contact" href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={15} /> Contact Yomsan <ArrowUpRight size={14} /></a><div className="reference-actions"><a href="tel:+2348033090335"><Phone size={14} /> Call</a><a href={whatsapp} target="_blank" rel="noreferrer"><CalendarDays size={14} /> Inspect</a></div></aside>
      </main>

      <footer className="reference-config-footer"><ConfigGroup label="Wheels" options={vehicle.wheels || []} value={wheel} onChange={setWheel} /><ConfigGroup label="Interior" options={vehicle.interiors || []} value={interior} onChange={setInterior} /><div className="reference-counter">{String(Math.min(galleryIndex + 1, gallery.length || 1)).padStart(2, '0')} / {String(Math.min(gallery.length, 8)).padStart(2, '0')}</div></footer>
    </motion.section>
  );
}

function ConfigGroup({ label, options, value, onChange }: { label: string; options: string[]; value: number; onChange: (v: number) => void }) {
  return <div className="reference-config-group"><span>{label}</span><div>{options.map((option, i) => <button key={`${option}-${i}`} className={value === i ? 'selected' : ''} onClick={() => onChange(i)}>{option}{value === i ? <Check size={12} /> : null}</button>)}</div></div>;
}
