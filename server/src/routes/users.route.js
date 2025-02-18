// src/routes/users.route.js
import { Router } from 'express';
import {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
} from '../controllers/users.controller.js';

const router = Router();

/**
 * @route GET /api/users
 * @desc Get all users (admin only, typically)
 */
router.get('/', getAllUsers);

/**
 * @route GET /api/users/:id
 * @desc Get user by ID
 */
router.get('/:id', getUserById);

/**
 * @route PUT /api/users/:id
 * @desc Update user details
 */
router.put('/:id', updateUser);

/**
 * @route DELETE /api/users/:id
 * @desc Delete a user
 */
router.delete('/:id', deleteUser);

export default router;
