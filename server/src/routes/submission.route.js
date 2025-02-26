// src/routes/submission.route.js
import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/upload.js';
import {
    createSubmission,
    getSubmissions,
    getSubmissionById,
    updateSubmission,
    deleteSubmission,
} from '../controllers/submission.controller.js';

const router = Router();

router.route('/')
    .post(authenticate, upload.single('mediaUrl'), createSubmission)
    .get(authenticate, getSubmissions);

router.route('/:id')
    .get(authenticate, getSubmissionById)
    .put(authenticate, updateSubmission)
    .delete(authenticate, deleteSubmission);

export default router;
