import mongoose from 'mongoose';
import { env } from './env';

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;
  try {
    await mongoose.connect(env.database.url);
    isConnected = true;
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    throw error;
  }
}


