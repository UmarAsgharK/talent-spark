// src/routes/notifications.route.js
import { Router } from 'express';
import {
    createNotification,
    getNotificationsForUser,
    markNotificationAsRead,
    deleteNotification,
} from '../controllers/notifications.controller.js';

const router = Router();

router.route('/')
    .post(createNotification);

router.route('/user/:userId')
    .get(getNotificationsForUser);

router.route('/:id/read')
    .patch(markNotificationAsRead);

router.route('/:id')
    .delete(deleteNotification);

export default router;
