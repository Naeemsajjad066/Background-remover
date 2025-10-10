import express from 'express';
import { removeBgImage } from '../controllers/imageController.js';
import upload from '../middlewares/multer.js';
import authUser from '../middlewares/auth.js';

const imageRouter = express.Router()

// Test route to verify image endpoint is working
imageRouter.get('/test', (req, res) => {
    res.json({ success: true, message: 'Image API is working', timestamp: new Date() });
});

// Background removal route (POST only)
imageRouter.post('/removebg', upload.single('image'), authUser, removeBgImage)

export default imageRouter;