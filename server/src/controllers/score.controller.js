// src/controllers/score.controller.js
import ScoreModel from '../models/Score.model.js';

// POST /api/scores
export async function addScore(req, res, next) {
    try {
        const { submission, judge, score, feedback } = req.body;
        const newScore = await ScoreModel.create({ submission, judge, score, feedback });
        return res.status(201).json(newScore);
    } catch (error) {
        next(error);
    }
}

// GET /api/scores/submission/:submissionId
export async function getScoresBySubmission(req, res, next) {
    try {
        const { submissionId } = req.params;
        const scores = await ScoreModel.find({ submission: submissionId })
            .populate('judge', 'name email')
            .populate('submission');
        return res.status(200).json(scores);
    } catch (error) {
        next(error);
    }
}

// GET /api/scores/:id
export async function getScoreById(req, res, next) {
    try {
        const score = await ScoreModel.findById(req.params.id)
            .populate('judge', 'name email')
            .populate('submission');
        if (!score) {
            return res.status(404).json({ message: 'Score not found' });
        }
        return res.status(200).json(score);
    } catch (error) {
        next(error);
    }
}

// PUT /api/scores/:id
export async function updateScore(req, res, next) {
    try {
        const { score, feedback } = req.body;
        const updated = await ScoreModel.findByIdAndUpdate(
            req.params.id,
            { score, feedback },
            { new: true }
        );
        if (!updated) {
            return res.status(404).json({ message: 'Score not found' });
        }
        return res.status(200).json(updated);
    } catch (error) {
        next(error);
    }
}

// DELETE /api/scores/:id
export async function deleteScore(req, res, next) {
    try {
        const deleted = await ScoreModel.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Score not found' });
        }
        return res.status(200).json({ message: 'Score deleted successfully' });
    } catch (error) {
        next(error);
    }
}
