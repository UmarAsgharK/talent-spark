import React, { useState, useEffect } from 'react';
import {
    Typography,
    Box,
    Grid,
    Paper,
    Button,
    CircularProgress,
} from '@mui/material';
import { Link } from 'react-router-dom';

const baseUrl = import.meta.env.VITE_API_URL;

const ContestantDashboard = () => {
    const [competitions, setCompetitions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCompetitions = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${baseUrl}/api/competitions`);
                if (!response.ok) {
                    throw new Error('Failed to fetch competitions');
                }
                const data = await response.json();
                // Filter only active competitions
                const activeCompetitions = data.filter((comp) => comp.isActive);
                setCompetitions(activeCompetitions);
            } catch (error) {
                console.error('Error fetching competitions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCompetitions();
    }, []);

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
                Contestant Dashboard
            </Typography>

            <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                    <Paper
                        elevation={4}
                        sx={{
                            p: 4,
                            borderRadius: '16px',
                            background: 'linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)',
                            color: '#fff',
                        }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                            Upcoming Deadlines
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#ddd' }}>
                            You have no upcoming deadlines at the moment.
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper
                        elevation={4}
                        sx={{
                            p: 4,
                            borderRadius: '16px',
                            background: 'linear-gradient(135deg, #1C1C1C 0%, #333333 100%)',
                            color: '#fff',
                        }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                            Submission Status
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#ddd' }}>
                            You haven't submitted any performances yet.
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            {/* Active Competitions Section */}
            <Box sx={{ mt: 6 }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                    Active Competitions
                </Typography>
                {loading ? (
                    <CircularProgress />
                ) : competitions.length === 0 ? (
                    <Typography>No active competitions available.</Typography>
                ) : (
                    <Grid container spacing={4}>
                        {competitions.map((comp) => (
                            <Grid item key={comp._id} xs={12} sm={6} md={4}>
                                <Paper
                                    elevation={3}
                                    sx={{
                                        p: 3,
                                        borderRadius: '12px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <Box>
                                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                            {comp.name}
                                        </Typography>
                                        <Typography variant="body2" sx={{ mt: 1 }}>
                                            {comp.description}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                                        <Button
                                            component={Link}
                                            to={`/submit-performance/${comp._id}`}
                                            variant="contained"
                                            sx={{
                                                textTransform: 'none',
                                                backgroundColor: '#2575fc',
                                                '&:hover': {
                                                    backgroundColor: '#1a5bb8',
                                                },
                                            }}
                                        >
                                            Submit Performance
                                        </Button>
                                    </Box>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>
        </Box>
    );
};

export default ContestantDashboard;
