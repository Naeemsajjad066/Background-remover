import express from 'express';
import authUser from '../middlewares/auth.js';
import { userCredits } from '../controllers/userController.js';
import { clerkWebhooks } from '../controllers/userController.js';

const userRouter = express.Router();

// Test route to verify webhook endpoint is reachable
userRouter.get('/webhooks/test', (req, res) => {
    res.json({ message: 'Webhook endpoint is reachable', timestamp: new Date() });
});

userRouter.get("/credits",authUser,userCredits)
userRouter.post('/webhooks', clerkWebhooks);

export default userRouter;