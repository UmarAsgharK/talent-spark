// src/pages/Settings.jsx
import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Alert, Box } from '@mui/material';
import axios from 'axios';

const Settings = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const baseUrl = import.meta.env.VITE_API_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('New password and confirmation do not match.');
            return;
        }
        try {
            const response = await axios.put(`${baseUrl}/api/settings/change-password`, {
                currentPassword,
                newPassword,
            });
            setSuccess(response.data.message || 'Password updated successfully!');
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Password update failed. Please try again.');
            setSuccess('');
        }
    };

    return (
        <Container maxWidth="sm" sx={{ py: 8, fontFamily: 'Poppins, sans-serif' }}>
            <Paper
                elevation={4}
                sx={{
                    p: 5,
                    borderRadius: '16px',
                    boxShadow: '0px 4px 15px rgba(0,0,0,0.1)',
                    background: 'linear-gradient(135deg, #ffffff, #f0f4f8)',
                }}
            >
                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                    sx={{ fontWeight: 700, mb: 3, color: '#6a11cb', letterSpacing: '0.5px' }}
                >
                    Settings
                </Typography>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        label="Current Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                    />
                    <TextField
                        label="New Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <TextField
                        label="Confirm New Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
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
                        Change Password
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default Settings;
