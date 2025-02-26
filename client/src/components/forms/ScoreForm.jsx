import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Alert, Box } from '@mui/material';
import axios from 'axios';

const ScoreForm = ({ submissionId, judgeId, initialData = null, onSuccess }) => {
    const [score, setScore] = useState(initialData?.score || '');
    const [comments, setComments] = useState(initialData?.comments || '');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const baseUrl = import.meta.env.VITE_API_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { score, comments };
            let response;
            if (initialData) {
                response = await axios.put(`${baseUrl}/api/submissions/${submissionId}/score`, payload);
            } else {
                response = await axios.post(`${baseUrl}/api/submissions/${submissionId}/score`, payload);
            }
            setSuccess(response.data.message || 'Score submitted successfully!');
            setError('');
            if (onSuccess) onSuccess(response.data);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Submission failed. Please try again.');
            setSuccess('');
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper
                elevation={4}
                sx={{
                    mt: 4,
                    p: 5,
                    borderRadius: '16px',
                    fontFamily: 'Poppins, sans-serif',
                    background: 'linear-gradient(135deg, #ffffff, #f0f4f8)',
                }}
            >
                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                    sx={{ fontWeight: 700, mb: 3, color: '#6a11cb', letterSpacing: '0.5px' }}
                >
                    {initialData ? 'Edit Score' : 'Submit Score'}
                </Typography>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        label="Score"
                        type="number"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={score}
                        onChange={(e) => setScore(e.target.value)}
                        required
                    />
                    <TextField
                        label="Comments"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        multiline
                        rows={3}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{
                            mt: 3,
                            textTransform: 'none',
                            fontWeight: 500,
                            borderRadius: '8px',
                            py: 1.5,
                            background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
                            boxShadow: '0px 4px 12px rgba(0,0,0,0.3)',
                            '&:hover': {
                                background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
                            },
                        }}
                    >
                        {initialData ? 'Update Score' : 'Submit Score'}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default ScoreForm;
