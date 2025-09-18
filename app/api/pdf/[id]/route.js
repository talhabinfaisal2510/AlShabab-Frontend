import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/database';
import Pdf from '../../../../models/Pdf';
import mongoose from 'mongoose';

// GET /api/pdf/[id] - fetch a specific pdf
export async function GET(_req, { params }) {
  try {
    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    await connectDB();
    const doc = await Pdf.findById(id);
    if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ id: doc._id.toString(), url: doc.url, created_at: doc.createdAt }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch pdf' }, { status: 500 });
  }
}

// DELETE /api/pdf/[id] - delete a pdf record
export async function DELETE(_req, { params }) {
  try {
    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    await connectDB();
    const doc = await Pdf.findById(id);
    if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    await Pdf.findByIdAndDelete(id);
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete pdf' }, { status: 500 });
  }
}


