// src/controllers/vote.controller.js
import VoteModel from '../models/Vote.model.js';

// POST /api/votes
export async function castVote(req, res, next) {
    try {
        const { submission, voter } = req.body;

        // Optional: check if user already voted for this submission
        const existingVote = await VoteModel.findOne({ submission, voter });
        if (existingVote) {
            return res.status(400).json({ message: 'You have already voted on this submission' });
        }

        const newVote = await VoteModel.create({ submission, voter });
        return res.status(201).json(newVote);
    } catch (error) {
        next(error);
    }
}

// GET /api/votes/submission/:submissionId
export async function getVotesBySubmission(req, res, next) {
    try {
        const { submissionId } = req.params;
        const votes = await VoteModel.find({ submission: submissionId })
            .populate('voter', 'name email')
            .populate('submission');
        return res.status(200).json(votes);
    } catch (error) {
        next(error);
    }
}

// DELETE /api/votes/:id
export async function removeVote(req, res, next) {
    try {
        const deleted = await VoteModel.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Vote not found' });
        }
        return res.status(200).json({ message: 'Vote removed successfully' });
    } catch (error) {
        next(error);
    }
}
