import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/database';
import Video from '../../../../models/Video';
import mongoose from 'mongoose';

export async function GET(_req, { params }) {
  try {
    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    await connectDB();
    const video = await Video.findById(id);
    if (!video) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ 
      id: video._id.toString(), 
      url: video.url, 
      created_at: video.createdAt 
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch video' }, { status: 500 });
  }
}

export async function DELETE(_req, { params }) {
  try {
    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    
    await connectDB();
    const video = await Video.findById(id);
    if (!video) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    await Video.findByIdAndDelete(id);
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete video' }, { status: 500 });
  }
}
