// src/components/OrganizerDashboard.jsx
import React, { useEffect, useState } from 'react';
import { Typography, Box, Grid, Paper, Button, CircularProgress } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

const baseUrl = import.meta.env.VITE_API_URL;

const OrganizerDashboard = () => {
    const [competitions, setCompetitions] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCompetitions = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${baseUrl}/api/competitions`);
            if (!response.ok) {
                throw new Error('Failed to fetch competitions');
            }
            const data = await response.json();
            setCompetitions(data);
        } catch (error) {
            console.error('Error fetching competitions:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCompetitions();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this competition?')) return;
        try {
            const response = await fetch(`${baseUrl}/api/competitions/${id}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error('Failed to delete competition');
            }
            setCompetitions(competitions.filter(comp => comp._id !== id));
        } catch (error) {
            console.error('Error deleting competition:', error);
        }
    };

    return (
        <Box sx={{ fontFamily: 'Poppins, sans-serif', p: 3 }}>
            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    color: '#6a11cb',
                    fontWeight: 800,
                    mb: 4,
                    textAlign: 'center',
                    letterSpacing: '0.5px',
                }}
            >
                Organizer Dashboard
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                <Button
                    variant="contained"
                    component={Link}
                    to="competitions/new"  // relative link; resolves to /dashboard/organizer/competitions/new
                    sx={{
                        textTransform: 'none',
                        fontWeight: 600,
                        borderRadius: '8px',
                        px: 4,
                        py: 1.5,
                        background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
                        boxShadow: '0px 4px 12px rgba(0,0,0,0.3)',
                        '&:hover': {
                            background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
                        },
                    }}
                >
                    Create New Competition
                </Button>
            </Box>

            {/* Outlet for nested routes (CompetitionForm or UpdateCompetition) */}
            <Outlet />

            <Grid container spacing={4} sx={{ mt: 6 }}>
                <Grid item xs={12} sm={6}>
                    <Paper
                        elevation={4}
                        sx={{
                            p: 4,
                            borderRadius: '16px',
                            background: 'linear-gradient(135deg, #1C2331 0%, #3A4750 100%)',
                            color: '#fff',
                        }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                            Active Competitions
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#ddd' }}>
                            Currently, no competitions are active.
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper
                        elevation={4}
                        sx={{
                            p: 4,
                            borderRadius: '16px',
                            background: 'linear-gradient(135deg, #2C3E50 0%, #4CA1AF 100%)',
                            color: '#fff',
                        }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                            Participant Statistics
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#ddd' }}>
                            No statistics available yet.
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            {/* Competitions List */}
            <Box sx={{ mt: 6 }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                    All Competitions
                </Typography>
                {loading ? (
                    <CircularProgress />
                ) : competitions.length === 0 ? (
                    <Typography>No competitions available.</Typography>
                ) : (
                    competitions.map((competition) => (
                        <Paper
                            key={competition._id}
                            elevation={3}
                            sx={{
                                p: 3,
                                mb: 2,
                                borderRadius: '12px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <Box>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    {competition.name}
                                </Typography>
                                <Typography variant="body2">{competition.description}</Typography>
                                <Typography variant="body2">
                                    {new Date(competition.startDate).toLocaleDateString()} -{' '}
                                    {new Date(competition.endDate).toLocaleDateString()}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Button
                                    variant="contained"
                                    component={Link}
                                    to={`competitions/update/${competition._id}`}
                                    sx={{
                                        textTransform: 'none',
                                        backgroundColor: '#2575fc',
                                        '&:hover': {
                                            backgroundColor: '#1a5bb8',
                                        },
                                    }}
                                >
                                    Update
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() => handleDelete(competition._id)}
                                    sx={{ textTransform: 'none' }}
                                >
                                    Delete
                                </Button>
                            </Box>
                        </Paper>
                    ))
                )}
            </Box>
        </Box>
    );
};

export default OrganizerDashboard;
