import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema(
    {
        contestant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        competition: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Competition',
            required: true,
        },
        mediaUrl: {
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
