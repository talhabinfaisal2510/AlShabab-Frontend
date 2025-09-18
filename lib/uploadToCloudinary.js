import { cloudinary } from './cloudinary';
import { env } from './env';

export async function uploadToCloudinary(buffer, mimeType, originalName) {
  const isVideo = typeof mimeType === 'string' && mimeType.startsWith('video/');
  const isPdf = mimeType === 'application/pdf';
  const options = {
    folder: isVideo
      ? `${env.cloudinary.folder}/videos`
      : isPdf
      ? `${env.cloudinary.folder}/pdfs`
      : `${env.cloudinary.folder}/images`,
    resource_type: isVideo ? 'video' : isPdf ? 'raw' : 'image',
    format: isPdf ? 'pdf' : undefined,
    use_filename: true,
    unique_filename: true,
  };

  // If we have an original filename for PDFs, try to preserve the base name so Cloudinary sets correct headers
  if (isPdf && typeof originalName === 'string') {
    try {
      const base = originalName.replace(/\.[^/.]+$/, '');
      // IMPORTANT: Do NOT prefix folder in public_id; Cloudinary already applies 'folder'
      if (base) options.public_id = `${base}-${Date.now()}`;
    } catch {}
  }

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(options, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      })
      .end(buffer);
  });
}


