import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';
import userModel from '../models/userModel.js';

//controller function to remove background
const removeBgImage = async (req, res) => {
  // ✅ Add CORS headers manually (required for Vercel)
  res.setHeader("Access-Control-Allow-Origin", "https://background-remover-by-naeem.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, token");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // ✅ Handle preflight (browser OPTIONS request)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  let imagePath = null;

  try {
    // Check for multer errors (file too large, wrong type, etc.)
    if (req.fileValidationError) {
      return res.json({ success: false, message: req.fileValidationError });
    }

    if (!req.file) {
      return res.json({ success: false, message: "No image file provided. Please upload an image under 4MB." });
    }

    const { clerkId } = req.body;

    if (!clerkId) {
      return res.json({ success: false, message: "Authentication required" });
    }

    const user = await userModel.findOne({ clerkId });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.creditBalance === 0) {
      return res.json({ success: false, message: "Insufficient credits", creditBalance: user.creditBalance });
    }

    imagePath = req.file.path;

    //reading the image file 
    const imageFile = fs.createReadStream(imagePath);
    const formData = new FormData();
    formData.append('image_file', imageFile);

    //calling the clipdrop api to remove background
    const { data } = await axios.post('https://clipdrop-api.co/remove-background/v1', formData, {
      headers: {
        'x-api-key': process.env.CLIPDROP_API,
        ...formData.getHeaders()
      },
      responseType: 'arraybuffer'
    });

    const base64Image = Buffer.from(data, 'binary').toString('base64');
    const resultImage = `data:${req.file.mimetype};base64,${base64Image}`;

    await userModel.findByIdAndUpdate(user._id, { creditBalance: user.creditBalance - 1 });

    // Clean up uploaded file
    if (imagePath && fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    res.json({
      success: true,
      message: "Background removed successfully",
      resultImage,
      creditBalance: user.creditBalance - 1
    });

  } catch (error) {
    console.error("❌ Background removal error:", error.message);
    console.error("Full error:", error);

    // Clean up uploaded file in case of error
    if (imagePath && fs.existsSync(imagePath)) {
      try {
        fs.unlinkSync(imagePath);
      } catch (cleanupError) {
        console.error("File cleanup error:", cleanupError);
      }
    }

    res.json({
      success: false,
      message: error.message || "Failed to remove background"
    });
  }
};

export { removeBgImage };
