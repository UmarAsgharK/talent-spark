// src/routes/vote.route.js
import { Router } from 'express';
import {
    castVote,
    getVotesBySubmission,
    removeVote,
} from '../controllers/vote.controller.js';

const router = Router();

router.route('/')
    .post(castVote);

router.route('/submission/:submissionId')
    .get(getVotesBySubmission);

router.route('/:id')
    .delete(removeVote);

export default router;
