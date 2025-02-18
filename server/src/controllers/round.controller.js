// src/controllers/round.controller.js
import RoundModel from '../models/Round.model.js';

// POST /api/rounds
export async function createRound(req, res, next) {
    try {
        const {
            competition,
            name,
            description,
            submissionDeadline,
            votingDeadline,
            isActive,
            judgesAssigned,
        } = req.body;

        const newRound = await RoundModel.create({
            competition,
            name,
            description,
            submissionDeadline,
            votingDeadline,
            isActive,
            judgesAssigned,
        });

        return res.status(201).json(newRound);
    } catch (error) {
        next(error);
    }
}

// GET /api/rounds
export async function getAllRounds(req, res, next) {
    try {
        const rounds = await RoundModel.find({});
        return res.status(200).json(rounds);
    } catch (error) {
        next(error);
    }
}

// GET /api/rounds/:id
export async function getRoundById(req, res, next) {
    try {
        const round = await RoundModel.findById(req.params.id).populate('judgesAssigned');
        if (!round) {
            return res.status(404).json({ message: 'Round not found' });
        }
        return res.status(200).json(round);
    } catch (error) {
        next(error);
    }
}

// PUT /api/rounds/:id
export async function updateRound(req, res, next) {
    try {
        const {
            competition,
            name,
            description,
            submissionDeadline,
            votingDeadline,
            isActive,
            judgesAssigned,
        } = req.body;

        const updated = await RoundModel.findByIdAndUpdate(
            req.params.id,
            {
                competition,
                name,
                description,
                submissionDeadline,
                votingDeadline,
                isActive,
                judgesAssigned,
            },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ message: 'Round not found' });
        }
        return res.status(200).json(updated);
    } catch (error) {
        next(error);
    }
}

// DELETE /api/rounds/:id
export async function deleteRound(req, res, next) {
    try {
        const deleted = await RoundModel.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Round not found' });
        }
        return res.status(200).json({ message: 'Round deleted successfully' });
    } catch (error) {
        next(error);
    }
}
