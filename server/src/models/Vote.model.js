// src/models/Vote.model.js
import mongoose from 'mongoose';

const voteSchema = new mongoose.Schema(
    {
        submission: {
            // The submission that was voted for
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Submission',
            required: true,
        },
        voter: {
            // The user who cast this vote
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true }
);

const VoteModel = mongoose.model('Vote', voteSchema);
export default VoteModel;
