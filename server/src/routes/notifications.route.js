// src/routes/notifications.route.js
import { Router } from 'express';
import {
    createNotification,
    getNotificationsForUser,
    markNotificationAsRead,
    deleteNotification,
} from '../controllers/notifications.controller.js';

const router = Router();

/**
 * @route POST /api/notifications
 * @desc Create a new notification
 */
router.post('/', createNotification);

/**
 * @route GET /api/notifications/user/:userId
 * @desc Get notifications for a specific user
 */
router.get('/user/:userId', getNotificationsForUser);

/**
 * @route PATCH /api/notifications/:id/read
 * @desc Mark a notification as read
 */
router.patch('/:id/read', markNotificationAsRead);

/**
 * @route DELETE /api/notifications/:id
 * @desc Delete a notification
 */
router.delete('/:id', deleteNotification);

export default router;
