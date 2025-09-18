import { NextResponse } from 'next/server';
import { uploadToCloudinary } from '../../../lib/uploadToCloudinary';
import { connectDB } from '../../../lib/database';
import Image from '../../../models/Image';

const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'image/webp',
];
const ALLOWED_VIDEO_TYPES = [
  'video/mp4',
  'video/mpeg',
  'video/quicktime',
  'video/webm',
];
const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024;

export async function GET() {
  try {
    await connectDB();
    const images = await Image.find({}).sort({ _id: -1 }).select({ url: 1, createdAt: 1 });
    const formatted = images.map((i) => ({ id: i._id.toString(), url: i.url, created_at: i.createdAt }));
    return NextResponse.json(formatted, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('image');
    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No image file uploaded' }, { status: 400 });
    }
    const mimeType = file.type || '';
    const isAllowed = ALLOWED_IMAGE_TYPES.includes(mimeType) || ALLOWED_VIDEO_TYPES.includes(mimeType);
    if (!isAllowed) {
      return NextResponse.json({ error: 'Invalid file type. Allowed images: JPG, PNG, GIF, WEBP; videos: MP4, MPEG, MOV, WEBM' }, { status: 400 });
    }
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    if (buffer.length > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json({ error: 'File too large. Max 25MB.' }, { status: 413 });
    }
    const result = await uploadToCloudinary(buffer, mimeType);
    await connectDB();
    const image = await Image.create({ url: result.secure_url });
    return NextResponse.json({ id: image._id.toString(), url: image.url }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}


