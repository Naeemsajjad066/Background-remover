import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  // Check if MongoDB URI exists
  if (!process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI environment variable is not defined');
    throw new Error('MONGODB_URI is not defined in environment variables');
  }

  // If already connected, return the existing connection
  if (cached.conn) {
    return cached.conn;
  }

  // If connection promise exists, wait for it
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    };

    // Handle the database name properly
    const mongoURI = process.env.MONGODB_URI.includes('?')
      ? process.env.MONGODB_URI.replace('?', '/backgroundRemover?')
      : `${process.env.MONGODB_URI}/backgroundRemover`;

    cached.promise = mongoose.connect(mongoURI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
};

export default connectDB;