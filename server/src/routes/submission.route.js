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

/**
 * @route POST /api/submissions
 * @desc Create a new submission (contestant uploads performance)
 */
router.post('/', createSubmission);

/**
 * @route GET /api/submissions
 * @desc Get all submissions (optional: filter by round or user)
 */
router.get('/', getSubmissions);

/**
 * @route GET /api/submissions/:id
 * @desc Get a single submission by ID
 */
router.get('/:id', getSubmissionById);

/**
 * @route PUT /api/submissions/:id
 * @desc Update submission details
 */
router.put('/:id', updateSubmission);

/**
 * @route DELETE /api/submissions/:id
 * @desc Delete a submission
 */
router.delete('/:id', deleteSubmission);

export default router;
