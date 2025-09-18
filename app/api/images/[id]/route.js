import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/database';
import Image from '../../../../models/Image';
import mongoose from 'mongoose';

export async function GET(_req, { params }) {
  try {
    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    await connectDB();
    const image = await Image.findById(id);
    if (!image) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ id: image._id.toString(), url: image.url, created_at: image.createdAt }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch image' }, { status: 500 });
  }
}


