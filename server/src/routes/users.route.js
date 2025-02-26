// src/routes/users.route.js
import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
} from '../controllers/users.controller.js';

const router = Router();

router.route('/')
    .get(getAllUsers);

// Add this route to get the current logged-in user.
router.get('/me', authenticate, (req, res) => {
    res.status(200).json(req.user);
});

router.route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

export default router;
