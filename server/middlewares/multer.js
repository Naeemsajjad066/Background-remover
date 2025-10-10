import multer from "multer";


// creating multer middleware for handling file uploads

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        // Vercel uses /tmp directory for serverless functions
        callback(null, '/tmp');
    },
    filename: function (req, file, callback) {
        callback(null, `${Date.now()}_${file.originalname}`);
    }
})

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
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