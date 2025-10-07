import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './configs/mongodb.js';
import userRouter from './routes/userRoutes.js';
import { clerkWebhooks } from './controllers/userController.js';

const PORT = process.env.PORT || 5000;
const app = express();

// ✅ Connect MongoDB
await connectDB();

// ✅ Clerk webhook route (must use raw body)
app.post(
  '/api/user/webhooks',
  bodyParser.raw({ type: 'application/json' }),
  clerkWebhooks
);

// ✅ Enable JSON only for other routes
// app.use(express.json());
// app.use(cors());
app.use(cors());
app.use('/api/user', userRouter); // Router first (webhook inside handles raw)
app.use(express.json()); // JSON parser comes after
// ✅ Test route
app.get('/', (req, res) => {
  res.send('API is running....');
});

// ✅ Other routes
// app.use('/api/user', userRouter);

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
