import { useEffect, useMemo, useState } from 'react';
import { upload } from '@vercel/blob/client';
import { ArrowLeft, Check, ImagePlus, LogOut, Plus, Save, Trash2, UploadCloud } from 'lucide-react';
import type { Vehicle } from '../../data/vehicles';
import { vehicles as seedVehicles } from '../../data/vehicles';

type Props = { };

export default function Admin(_: Props) {
  const [password, setPassword] = useState(() => sessionStorage.getItem('yomsan-admin') || '');
  const [authenticated, setAuthenticated] = useState(false);
  const [items, setItems] = useState<Vehicle[]>(seedVehicles);
  const [selectedId, setSelectedId] = useState<number | null>(seedVehicles[0]?.id ?? null);
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);
  const selected = items.find(v => v.id === selectedId) ?? items[0];

  const load = async (key = password) => {
    const res = await fetch('/api/vehicles');
    if (!res.ok) return;
    const data = await res.json();
    if (Array.isArray(data.vehicles) && data.vehicles.length) setItems(data.vehicles);
    if (key) setAuthenticated(true);
  };

  useEffect(() => { if (password) load(password).catch(() => undefined); }, []);

  const login = async (event: React.FormEvent) => {
    event.preventDefault(); setBusy(true); setStatus('Checking access…');
    const res = await fetch('/api/vehicles', { headers: { 'x-admin-password': password } });
    if (res.ok) { sessionStorage.setItem('yomsan-admin', password); setAuthenticated(true); await load(password); setStatus(''); }
    else setStatus((await res.json().catch(() => null))?.error || 'Access denied');
    setBusy(false);
  };

  const update = (patch: Partial<Vehicle>) => setItems(current => current.map(v => v.id === selected?.id ? { ...v, ...patch } : v));
  const addVehicle = () => {
    const id = Math.max(0, ...items.map(v => v.id)) + 1;
    const next: Vehicle = { id, brand: 'New', model: 'Vehicle', year: 2026, type: 'SUV', status: 'Available', price: 0, mileage: 0, engine: 'Engine', hp: 0, hero: '', gallery: [], colors: [{ name: 'Black', value: '#111111' }], wheels: ['Standard'], interiors: ['Black'] };
    setItems([...items, next]); setSelectedId(id);
  };
  const remove = () => { if (!selected) return; setItems(items.filter(v => v.id !== selected.id)); setSelectedId(items.find(v => v.id !== selected.id)?.id ?? null); };

  const save = async () => {
    setBusy(true); setStatus('Publishing showroom data…');
    const res = await fetch('/api/vehicles', { method: 'PUT', headers: { 'content-type': 'application/json', 'x-admin-password': password }, body: JSON.stringify({ vehicles: items }) });
    setStatus(res.ok ? 'Published to Yomsan Automobile.' : ((await res.json().catch(() => null))?.error || 'Save failed'));
    setBusy(false);
  };

  const uploadImage = async (file: File, kind: 'hero' | 'gallery') => {
    if (!selected) return;
    setBusy(true); setStatus(`Uploading ${file.name}…`);
    try {
      const blob = await upload(`vehicles/${selected.id}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '-')}`, file, { access: 'public', handleUploadUrl: '/api/blob-upload', clientPayload: JSON.stringify({ password }) });
      if (kind === 'hero') update({ hero: blob.url }); else update({ gallery: [...selected.gallery, blob.url] });
      setStatus('Image uploaded. Click Publish to save the vehicle.');
    } catch (error) { setStatus(error instanceof Error ? error.message : 'Upload failed'); }
    setBusy(false);
  };

  if (!authenticated) return <main className="admin-login"><div className="admin-login__box"><p className="admin-kicker">YOMSAN AUTOMOBILE</p><h1>Showroom Admin</h1><p>Manage vehicles, photography and live showroom content.</p><form onSubmit={login}><label>Admin password<input autoFocus type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter admin password" /></label><button disabled={busy}>{busy ? 'Checking…' : 'Enter admin'}</button></form>{status && <div className="admin-error">{status}</div>}</div></main>;

  return <main className="admin-shell"><aside className="admin-sidebar"><a href="/" className="admin-back"><ArrowLeft size={16} /> Public showroom</a><div className="admin-brand"><span>Y</span><div><b>YOMSAN</b><small>Automobile Admin</small></div></div><button className="admin-add" onClick={addVehicle}><Plus size={17} /> Add vehicle</button><div className="admin-list">{items.map(v => <button className={v.id === selected?.id ? 'active' : ''} key={v.id} onClick={() => setSelectedId(v.id)}><span>{v.brand}</span><strong>{v.model}</strong><small>{v.status} · ₦{v.price.toLocaleString()}k</small></button>)}</div><button className="admin-logout" onClick={() => { sessionStorage.removeItem('yomsan-admin'); setAuthenticated(false); }}><LogOut size={16} /> Sign out</button></aside>
    <section className="admin-content"><header className="admin-top"><div><p>INVENTORY / {String(items.length).padStart(2, '0')}</p><h1>{selected?.brand} <i>{selected?.model}</i></h1></div><button className="admin-publish" onClick={save} disabled={busy}><Save size={17} /> {busy ? 'Working…' : 'Publish changes'}</button></header>
      {selected && <div className="admin-form">
        <section className="admin-card"><div className="admin-card__head"><div><small>VEHICLE DETAILS</small><h2>Identity & specification</h2></div><button className="danger" onClick={remove}><Trash2 size={15} /> Delete</button></div><div className="field-grid">{[['Brand','brand','text'],['Model','model','text'],['Year','year','number'],['Type','type','text'],['Price (₦ thousands)','price','number'],['Mileage','mileage','number'],['Horsepower','hp','number'],['Engine','engine','text']].map(([label,key,type]) => <label key={key}>{label}<input type={type} value={String((selected as any)[key])} onChange={e => update({ [key]: type === 'number' ? Number(e.target.value) : e.target.value } as Partial<Vehicle>)} /></label>)}<label>Status<select value={selected.status} onChange={e => update({ status: e.target.value as Vehicle['status'] })}><option>Available</option><option>Reserved</option></select></label></div></section>
        <section className="admin-card"><div className="admin-card__head"><div><small>PHOTOGRAPHY</small><h2>Live showroom imagery</h2></div><span className="admin-note">Vercel Blob</span></div><div className="media-manager"><div className="media-hero">{selected.hero ? <img src={selected.hero} alt="Hero" /> : <div className="empty-media"><ImagePlus /></div>}<label className="upload-button"><UploadCloud size={17} /> Replace hero<input type="file" accept="image/jpeg,image/png,image/webp" onChange={e => e.target.files?.[0] && uploadImage(e.target.files[0], 'hero')} /></label></div><div className="gallery-manager">{selected.gallery.map((url, i) => <div className="gallery-item" key={`${url}-${i}`}><img src={url} alt={`Gallery ${i + 1}`} /><button onClick={() => update({ gallery: selected.gallery.filter((_, index) => index !== i) })} aria-label="Remove image"><Trash2 size={14} /></button></div>)}<label className="gallery-add"><Plus /><span>Add gallery image</span><input type="file" accept="image/jpeg,image/png,image/webp" onChange={e => e.target.files?.[0] && uploadImage(e.target.files[0], 'gallery')} /></label></div></div></section>
        <section className="admin-card"><div className="admin-card__head"><div><small>CONFIGURATOR</small><h2>Options shown to customers</h2></div></div><div className="field-grid"><label>Wheels <input value={selected.wheels.join(', ')} onChange={e => update({ wheels: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} /></label><label>Interiors <input value={selected.interiors.join(', ')} onChange={e => update({ interiors: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} /></label><label>Exterior colours <input value={selected.colors.map(c => c.name).join(', ')} onChange={e => update({ colors: e.target.value.split(',').map((name, i) => ({ name: name.trim(), value: selected.colors[i]?.value || '#111111', image: selected.colors[i]?.image })) })} /></label></div></section>
      </div>}
    </section></main>;
}
