import { neon } from '@neondatabase/serverless';
import { vehicles as seedVehicles } from '../src/data/vehicles.js';

const db = () => {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not configured.');
  return neon(process.env.DATABASE_URL);
};
const auth = (request: Request) => { const configured = process.env.ADMIN_PASSWORD; return Boolean(configured && request.headers.get('x-admin-password') === configured); };
const noStore = { 'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0', 'CDN-Cache-Control': 'no-store', 'Vercel-CDN-Cache-Control': 'no-store' };

async function ensureDatabase() {
  const sql = db();
  await sql`CREATE TABLE IF NOT EXISTS public.vehicles (id integer PRIMARY KEY, brand text NOT NULL, model text NOT NULL, year integer NOT NULL, type text NOT NULL, status text NOT NULL DEFAULT 'Available', price numeric(14,2) NOT NULL DEFAULT 0, mileage integer NOT NULL DEFAULT 0, engine text NOT NULL DEFAULT '', hp integer NOT NULL DEFAULT 0, hero text NOT NULL DEFAULT '', gallery jsonb NOT NULL DEFAULT '[]'::jsonb, colors jsonb NOT NULL DEFAULT '[]'::jsonb, wheels jsonb NOT NULL DEFAULT '[]'::jsonb, interiors jsonb NOT NULL DEFAULT '[]'::jsonb, specifications jsonb NOT NULL DEFAULT '{}'::jsonb, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now())`;
  const count = await sql`SELECT count(*)::int AS count FROM public.vehicles`;
  if (Number(count[0]?.count) === 0) for (const v of seedVehicles) await sql`INSERT INTO public.vehicles (id,brand,model,year,type,status,price,mileage,engine,hp,hero,gallery,colors,wheels,interiors,specifications) VALUES (${v.id},${v.brand},${v.model},${v.year},${v.type},${v.status},${v.price},${v.mileage},${v.engine},${v.hp},${v.hero},${JSON.stringify(v.gallery)},${JSON.stringify(v.colors)},${JSON.stringify(v.wheels)},${JSON.stringify(v.interiors)},${JSON.stringify(v.specifications || {})}) ON CONFLICT (id) DO NOTHING`;
  return sql;
}
function mapVehicle(row: any) { return { id:Number(row.id),brand:row.brand,model:row.model,year:Number(row.year),type:row.type,status:row.status,price:Number(row.price),mileage:Number(row.mileage),engine:row.engine,hp:Number(row.hp),hero:row.hero,gallery:row.gallery||[],colors:row.colors||[],wheels:row.wheels||[],interiors:row.interiors||[],specifications:row.specifications||{} }; }

export async function GET() { try { const sql=await ensureDatabase(); const rows=await sql`SELECT * FROM public.vehicles ORDER BY id ASC`; return Response.json({vehicles:rows.map(mapVehicle)},{headers:noStore}); } catch(error) { return Response.json({error:error instanceof Error?error.message:'Inventory read failed.'},{status:500,headers:noStore}); } }

export async function PUT(request:Request) { try {
  if(!auth(request)) return Response.json({error:process.env.ADMIN_PASSWORD?'Unauthorized':'Admin backend is not configured yet. Add ADMIN_PASSWORD to Vercel.'},{status:401,headers:noStore});
  const body=await request.json(); if(!Array.isArray(body.vehicles)) return Response.json({error:'Invalid inventory payload.'},{status:400,headers:noStore});
  const sql=await ensureDatabase(); await sql`DELETE FROM public.vehicles`;
  for(const v of body.vehicles) await sql`INSERT INTO public.vehicles (id,brand,model,year,type,status,price,mileage,engine,hp,hero,gallery,colors,wheels,interiors,specifications,updated_at) VALUES (${v.id},${v.brand},${v.model},${v.year},${v.type},${v.status},${v.price},${v.mileage},${v.engine},${v.hp},${v.hero||''},${JSON.stringify(v.gallery||[])},${JSON.stringify(v.colors||[])},${JSON.stringify(v.wheels||[])},${JSON.stringify(v.interiors||[])},${JSON.stringify(v.specifications||{})},now())`;
  const rows=await sql`SELECT * FROM public.vehicles ORDER BY id ASC`; return Response.json({ok:true,count:rows.length,vehicles:rows.map(mapVehicle)},{headers:noStore});
} catch(error) { return Response.json({error:error instanceof Error?error.message:'Inventory save failed.'},{status:500,headers:noStore}); } }
