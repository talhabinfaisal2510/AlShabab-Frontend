import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/database';
import Pdf from '../../../models/Pdf';
import { uploadToCloudinary } from '../../../lib/uploadToCloudinary';

const ALLOWED_TYPES = ['application/pdf'];
const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024; // 50MB

// GET /api/pdf - return the most recent single pdf (or null)
export async function GET() {
  try {
    await connectDB();
    const latest = await Pdf.findOne({}).sort({ createdAt: -1 }).select({ url: 1, createdAt: 1 });
    if (!latest) return NextResponse.json(null, { status: 200 });
    return NextResponse.json({ id: latest._id.toString(), url: latest.url, created_at: latest.createdAt }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch pdf' }, { status: 500 });
  }
}

// POST /api/pdf - upload a new PDF file
export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('pdf');
    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No pdf file uploaded' }, { status: 400 });
    }

    const mimeType = file.type || '';
    if (!ALLOWED_TYPES.includes(mimeType)) {
      return NextResponse.json({ error: 'Invalid file type. Only PDF allowed.' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    if (buffer.length > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json({ error: 'File too large. Max 50MB.' }, { status: 413 });
    }

    const result = await uploadToCloudinary(buffer, mimeType, file.name || 'document.pdf');
    await connectDB();
    const doc = await Pdf.create({ url: result.secure_url });
    return NextResponse.json({ id: doc._id.toString(), url: doc.url }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}


