// src/pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Box,
    Avatar,
    Alert,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [profile, setProfile] = useState({ name: '', email: '', bio: '', avatar: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const baseUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        // Fetch user profile from API
        const fetchProfile = async () => {
            try {
                // Replace with your actual API call
                const response = await axios.get(`${baseUrl}/api/profile`);
                setProfile(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load profile');
                setLoading(false);
            }
        };

        fetchProfile();
    }, [baseUrl]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${baseUrl}/api/profile`, profile);
            setSuccess(response.data.message || 'Profile updated successfully!');
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Profile update failed. Please try again.');
            setSuccess('');
        }
    };

    if (loading) {
        return (
            <Container sx={{ py: 8, fontFamily: 'Poppins, sans-serif' }}>
                <Typography variant="h6" align="center">Loading profile...</Typography>
            </Container>
        );
    }

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
                    My Profile
                </Typography>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                    <Avatar sx={{ width: 100, height: 100 }} src={profile.avatar || '/default-avatar.png'} />
                </Box>
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        name="name"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={profile.name}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={profile.email}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Bio"
                        name="bio"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={profile.bio}
                        onChange={handleChange}
                        multiline
                        rows={3}
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
                        Update Profile
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default Profile;
