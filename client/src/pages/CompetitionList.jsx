// src/components/CompetitionList.jsx
import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
    CircularProgress,
} from '@mui/material';
import { Link } from 'react-router-dom';

const baseUrl = import.meta.env.VITE_API_URL;

const CompetitionList = () => {
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
                setCompetitions(data);
            } catch (error) {
                console.error('Error fetching competitions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCompetitions();
    }, []);

    // Five unique dark gradients
    const gradients = [
        'linear-gradient(135deg, #232526 0%, #414345 100%)',
        'linear-gradient(135deg, #141E30 0%, #243B55 100%)',
        'linear-gradient(135deg, #000428 0%, #004e92 100%)',
        'linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)',
        'linear-gradient(135deg, #1B2735 0%, #090A0F 100%)',
    ];

    return (
        <Container sx={{ py: 10, fontFamily: 'Poppins, sans-serif' }}>
            <Typography
                variant="h4"
                component="h2"
                align="center"
                gutterBottom
                sx={{ fontWeight: 700, color: 'white', mb: 6 }}
            >
                Competitions
            </Typography>
            {loading ? (
                <CircularProgress />
            ) : (
                <Grid container spacing={6}>
                    {competitions.map((comp, index) => (
                        <Grid item key={comp._id} xs={12} sm={6} md={4}>
                            <Card
                                sx={{
                                    borderRadius: '16px',
                                    boxShadow: '0px 4px 20px rgba(0,0,0,0.12)',
                                    transition: 'transform 0.3s, box-shadow 0.3s',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: '0px 12px 30px rgba(0,0,0,0.2)',
                                    },
                                    background: gradients[index % gradients.length],
                                    color: '#fff',
                                }}
                            >
                                <CardContent>
                                    <Typography
                                        variant="h6"
                                        gutterBottom
                                        sx={{ fontWeight: 700, mb: 1 }}
                                    >
                                        {comp.name}
                                    </Typography>
                                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                        Date: {new Date(comp.startDate).toLocaleDateString()}
                                    </Typography>
                                    <Typography variant="body1" sx={{ mt: 1 }}>
                                        {comp.description}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                                    <Button
                                        size="small"
                                        component={Link}
                                        to={`/competitions/${comp._id}`}
                                        variant="contained"
                                        sx={{
                                            textTransform: 'none',
                                            fontWeight: 600,
                                            px: 3,
                                            py: 1,
                                            background: 'rgba(0, 0, 0, 0.4)',
                                            '&:hover': {
                                                background: 'rgba(0, 0, 0, 0.6)',
                                            },
                                        }}
                                    >
                                        View Details
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default CompetitionList;
