// src/routes/round.route.js
import { Router } from 'express';
import {
    createRound,
    getAllRounds,
    getRoundById,
    updateRound,
    deleteRound,
} from '../controllers/round.controller.js';

const router = Router();

router
    .route('/')
    .post(createRound)
    .get(getAllRounds);

router
    .route('/:id')
    .get(getRoundById)
    .put(updateRound)
    .delete(deleteRound);

export default router;
