import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, CheckCircle2, Eye, EyeOff, ImagePlus, LogOut, Plus, Save, Trash2, XCircle } from 'lucide-react';
import type { Vehicle } from '../../data/vehicles';
import { vehicles as seedVehicles } from '../../data/vehicles';

function ImagePreview({ src, label }: { src: string; label: string }) {
  const [state, setState] = useState<'loading' | 'ok' | 'broken'>(src ? 'loading' : 'broken');
  useEffect(() => setState(src ? 'loading' : 'broken'), [src]);
  if (!src || state === 'broken') return <div className="admin-image-preview admin-image-preview--broken"><XCircle size={18} /><span>{label}<small>Invalid or unavailable image</small></span></div>;
  return <div className="admin-image-preview"><img src={src} alt={label} onLoad={() => setState('ok')} onError={() => setState('broken')} />{state === 'loading' && <span>Checking image…</span>}{state === 'ok' && <b><CheckCircle2 size={15} /> Ready</b>}</div>;
}

async function fileToWebImage(file: File): Promise<string> {
  if (!file.type.startsWith('image/')) throw new Error(`${file.name} is not an image.`);
  const bitmap = await createImageBitmap(file);
  const max = 1800;
  const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not process image.');
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return canvas.toDataURL('image/webp', 0.82);
}

export default function Admin() {
  const storedPassword = typeof window !== 'undefined' ? sessionStorage.getItem('yomsan-admin') || '' : '';
  const [password, setPassword] = useState(storedPassword);
  const [showPassword, setShowPassword] = useState(false);
  const [authenticated, setAuthenticated] = useState(Boolean(storedPassword));
  const [items, setItems] = useState<Vehicle[]>(seedVehicles);
  const [selectedId, setSelectedId] = useState<number | null>(seedVehicles[0]?.id ?? null);
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);
  const selected = items.find(v => v.id === selectedId) ?? items[0];

  const load = async (authPassword = password) => { const res = await fetch('/api/vehicles', { cache: 'no-store', headers: authPassword ? { 'x-admin-password': authPassword } : undefined }); if (!res.ok) { if (authPassword) { sessionStorage.removeItem('yomsan-admin'); setPassword(''); setAuthenticated(false); } return; } const data = await res.json(); if (Array.isArray(data.vehicles)) setItems(data.vehicles); };
  useEffect(() => { if (storedPassword) load(storedPassword).catch(() => { sessionStorage.removeItem('yomsan-admin'); setAuthenticated(false); setPassword(''); }); }, []);

  const login = async (event: React.FormEvent) => { event.preventDefault(); setBusy(true); setStatus('Checking access…'); try { const res = await fetch('/api/vehicles', { headers: { 'x-admin-password': password } }); const data = await res.json().catch(() => null); if (!res.ok) throw new Error(data?.error || 'Access denied'); sessionStorage.setItem('yomsan-admin', password); setAuthenticated(true); if (Array.isArray(data?.vehicles)) setItems(data.vehicles); setStatus(''); } catch (e) { setStatus(e instanceof Error ? e.message : 'Access denied'); } finally { setBusy(false); } };
  const update = (patch: Partial<Vehicle>) => setItems(current => current.map(v => v.id === selected?.id ? { ...v, ...patch } : v));
  const addVehicle = () => { const id = Math.max(0, ...items.map(v => v.id)) + 1; const next: Vehicle = { id, brand: 'New', model: 'Vehicle', year: new Date().getFullYear(), type: 'SUV', status: 'Available', price: 0, mileage: 0, engine: 'Engine', hp: 0, hero: '', gallery: [], colors: [{ name: 'Black', value: '#111111' }], wheels: ['Standard'], interiors: ['Black'] }; setItems([...items, next]); setSelectedId(id); setStatus('New vehicle added. Add its details and photos, then save to Neon.'); };
  const remove = () => { if (!selected) return; if (!window.confirm(`Remove ${selected.brand} ${selected.model}? This will take effect after Save to Neon.`)) return; const next = items.filter(v => v.id !== selected.id); setItems(next); setSelectedId(next[0]?.id ?? null); setStatus('Vehicle removed. Click Save to Neon to publish the change.'); };
  const save = async () => { setBusy(true); setStatus('Saving to Neon…'); try { const res = await fetch('/api/vehicles', { method: 'PUT', headers: { 'content-type': 'application/json', 'x-admin-password': password }, body: JSON.stringify({ vehicles: items }) }); const data = await res.json().catch(() => null); if (!res.ok) throw new Error(data?.error || 'Save failed'); setStatus(`Saved to Neon — ${data.count} vehicles live.`); } catch (e) { setStatus(e instanceof Error ? e.message : 'Save failed'); } finally { setBusy(false); } };
  const uploadHero = async (file?: File) => { if (!file) return; setBusy(true); setStatus(`Processing ${file.name}…`); try { const src = await fileToWebImage(file); update({ hero: src }); setStatus('Hero image ready. Click Save to Neon to publish it.'); } catch (e) { setStatus(e instanceof Error ? e.message : 'Image upload failed.'); } finally { setBusy(false); } };
  const uploadGallery = async (files: FileList | null) => { if (!files?.length) return; setBusy(true); setStatus(`Processing ${files.length} image${files.length > 1 ? 's' : ''}…`); try { const added = await Promise.all(Array.from(files).map(fileToWebImage)); update({ gallery: [...new Set([...(selected?.gallery || []), ...added])] }); setStatus(`${added.length} gallery image${added.length > 1 ? 's' : ''} ready. Click Save to Neon to publish.`); } catch (e) { setStatus(e instanceof Error ? e.message : 'Gallery upload failed.'); } finally { setBusy(false); } };
  const setGallery = (value: string) => update({ gallery: [...new Set(value.split('\n').map(s => s.trim()).filter(Boolean))] });
  const galleryUrls = useMemo(() => selected?.gallery || [], [selected?.gallery]);

  if (!authenticated) return <main className="admin-login"><div className="admin-login__box"><p className="admin-kicker">YOMSAN AUTOMOBILE</p><h1>Showroom Admin</h1><p>Manage live inventory stored in Neon.</p><form onSubmit={login}><label>Admin password<div className="admin-password-field"><input autoFocus type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter admin password" autoComplete="current-password" /><button type="button" className="admin-password-toggle" onClick={() => setShowPassword(v => !v)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div></label><button disabled={busy || !password}>{busy ? 'Checking…' : 'Enter admin'}</button></form>{status && <div className="admin-error">{status}</div>}</div></main>;

  return <main className="admin-shell"><aside className="admin-sidebar"><a href="/" className="admin-back"><ArrowLeft size={16} /> Public showroom</a><div className="admin-brand"><span>Y</span><div><b>YOMSAN</b><small>Neon Inventory Admin</small></div></div><button className="admin-add" onClick={addVehicle}><Plus size={17} /> Add vehicle</button><div className="admin-list">{items.map(v => <button className={v.id === selected?.id ? 'active' : ''} key={v.id} onClick={() => setSelectedId(v.id)}><span>{v.brand}</span><strong>{v.model}</strong><small>{v.status} · ₦{v.price.toLocaleString()}k</small></button>)}</div><button className="admin-logout" onClick={() => { sessionStorage.removeItem('yomsan-admin'); setAuthenticated(false); setPassword(''); }}><LogOut size={16} /> Sign out</button></aside>
  <section className="admin-content"><header className="admin-top"><div><p>NEON INVENTORY / {String(items.length).padStart(2, '0')}</p><h1>{selected?.brand} <i>{selected?.model}</i></h1></div><button className="admin-publish" onClick={save} disabled={busy}><Save size={17} /> {busy ? 'Saving…' : 'Save to Neon'}</button></header>
  {selected && <div className="admin-form"><section className="admin-card"><div className="admin-card__head"><div><small>VEHICLE DETAILS</small><h2>Identity & specification</h2></div><button className="danger" onClick={remove}><Trash2 size={15} /> Delete</button></div><div className="field-grid">{[['Brand','brand','text'],['Model','model','text'],['Year','year','number'],['Type','type','text'],['Price (₦ thousands)','price','number'],['Mileage','mileage','number'],['Horsepower','hp','number'],['Engine','engine','text']].map(([label,key,type]) => <label key={key}>{label}<input type={type} value={String((selected as any)[key])} onChange={e => update({ [key]: type === 'number' ? Number(e.target.value) : e.target.value } as Partial<Vehicle>)} /></label>)}<label>Status<select value={selected.status} onChange={e => update({ status: e.target.value as Vehicle['status'] })}><option>Available</option><option>Reserved</option></select></label></div></section>
  <section className="admin-card"><div className="admin-card__head"><div><small>PHOTOGRAPHY</small><h2>Upload vehicle photos</h2></div><span className="admin-note">Device upload + live preview</span></div><div className="media-manager"><div className="media-hero"><ImagePreview src={selected.hero} label="Hero image" /><label className="upload-button"><ImagePlus size={16} /> Upload hero<input type="file" accept="image/*" onChange={e => uploadHero(e.target.files?.[0])} /></label></div><label>Hero image URL <small>Optional — device uploads fill this automatically.</small><input value={selected.hero.startsWith('data:') ? '' : selected.hero} onChange={e => update({ hero: e.target.value })} placeholder="Or paste https://..." /></label><label>Gallery image URLs <small>one URL per line · device uploads are added automatically</small><textarea value={selected.gallery.filter(s => !s.startsWith('data:')).join('\n')} onChange={e => setGallery([...e.target.value.split('\n').filter(Boolean), ...selected.gallery.filter(s => s.startsWith('data:'))].join('\n'))} rows={6} placeholder="Or paste https://...angle.jpg" /></label><label className="gallery-add"><ImagePlus size={20} /> Add photos from device<input type="file" accept="image/*" multiple onChange={e => uploadGallery(e.target.files)} /></label><div className="admin-gallery-previews">{galleryUrls.slice(0, 12).map((src, i) => <ImagePreview key={`${src}-${i}`} src={src} label={`Angle ${i + 1}`} />)}</div></div></section>
  <section className="admin-card"><div className="admin-card__head"><div><small>CONFIGURATOR</small><h2>Options shown to customers</h2></div></div><div className="field-grid"><label>Wheels <input value={selected.wheels.join(', ')} onChange={e => update({ wheels: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} /></label><label>Interiors <input value={selected.interiors.join(', ')} onChange={e => update({ interiors: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} /></label><label>Exterior colours <input value={selected.colors.map(c => c.name).join(', ')} onChange={e => update({ colors: e.target.value.split(',').map((name, i) => ({ name: name.trim(), value: selected.colors[i]?.value || '#111111' })) })} /></label></div></section></div>}
  {status && <div className="admin-note" style={{ marginTop: 16 }}>{status}</div>}</section></main>;
}
