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

router.route('/')
    .post(addScore);

router.route('/submission/:submissionId')
    .get(getScoresBySubmission);

router.route('/:id')
    .get(getScoreById)
    .put(updateScore)
    .delete(deleteScore);

export default router;
