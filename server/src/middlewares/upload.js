// src/middlewares/upload.js
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'performances',          // folder name in Cloudinary
        resource_type: 'video',           // use 'video' for video files (or 'image' for images)
        allowed_formats: ['mp4', 'mov', 'avi'], // adjust as needed
    },
});

const upload = multer({ storage: storage });

export default upload;
