import React from 'react';
import { Typography, Box, Grid, Paper } from '@mui/material';

const JudgeDashboard = () => {
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
                Judge Dashboard
            </Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                    <Paper
                        elevation={4}
                        sx={{
                            p: 4,
                            borderRadius: '16px',
                            background: 'linear-gradient(135deg, #0D324D 0%, #7F5A83 100%)',
                            color: '#fff',
                        }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                            Pending Reviews
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#ddd' }}>
                            You have 3 performances pending review.
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper
                        elevation={4}
                        sx={{
                            p: 4,
                            borderRadius: '16px',
                            background: 'linear-gradient(135deg, #3A1C71 0%, #D76D77 50%, #FFAF7B 100%)',
                            color: '#fff',
                        }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                            Review History
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#ddd' }}>
                            Your past reviews are all up to date.
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default JudgeDashboard;
