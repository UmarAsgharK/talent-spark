// src/components/UpdateCompetition.jsx
import React, { useEffect, useState } from 'react';
import {
    Typography,
    Box,
    TextField,
    Button,
    CircularProgress,
    FormControlLabel,
    Switch,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const baseUrl = import.meta.env.VITE_API_URL;

const UpdateCompetition = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [competition, setCompetition] = useState({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        isActive: false,
    });
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchCompetition = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${baseUrl}/api/competitions/${id}`, {
                    credentials: 'include'
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch competition');
                }
                const data = await response.json();
                setCompetition({
                    name: data.name,
                    description: data.description,
                    startDate: data.startDate ? new Date(data.startDate).toISOString().substring(0, 10) : '',
                    endDate: data.endDate ? new Date(data.endDate).toISOString().substring(0, 10) : '',
                    isActive: data.isActive,
                });
            } catch (error) {
                console.error('Error fetching competition:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCompetition();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCompetition((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const response = await fetch(`${baseUrl}/api/competitions/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Include cookies with the request
                body: JSON.stringify(competition),
            });
            if (!response.ok) {
                throw new Error('Failed to update competition');
            }
            // Redirect back to the dashboard after successful update
            navigate('/dashboard/organizer');
        } catch (error) {
            console.error('Error updating competition:', error);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: '600px', mx: 'auto', p: 3 }}>
            <Typography variant="h4" sx={{ mb: 3, textAlign: 'center', fontWeight: 600 }}>
                Update Competition
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Competition Name"
                    name="name"
                    value={competition.name}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                    required
                />
                <TextField
                    label="Description"
                    name="description"
                    value={competition.description}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={4}
                    sx={{ mb: 2 }}
                    required
                />
                <TextField
                    label="Start Date"
                    name="startDate"
                    type="date"
                    value={competition.startDate}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                    InputLabelProps={{ shrink: true }}
                    required
                />
                <TextField
                    label="End Date"
                    name="endDate"
                    type="date"
                    value={competition.endDate}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                    InputLabelProps={{ shrink: true }}
                    required
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={competition.isActive}
                            onChange={handleChange}
                            name="isActive"
                            color="primary"
                        />
                    }
                    label="Active"
                    sx={{ mb: 2 }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                        py: 1.5,
                        background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
                        boxShadow: '0px 4px 12px rgba(0,0,0,0.3)',
                        '&:hover': {
                            background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
                        },
                    }}
                    disabled={submitting}
                >
                    {submitting ? 'Updating...' : 'Update Competition'}
                </Button>
            </form>
        </Box>
    );
};

export default UpdateCompetition;
