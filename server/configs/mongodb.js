import mongoose from "mongoose";

const connectDB = async () => {
  // If already connected, return immediately
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    mongoose.connection.on('connected', () => {
      console.log('✅ MongoDB connected');
    });
    
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    await mongoose.connect(`${process.env.MONGODB_URI}/backgroundRemover`, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    throw error; // Let the caller handle the error instead of crashing
  }
};

export default connectDB;