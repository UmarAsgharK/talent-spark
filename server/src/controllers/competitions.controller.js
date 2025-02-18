// src/controllers/competitions.controller.js
import CompetitionModel from '../models/Competition.model.js';

// POST /api/competitions
export async function createCompetition(req, res, next) {
    try {
        const { name, description, startDate, endDate, isActive, createdBy } = req.body;
        const newCompetition = await CompetitionModel.create({
            name,
            description,
            startDate,
            endDate,
            isActive,
            createdBy,
        });
        return res.status(201).json(newCompetition);
    } catch (error) {
        next(error);
    }
}

// GET /api/competitions
export async function getAllCompetitions(req, res, next) {
    try {
        const competitions = await CompetitionModel.find({});
        return res.status(200).json(competitions);
    } catch (error) {
        next(error);
    }
}

// GET /api/competitions/:id
export async function getCompetitionById(req, res, next) {
    try {
        const competition = await CompetitionModel.findById(req.params.id);
        if (!competition) {
            return res.status(404).json({ message: 'Competition not found' });
        }
        return res.status(200).json(competition);
    } catch (error) {
        next(error);
    }
}

// PUT /api/competitions/:id
export async function updateCompetition(req, res, next) {
    try {
        const { name, description, startDate, endDate, isActive } = req.body;
        const updated = await CompetitionModel.findByIdAndUpdate(
            req.params.id,
            { name, description, startDate, endDate, isActive },
            { new: true }
        );
        if (!updated) {
            return res.status(404).json({ message: 'Competition not found' });
        }
        return res.status(200).json(updated);
    } catch (error) {
        next(error);
    }
}

// DELETE /api/competitions/:id
export async function deleteCompetition(req, res, next) {
    try {
        const deleted = await CompetitionModel.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Competition not found' });
        }
        return res.status(200).json({ message: 'Competition deleted successfully' });
    } catch (error) {
        next(error);
    }
}
