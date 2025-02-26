// src/components/CompetitionForm.jsx
import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Alert, Box, FormControlLabel, Switch } from '@mui/material';
import axios from 'axios';

const CompetitionForm = ({ initialData = null, onSuccess }) => {
    const [name, setName] = useState(initialData?.name || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [startDate, setStartDate] = useState(
        initialData?.startDate ? initialData.startDate.substring(0, 10) : ''
    );
    const [endDate, setEndDate] = useState(
        initialData?.endDate ? initialData.endDate.substring(0, 10) : ''
    );
    const [isActive, setIsActive] = useState(initialData?.isActive || false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const baseUrl = import.meta.env.VITE_API_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { name, description, startDate, endDate, isActive };
            let response;
            if (initialData) {
                response = await axios.put(`${baseUrl}/api/competitions/${initialData.id}`, payload, { withCredentials: true });
            } else {
                response = await axios.post(`${baseUrl}/api/competitions`, payload, { withCredentials: true });
            }
            setSuccess(response.data.message || 'Competition saved successfully!');
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
                    {initialData ? 'Edit Competition' : 'Create Competition'}
                </Typography>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        label="Competition Name"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                        required
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={isActive}
                                onChange={(e) => setIsActive(e.target.checked)}
                                color="primary"
                            />
                        }
                        label="Active"
                        sx={{ mt: 2 }}
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
                        {initialData ? 'Update Competition' : 'Create Competition'}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default CompetitionForm;
