import { list, put } from '@vercel/blob';
import { vehicles as seedVehicles } from '../src/data/vehicles.js';

const KEY = 'yomsan/data/vehicles.json';
const auth = (request: Request) => {
  const configured = process.env.ADMIN_PASSWORD;
  return Boolean(configured && request.headers.get('x-admin-password') === configured);
};

async function readInventory() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return seedVehicles;
  const result = await list({ prefix: KEY, limit: 10 });
  const blob = result.blobs.find(item => item.pathname === KEY);
  if (!blob) return seedVehicles;
  try {
    const response = await fetch(blob.url, { cache: 'no-store' });
    if (!response.ok) return seedVehicles;
    const data = await response.json();
    return Array.isArray(data?.vehicles) ? data.vehicles : seedVehicles;
  } catch {
    return seedVehicles;
  }
}

export async function GET() {
  try {
    return Response.json({
      vehicles: await readInventory(),
      source: process.env.BLOB_READ_WRITE_TOKEN ? 'vercel-blob' : 'seed'
    });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : 'Inventory read failed.' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    if (!auth(request)) {
      return Response.json({ error: process.env.ADMIN_PASSWORD ? 'Unauthorized' : 'Admin backend is not configured yet. Add ADMIN_PASSWORD to Vercel.' }, { status: 401 });
    }
    const body = await request.json();
    if (!Array.isArray(body.vehicles)) return Response.json({ error: 'Invalid inventory payload.' }, { status: 400 });
    if (!process.env.BLOB_READ_WRITE_TOKEN) return Response.json({ error: 'Vercel Blob is not connected. Connect a Vercel Blob store to Yomsan Autos.' }, { status: 503 });
    const blob = await put(KEY, JSON.stringify({ vehicles: body.vehicles }), {
      access: 'public', addRandomSuffix: false, allowOverwrite: true,
      contentType: 'application/json', cacheControlMaxAge: 0
    });
    return Response.json({ ok: true, url: blob.url });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : 'Inventory request failed.' }, { status: 500 });
  }
}
