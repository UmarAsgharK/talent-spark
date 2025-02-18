// src/routes/score.route.js
import { Router } from 'express';
import {
    addScore,
    getScoresBySubmission,
    getScoreById,
    updateScore,
    deleteScore,
} from '../controllers/score.controller.js';

const router = Router();

/**
 * @route POST /api/scores
 * @desc Add a new score (judge scoring a submission)
 */
router.post('/', addScore);

/**
 * @route GET /api/scores/submission/:submissionId
 * @desc Get all scores for a specific submission
 */
router.get('/submission/:submissionId', getScoresBySubmission);

/**
 * @route GET /api/scores/:id
 * @desc Get a single score by ID
 */
router.get('/:id', getScoreById);

/**
 * @route PUT /api/scores/:id
 * @desc Update a score
 */
router.put('/:id', updateScore);

/**
 * @route DELETE /api/scores/:id
 * @desc Delete a score
 */
router.delete('/:id', deleteScore);

export default router;
