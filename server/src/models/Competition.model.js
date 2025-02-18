// src/models/Competition.model.js
import mongoose from 'mongoose';

const competitionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
        },
        startDate: {
            type: Date,
        },
        endDate: {
            type: Date,
        },
        isActive: {
            type: Boolean,
            default: false,
        },
        createdBy: {
            // The user who created this competition
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true }
);

const CompetitionModel = mongoose.model('Competition', competitionSchema);
export default CompetitionModel;
