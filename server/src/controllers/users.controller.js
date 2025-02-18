// src/controllers/users.controller.js
import UserModel from '../models/User.model.js';

// GET /api/users
export async function getAllUsers(req, res, next) {
    try {
        const users = await UserModel.find({});
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

// GET /api/users/:id
export async function getUserById(req, res, next) {
    try {
        const user = await UserModel.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

// PUT /api/users/:id
export async function updateUser(req, res, next) {
    try {
        const { name, email, role } = req.body;
        const updatedUser = await UserModel.findByIdAndUpdate(
            req.params.id,
            { name, email, role },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
}

// DELETE /api/users/:id
export async function deleteUser(req, res, next) {
    try {
        const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
}
