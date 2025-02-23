// src/routes/submission.route.js
import { Router } from 'express';
import {
    createSubmission,
    getSubmissions,
    getSubmissionById,
    updateSubmission,
    deleteSubmission,
} from '../controllers/submission.controller.js';

const router = Router();

router.route('/')
    .post(createSubmission)
    .get(getSubmissions);

router.route('/:id')
    .get(getSubmissionById)
    .put(updateSubmission)
    .delete(deleteSubmission);

export default router;
