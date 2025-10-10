import express from 'express';
import { removeBgImage } from '../controllers/imageController.js';
import upload from '../middlewares/multer.js';
import authUser from '../middlewares/auth.js';

const imageRouter = express.Router()

// Test route to verify image endpoint is working
imageRouter.get('/test', (req, res) => {
    res.json({ success: true, message: 'Image API is working', timestamp: new Date() });
});

// Background removal route (POST only) with error handling
imageRouter.post('/removebg', (req, res, next) => {
    upload.single('image')(req, res, (err) => {
        if (err) {
            console.error('Multer error:', err);
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.json({ 
                    success: false, 
                    message: 'File too large. Maximum size is 4MB. Please compress your image and try again.' 
                });
            }
            return res.json({ 
                success: false, 
                message: err.message || 'File upload error' 
            });
        }
        next();
    });
}, authUser, removeBgImage)

export default imageRouter;