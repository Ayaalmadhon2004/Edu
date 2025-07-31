import mongoose from 'mongoose';

let isConnected = false; // لتجنب إعادة الاتصال كل مرة

export async function connectToDB() {
  if (isConnected) {
    console.log('✅ MongoDB already connected.');
    return;
  }

  try {
    const uri = process.env.MONGODB_URI as string;

    if (!uri) {
      throw new Error('❌ Please define MONGODB_URI in .env');
    }

    // الاتصال بقاعدة البيانات
    const db = await mongoose.connect(uri, {
      dbName: 'Education', // ضع اسم قاعدة البيانات الخاصة بك
    });

    isConnected = db.connections[0].readyState === 1;

    console.log('✅ MongoDB connected successfully.');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
}
