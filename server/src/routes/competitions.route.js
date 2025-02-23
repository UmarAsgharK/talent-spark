import { Router } from 'express';
import {
    createCompetition,
    getAllCompetitions,
    getCompetitionById,
    updateCompetition,
    deleteCompetition,
} from '../controllers/competitions.controller.js';

const router = Router();

router.route('/')
    .post(createCompetition)
    .get(getAllCompetitions);

router.route('/:id')
    .get(getCompetitionById)
    .put(updateCompetition)
    .delete(deleteCompetition);

export default router;