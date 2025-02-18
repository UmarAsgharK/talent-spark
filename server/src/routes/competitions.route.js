// src/routes/competitions.route.js
import { Router } from 'express';
import {
    createCompetition,
    getAllCompetitions,
    getCompetitionById,
    updateCompetition,
    deleteCompetition,
} from '../controllers/competitions.controller.js';

const router = Router();

/**
 * @route POST /api/competitions
 * @desc Create a new competition
 */
router.post('/', createCompetition);

/**
 * @route GET /api/competitions
 * @desc Get all competitions
 */
router.get('/', getAllCompetitions);

/**
 * @route GET /api/competitions/:id
 * @desc Get a single competition by ID
 */
router.get('/:id', getCompetitionById);

/**
 * @route PUT /api/competitions/:id
 * @desc Update a competition
 */
router.put('/:id', updateCompetition);

/**
 * @route DELETE /api/competitions/:id
 * @desc Delete a competition
 */
router.delete('/:id', deleteCompetition);

export default router;
