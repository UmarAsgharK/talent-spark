// src/routes/round.route.js
import { Router } from 'express';
import {
    createRound,
    getAllRounds,
    getRoundById,
    updateRound,
    deleteRound,
} from '../controllers/round.controller.js';

const router = Router();

/**
 * @route POST /api/rounds
 * @desc Create a new round
 */
router.post('/', createRound);

/**
 * @route GET /api/rounds
 * @desc Get all rounds
 */
router.get('/', getAllRounds);

/**
 * @route GET /api/rounds/:id
 * @desc Get a single round by ID
 */
router.get('/:id', getRoundById);

/**
 * @route PUT /api/rounds/:id
 * @desc Update a round
 */
router.put('/:id', updateRound);

/**
 * @route DELETE /api/rounds/:id
 * @desc Delete a round
 */
router.delete('/:id', deleteRound);

export default router;
