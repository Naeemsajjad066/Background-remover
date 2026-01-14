import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import connectDB from './configs/mongodb.js';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';
import { clerkWebhooks } from './controllers/userController.js';

const app = express();

// ✅ Middleware to ensure DB connection on each request
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('❌ DB Connection Error:', error.message);
    return res.status(500).json({ 
      success: false,
      error: 'Database connection failed',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// ✅ Enable CORS (before any routes)
app.use(
  cors({
    origin: [
      "https://background-remover-by-naeem.vercel.app", // your frontend
      "http://localhost:5173", // for local testing
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "token"], // ✅ Added 'token' header
    credentials: true,
  })
);

// ✅ Parse JSON bodies
app.use(express.json());

// ✅ Clerk webhook route (must use raw body)
app.post(
  '/api/user/webhooks',
  bodyParser.raw({ type: 'application/json' }),
  clerkWebhooks
);

// ✅ Webhook test route
app.get('/api/user/webhooks', (req, res) => {
  res.send('✅ Webhook route is live (POST only)');
});

// ✅ Health check route
app.get('/health', async (req, res) => {
  try {
    const dbState = mongoose.connection.readyState;
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };
    
    res.json({
      status: 'ok',
      database: states[dbState],
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// ✅ API routes
app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);

// ✅ Root route
app.get('/', (req, res) => {
  res.send('🚀 API is running....');
});

// ✅ Start server (locally or for development)
// In production (Vercel), the serverless function handles this automatically
const PORT = process.env.PORT || 5000;

if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

export default app;
