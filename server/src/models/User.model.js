// src/models/User.model.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['admin', 'judge', 'contestant', 'audience'],
            default: 'contestant',
        },
        // Additional fields (e.g., if you don't want a separate Profile model)
        // bio: String,
        // profilePictureUrl: String,
        // socialLinks: [String],
    },
    { timestamps: true }
);

const UserModel = mongoose.model('User', userSchema);
export default UserModel;
