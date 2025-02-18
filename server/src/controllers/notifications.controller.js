// src/controllers/notifications.controller.js
import NotificationModel from '../models/Notification.model.js';

// POST /api/notifications
export async function createNotification(req, res, next) {
    try {
        const { user, message } = req.body;
        const newNotification = await NotificationModel.create({ user, message });
        return res.status(201).json(newNotification);
    } catch (error) {
        next(error);
    }
}

// GET /api/notifications/user/:userId
export async function getNotificationsForUser(req, res, next) {
    try {
        const { userId } = req.params;
        const notifications = await NotificationModel.find({ user: userId });
        return res.status(200).json(notifications);
    } catch (error) {
        next(error);
    }
}

// PATCH /api/notifications/:id/read
export async function markNotificationAsRead(req, res, next) {
    try {
        const notification = await NotificationModel.findByIdAndUpdate(
            req.params.id,
            { isRead: true },
            { new: true }
        );
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        return res.status(200).json(notification);
    } catch (error) {
        next(error);
    }
}

// DELETE /api/notifications/:id
export async function deleteNotification(req, res, next) {
    try {
        const deleted = await NotificationModel.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        return res.status(200).json({ message: 'Notification deleted successfully' });
    } catch (error) {
        next(error);
    }
}
