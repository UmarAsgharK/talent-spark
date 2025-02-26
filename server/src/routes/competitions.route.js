// src/routes/competitions.route.js
import { Router } from 'express';
import { authenticate, authorizeRoles } from '../middlewares/auth.middleware.js';
import {
    createCompetition,
    getAllCompetitions,
    getCompetitionById,
    updateCompetition,
    deleteCompetition,
} from '../controllers/competitions.controller.js';

const router = Router();

router.route('/')
    .post(authenticate, authorizeRoles('organizer', 'admin'), createCompetition)
    .get(getAllCompetitions);

router.route('/:id')
    .get(getCompetitionById)
    .put(authenticate, authorizeRoles('organizer', 'admin'), updateCompetition)
    .delete(authenticate, authorizeRoles('organizer', 'admin'), deleteCompetition);

export default router;
