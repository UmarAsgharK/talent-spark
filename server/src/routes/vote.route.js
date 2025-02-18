// src/routes/vote.route.js
import { Router } from 'express';
import {
    castVote,
    getVotesBySubmission,
    removeVote,
} from '../controllers/vote.controller.js';

const router = Router();

/**
 * @route POST /api/votes
 * @desc Cast a vote for a submission
 */
router.post('/', castVote);

/**
 * @route GET /api/votes/submission/:submissionId
 * @desc Get all votes for a specific submission
 */
router.get('/submission/:submissionId', getVotesBySubmission);

/**
 * @route DELETE /api/votes/:id
 * @desc Remove a vote (if allowed)
 */
router.delete('/:id', removeVote);

export default router;
