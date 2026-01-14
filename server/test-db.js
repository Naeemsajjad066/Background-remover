import 'dotenv/config';
import mongoose from 'mongoose';

const testConnection = async () => {
  console.log('📋 Testing MongoDB Connection...\n');
  console.log('MongoDB URI:', process.env.MONGODB_URI ? '✅ Found' : '❌ Not found');
  
  if (!process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI is not defined in .env file');
    process.exit(1);
  }

  const mongoURI = `${process.env.MONGODB_URI}/backgroundRemover`;
  console.log('Full URI:', mongoURI.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@'));

  try {
    console.log('\n🔄 Attempting to connect...');
    
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    console.log('✅ MongoDB connected successfully!');
    console.log('Database:', mongoose.connection.name);
    console.log('Host:', mongoose.connection.host);
    console.log('Connection State:', mongoose.connection.readyState);
    
    await mongoose.connection.close();
    console.log('\n✅ Connection closed successfully');
    process.exit(0);
    
  } catch (error) {
    console.error('\n❌ MongoDB connection failed:');
    console.error('Error Name:', error.name);
    console.error('Error Message:', error.message);
    
    if (error.message.includes('ENOTFOUND')) {
      console.error('\n💡 Fix: Check your cluster hostname in MongoDB Atlas');
    } else if (error.message.includes('Authentication failed')) {
      console.error('\n💡 Fix: Check your username and password in MongoDB Atlas');
    } else if (error.message.includes('IP address')) {
      console.error('\n💡 Fix: Add 0.0.0.0/0 to Network Access in MongoDB Atlas');
    }
    
    process.exit(1);
  }
};

testConnection();
