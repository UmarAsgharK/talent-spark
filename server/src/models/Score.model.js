// src/models/Score.model.js
import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema(
    {
        submission: {
            // The submission that is being scored
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Submission',
            required: true,
        },
        judge: {
            // The judge (a User with role: 'judge') who gave this score
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        score: {
            type: Number,
            required: true,
            min: 0,
            max: 100, // Adjust the scoring range as needed
        },
        feedback: {
            type: String,
        },
    },
    { timestamps: true }
);

const ScoreModel = mongoose.model('Score', scoreSchema);
export default ScoreModel;
