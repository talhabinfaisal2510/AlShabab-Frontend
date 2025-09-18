import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/database';
import Pdf from '../../../../models/Pdf';

export async function GET() {
  try {
    await connectDB();
    const latest = await Pdf.findOne({}).sort({ createdAt: -1 }).select({ url: 1 });
    if (!latest?.url) {
      return NextResponse.json({ error: 'No PDF found' }, { status: 404 });
    }

    const upstream = await fetch(latest.url);
    if (!upstream.ok || !upstream.body) {
      return NextResponse.json({ error: 'Failed to fetch PDF' }, { status: 502 });
    }

    return new Response(upstream.body, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff',
        'Content-Disposition': 'inline',
      },
    });
  } catch (e) {
    return NextResponse.json({ error: 'Proxy error' }, { status: 500 });
  }
}


