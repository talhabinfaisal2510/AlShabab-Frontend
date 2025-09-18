import { NextResponse } from 'next/server';
import { uploadToCloudinary } from '../../../lib/uploadToCloudinary';
import { connectDB } from '../../../lib/database';
import Video from '../../../models/Video';

const ALLOWED_VIDEO_TYPES = [
  'video/mp4',
  'video/mpeg',
  'video/quicktime',
  'video/webm',
  'video/avi',
  'video/mov',
];
const MAX_FILE_SIZE_BYTES = 100 * 1024 * 1024; // 100MB for videos

export async function GET() {
  try {
    await connectDB();
    const videos = await Video.find({}).sort({ _id: -1 }).select({ url: 1, createdAt: 1 });
    const formatted = videos.map((v) => ({ 
      id: v._id.toString(), 
      url: v.url, 
      created_at: v.createdAt 
    }));
    return NextResponse.json(formatted, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('video');

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No video file uploaded' }, { status: 400 });
    }

    const mimeType = file.type || '';
    const isAllowed = ALLOWED_VIDEO_TYPES.includes(mimeType);
    if (!isAllowed) {
      return NextResponse.json({ 
        error: 'Invalid file type. Allowed videos: MP4, MPEG, MOV, WEBM, AVI' 
      }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    if (buffer.length > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json({ error: 'File too large. Max 100MB.' }, { status: 413 });
    }

    const result = await uploadToCloudinary(buffer, mimeType);
    
    await connectDB();
    const video = await Video.create({ 
      url: result.secure_url
    });
    
    return NextResponse.json({ 
      id: video._id.toString(), 
      url: video.url
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
