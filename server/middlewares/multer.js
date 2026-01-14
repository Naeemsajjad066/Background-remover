import multer from "multer";
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create uploads directory if it doesn't exist
const uploadsDir = process.env.NODE_ENV === 'production' 
    ? '/tmp' 
    : path.join(__dirname, '../uploads');

if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// creating multer middleware for handling file uploads

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, uploadsDir);
    },
    filename: function (req, file, callback) {
        callback(null, `${Date.now()}_${file.originalname}`);
    }
})

const upload = multer({
    storage,
    limits: {
        fileSize: 4 * 1024 * 1024, // 4MB limit (Vercel has 4.5MB limit, leave some margin)
    },
    fileFilter: function (req, file, callback) {
        // Accept images only
        if (!file.mimetype.startsWith('image/')) {
            return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
    }
})

export default upload