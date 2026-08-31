import { handleUpload } from '@vercel/blob/client';

export default async function handler(req: Request) {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });
  if (!process.env.BLOB_READ_WRITE_TOKEN) return Response.json({ error: 'Vercel Blob is not connected to this project.' }, { status: 503 });
  try {
    const body = await req.json();
    const result = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        let payload: { password?: string } = {};
        try { payload = clientPayload ? JSON.parse(clientPayload) : {}; } catch { throw new Error('Invalid upload authorization.'); }
        if (!process.env.ADMIN_PASSWORD || payload.password !== process.env.ADMIN_PASSWORD) throw new Error('Unauthorized upload.');
        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp'],
          maximumSizeInBytes: 25 * 1024 * 1024,
          addRandomSuffix: true,
          tokenPayload: JSON.stringify({ admin: true, pathname }),
        };
      },
      onUploadCompleted: async ({ blob }) => { console.log('Yomsan image uploaded:', blob.pathname); },
    });
    return Response.json(result);
  } catch (error) { return Response.json({ error: error instanceof Error ? error.message : 'Upload failed.' }, { status: 400 }); }
}
