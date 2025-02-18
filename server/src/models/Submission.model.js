// src/models/Submission.model.js
import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema(
    {
        contestant: {
            // The user (role: 'contestant') who submitted this performance
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        round: {
            // The round this submission is for
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Round',
            required: true,
        },
        mediaUrl: {
            // Link to the performance media (video, audio, etc.)
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
    },
    { timestamps: true }
);

const SubmissionModel = mongoose.model('Submission', submissionSchema);
export default SubmissionModel;
