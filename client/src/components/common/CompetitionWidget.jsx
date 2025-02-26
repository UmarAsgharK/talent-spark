// src/components/common/CompetitionWidget.jsx
import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const CompetitionWidget = () => {
    const [competitions, setCompetitions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // For now, using sample data. Replace with your actual API call.
        // e.g. const data = await competitionService.getAllCompetitions();
        const fetchData = async () => {
            try {
                // Simulated sample data
                const data = [
                    { id: '1', name: 'Summer Talent Show', date: '2025-06-15' },
                    { id: '2', name: 'Winter Arts Festival', date: '2025-12-01' },
                    { id: '3', name: 'Spring Music Fest', date: '2025-04-10' },
                ];
                setCompetitions(data.slice(0, 3)); // Show only top 3 for brevity
                setLoading(false);
            } catch (err) {
                setError('Failed to load competitions');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <Box sx={{ p: 2, fontFamily: 'Poppins, sans-serif' }}>
                <Typography variant="body1">Loading competitions...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 2, fontFamily: 'Poppins, sans-serif', color: 'error.main' }}>
                <Typography variant="body1">{error}</Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                p: 3,
                mt: 3,
                borderRadius: '16px',
                boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
                background: 'linear-gradient(135deg, #ffffff, #f0f4f8)',
                fontFamily: 'Poppins, sans-serif',
            }}
        >
            <Typography
                variant="h5"
                sx={{ fontWeight: 700, mb: 2, color: '#6a11cb', letterSpacing: '0.5px' }}
            >
                Upcoming Competitions
            </Typography>
            {competitions.map((comp) => (
                <Box key={comp.id} sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {comp.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Date: {comp.date}
                    </Typography>
                </Box>
            ))}
            <Button
                component={Link}
                to="/competitions"
                variant="contained"
                sx={{
                    textTransform: 'none',
                    fontWeight: 500,
                    borderRadius: '8px',
                    mt: 1,
                    background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
                    '&:hover': {
                        background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
                    },
                }}
            >
                View All Competitions
            </Button>
        </Box>
    );
};

export default CompetitionWidget;
