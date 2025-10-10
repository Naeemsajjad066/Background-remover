import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './configs/mongodb.js';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';
import { clerkWebhooks } from './controllers/userController.js';

const app = express();

// ✅ Connect MongoDB
await connectDB();

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

// ✅ API routes
app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);

// ✅ Root route
app.get('/', (req, res) => {
  res.send('🚀 API is running....');
});

// ✅ Start server locally (Vercel will handle deployment automatically)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

export default app;
