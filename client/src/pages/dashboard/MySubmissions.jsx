// src/pages/dashboard/MySubmissions.jsx
import React, { useState, useEffect, useContext } from 'react';
import { Container, Typography, Box, Paper, Grid, CircularProgress, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext.jsx';

const MySubmissions = () => {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(false);
    const baseUrl = import.meta.env.VITE_API_URL;
    const { user } = useContext(AuthContext);

    // Get the actual user ID from AuthContext
    const userId = user ? user._id : null;

    useEffect(() => {
        if (!userId) return; // Only fetch if userId exists
        const fetchSubmissions = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${baseUrl}/api/submissions?contestant=${userId}`, { withCredentials: true });
                setSubmissions(response.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchSubmissions();
    }, [baseUrl, userId]);

    return (
        <Container sx={{ py: 8, fontFamily: 'Poppins, sans-serif' }}>
            <Typography variant="h4" align="center" sx={{ mb: 4, color: '#6a11cb', fontWeight: 700 }}>
                My Submissions
            </Typography>
            {loading ? (
                <CircularProgress />
            ) : submissions.length === 0 ? (
                <Typography>No submissions found.</Typography>
            ) : (
                <Grid container spacing={4}>
                    {submissions.map((submission) => (
                        <Grid item key={submission._id} xs={12} sm={6} md={4}>
                            <Paper elevation={3} sx={{ p: 3, borderRadius: '12px' }}>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    Submission for: {submission.competition?.name || 'Unknown Competition'}
                                </Typography>
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                    {submission.description}
                                </Typography>
                                <Button
                                    component={Link}
                                    to={`/dashboard/submissions/${submission._id}`}
                                    variant="contained"
                                    sx={{ mt: 2, textTransform: 'none' }}
                                >
                                    View Details
                                </Button>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default MySubmissions;
