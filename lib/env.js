export const env = {
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
    apiKey: process.env.CLOUDINARY_API_KEY || '',
    apiSecret: process.env.CLOUDINARY_API_SECRET || '',
    folder: process.env.CLOUDINARY_FOLDER || 'alshabab',
  },
  database: {
    url: process.env.DATABASE_URL || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/alshabab',
  },
};


