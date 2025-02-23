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
            required: function () { // Make password conditionally required
                return !(this.googleId || this.facebookId); // Required if googleId and facebookId are NOT present
            },
        },
        role: {
            type: String,
            enum: ['admin', 'judge', 'contestant', 'audience'],
            default: 'contestant',
        },
        googleId: { // Add googleId field to store Google's user ID
            type: String,
            unique: true,
            sparse: true, // Allows multiple documents to not have this field
        },
        facebookId: { // Add facebookId field for Facebook OAuth
            type: String,
            unique: true,
            sparse: true, // Allows multiple documents to not have this field
        }
        // Additional fields (e.g., if you don't want a separate Profile model)
        // bio: String,
        // profilePictureUrl: String,
        // socialLinks: [String],
    },
    { timestamps: true }
);

const UserModel = mongoose.model('User', userSchema);
export default UserModel;