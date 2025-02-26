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
            required: function () {
                return !(this.googleId || this.facebookId);
            },
        },
        role: {
            type: String,
            enum: ['admin', 'judge', 'contestant', 'audience', 'organizer'],
            default: 'contestant',
        },
        googleId: {
            type: String,
            unique: true,
            sparse: true,
        },
        facebookId: {
            type: String,
            unique: true,
            sparse: true,
        },
    },
    { timestamps: true }
);

const UserModel = mongoose.model('User', userSchema);
export default UserModel;
