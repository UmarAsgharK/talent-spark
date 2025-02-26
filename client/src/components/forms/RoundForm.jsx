import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Alert, Box } from '@mui/material';
import axios from 'axios';

const RoundForm = ({ competitionId, initialData = null, onSuccess }) => {
    const [roundName, setRoundName] = useState(initialData?.roundName || '');
    const [startDate, setStartDate] = useState(initialData?.startDate || '');
    const [endDate, setEndDate] = useState(initialData?.endDate || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const baseUrl = import.meta.env.VITE_API_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { roundName, startDate, endDate, description };
            let response;
            if (initialData) {
                response = await axios.put(
                    `${baseUrl}/api/competitions/${competitionId}/rounds/${initialData.id}`,
                    payload
                );
            } else {
                response = await axios.post(`${baseUrl}/api/competitions/${competitionId}/rounds`, payload);
            }
            setSuccess(response.data.message || 'Round saved successfully!');
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
                    {initialData ? 'Edit Round' : 'Add Round'}
                </Typography>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        label="Round Name"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={roundName}
                        onChange={(e) => setRoundName(e.target.value)}
                        required
                    />
                    <TextField
                        label="Start Date"
                        type="date"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        required
                    />
                    <TextField
                        label="End Date"
                        type="date"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        required
                    />
                    <TextField
                        label="Description"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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
                        {initialData ? 'Update Round' : 'Create Round'}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default RoundForm;
