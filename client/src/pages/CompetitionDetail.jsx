// src/components/CompetitionDetail.jsx
import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Paper, Divider } from '@mui/material';
import { useParams } from 'react-router-dom';

const baseUrl = import.meta.env.VITE_API_URL;

const CompetitionDetail = () => {
    const { id } = useParams();
    const [competition, setCompetition] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCompetition = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${baseUrl}/api/competitions/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch competition');
                }
                const data = await response.json();
                setCompetition(data);
            } catch (error) {
                console.error('Error fetching competition:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCompetition();
    }, [id]);

    if (loading) {
        return (
            <Container sx={{ py: 10, fontFamily: 'Poppins, sans-serif' }}>
                <Typography variant="h6" align="center" sx={{ color: '#f5a' }}>
                    Loading competition details...
                </Typography>
            </Container>
        );
    }

    if (!competition) {
        return (
            <Container sx={{ py: 10, fontFamily: 'Poppins, sans-serif' }}>
                <Typography variant="h6" align="center" sx={{ color: '#555' }}>
                    Competition not found.
                </Typography>
            </Container>
        );
    }

    return (
        <Container sx={{ py: 10, fontFamily: 'Poppins, sans-serif' }}>
            <Paper
                elevation={8}
                sx={{
                    p: 6,
                    borderRadius: '24px',
                    // background: 'linear-gradient(135deg, #ffffff,rgb(35, 93, 180))',
                    boxShadow: '0px 8px 30px rgba(0,0,0,0.2)',
                    overflow: 'hidden',
                }}
            >
                {/* Header Banner */}
                <Box
                    sx={{
                        background: 'linear-gradient(90deg, #6a11cb, #2575fc)',
                        py: 2,
                        px: 3,
                        borderRadius: '16px',
                        mb: 4,
                        textAlign: 'center',
                    }}
                >
                    <Typography
                        variant="h4"
                        component="h1"
                        sx={{ fontWeight: 800, color: '#fff', letterSpacing: '0.5px' }}
                    >
                        {competition.name}
                    </Typography>
                </Box>

                {/* Date Information */}
                <Box sx={{ mb: 3, color: '#555' }}>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>
                        <strong>Start Date:</strong>{' '}
                        {competition.startDate ? new Date(competition.startDate).toLocaleDateString() : 'N/A'}
                    </Typography>
                    <Typography variant="subtitle1">
                        <strong>End Date:</strong>{' '}
                        {competition.endDate ? new Date(competition.endDate).toLocaleDateString() : 'N/A'}
                    </Typography>
                </Box>

                <Divider sx={{ my: 3, borderColor: '#ddd' }} />

                {/* Competition Description */}
                <Typography variant="body1" sx={{ my: 3, lineHeight: 1.8, color: '#333' }}>
                    {competition.description}
                </Typography>

                {/* Optional Sections */}
                {competition.rules && (
                    <>
                        <Typography
                            variant="h6"
                            gutterBottom
                            sx={{ fontWeight: 700, mt: 4, color: '#6a11cb' }}
                        >
                            Rules & Guidelines
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 3, color: '#444' }}>
                            {competition.rules}
                        </Typography>
                    </>
                )}
                {competition.schedule && (
                    <>
                        <Typography
                            variant="h6"
                            gutterBottom
                            sx={{ fontWeight: 700, mt: 2, color: '#6a11cb' }}
                        >
                            Schedule
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 4, color: '#444' }}>
                            {competition.schedule}
                        </Typography>
                    </>
                )}
            </Paper>
        </Container>
    );
};

export default CompetitionDetail;
