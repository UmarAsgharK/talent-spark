// src/models/Round.model.js
import mongoose from 'mongoose';

const roundSchema = new mongoose.Schema(
    {
        competition: {
            // The competition this round belongs to
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Competition',
            // required: true, // Uncomment if every round MUST belong to a competition
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
        },
        submissionDeadline: {
            type: Date,
        },
        votingDeadline: {
            type: Date,
        },
        isActive: {
            type: Boolean,
            default: false,
        },
        judgesAssigned: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    { timestamps: true }
);

const RoundModel = mongoose.model('Round', roundSchema);
export default RoundModel;
