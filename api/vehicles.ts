import { list, put } from '@vercel/blob';
import { vehicles as seedVehicles } from '../src/data/vehicles.js';

const KEY = 'yomsan/data/vehicles.json';
const auth = (req: Request) => {
  const configured = process.env.ADMIN_PASSWORD;
  return Boolean(configured && req.headers.get('x-admin-password') === configured);
};

async function readInventory() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return seedVehicles;
  const result = await list({ prefix: KEY, limit: 10 });
  const blob = result.blobs.find(item => item.pathname === KEY) ?? result.blobs[0];
  if (!blob) return seedVehicles;
  try { const response = await fetch(blob.url, { cache: 'no-store' }); const data = await response.json(); return Array.isArray(data?.vehicles) ? data.vehicles : seedVehicles; }
  catch { return seedVehicles; }
}

export default async function handler(req: Request) {
  try {
    if (req.method === 'GET') return Response.json({ vehicles: await readInventory(), source: process.env.BLOB_READ_WRITE_TOKEN ? 'vercel-blob' : 'seed' });
    if (req.method !== 'PUT') return new Response('Method not allowed', { status: 405 });
    if (!auth(req)) return Response.json({ error: process.env.ADMIN_PASSWORD ? 'Unauthorized' : 'Admin backend is not configured yet. Add ADMIN_PASSWORD to Vercel.' }, { status: 401 });
    const body = await req.json();
    if (!Array.isArray(body.vehicles)) return Response.json({ error: 'Invalid inventory payload.' }, { status: 400 });
    if (!process.env.BLOB_READ_WRITE_TOKEN) return Response.json({ error: 'Vercel Blob is not connected. Create a Blob store and connect it to Yomsan Autos.' }, { status: 503 });
    const blob = await put(KEY, JSON.stringify({ vehicles: body.vehicles }), { access: 'public', addRandomSuffix: false, allowOverwrite: true, contentType: 'application/json', cacheControlMaxAge: 60 });
    return Response.json({ ok: true, url: blob.url });
  } catch (error) { return Response.json({ error: error instanceof Error ? error.message : 'Inventory request failed.' }, { status: 500 }); }
}
