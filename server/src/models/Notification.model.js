// src/models/Notification.model.js
import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
    {
        user: {
            // The user who will receive this notification
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        isRead: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const NotificationModel = mongoose.model('Notification', notificationSchema);
export default NotificationModel;
