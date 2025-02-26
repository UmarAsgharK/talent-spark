import SubmissionModel from '../models/Submission.model.js';

// POST /api/submissions
export async function createSubmission(req, res, next) {
    try {
        const { contestant, competition, description } = req.body;
        // req.file now contains the Cloudinary upload result
        const mediaUrl = req.file ? req.file.path : '';
        const newSubmission = await SubmissionModel.create({
            contestant,
            competition,
            mediaUrl,
            description,
        });
        return res.status(201).json(newSubmission);
    } catch (error) {
        next(error);
    }
}

// GET /api/submissions
export async function getSubmissions(req, res, next) {
    try {
        // Now using "competition" instead of "round"
        const { competition, contestant } = req.query;
        const query = {};
        if (competition) query.competition = competition;
        if (contestant) query.contestant = contestant;

        const submissions = await SubmissionModel.find(query)
            .populate('contestant', 'name email')
            .populate('competition', 'name');
        return res.status(200).json(submissions);
    } catch (error) {
        next(error);
    }
}

// GET /api/submissions/:id
export async function getSubmissionById(req, res, next) {
    try {
        const submission = await SubmissionModel.findById(req.params.id)
            .populate('contestant', 'name email')
            .populate('competition', 'name');
        if (!submission) {
            return res.status(404).json({ message: 'Submission not found' });
        }
        return res.status(200).json(submission);
    } catch (error) {
        next(error);
    }
}

// PUT /api/submissions/:id
export async function updateSubmission(req, res, next) {
    try {
        const { mediaUrl, description } = req.body;
        const updated = await SubmissionModel.findByIdAndUpdate(
            req.params.id,
            { mediaUrl, description },
            { new: true }
        );
        if (!updated) {
            return res.status(404).json({ message: 'Submission not found' });
        }
        return res.status(200).json(updated);
    } catch (error) {
        next(error);
    }
}

// DELETE /api/submissions/:id
export async function deleteSubmission(req, res, next) {
    try {
        const deleted = await SubmissionModel.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Submission not found' });
        }
        return res.status(200).json({ message: 'Submission deleted successfully' });
    } catch (error) {
        next(error);
    }
}
