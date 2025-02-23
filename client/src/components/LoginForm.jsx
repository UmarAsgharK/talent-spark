// src/components/LoginForm.jsx
import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Divider, Alert } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Use the environment variable from Vite for the API base URL
    const baseUrl = import.meta.env.VITE_API_URL;

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${baseUrl}/api/auth/login`, { email, password });
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            console.log('Logged in user:', user);
            navigate('/');
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    const handleGoogleLogin = () => {
        // Redirect to your backend's Google OAuth endpoint using the dynamic base URL
        window.location.href = `${baseUrl}/api/auth/google`;
    };

    const handleFacebookLogin = () => {
        // Redirect to your backend's Facebook OAuth endpoint using the dynamic base URL
        window.location.href = `${baseUrl}/api/auth/facebook`;
    };

    return (
        <Container maxWidth="sm">
            <Box component="form" onSubmit={handleLogin} sx={{ mt: 4 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Login
                </Typography>
                {error && <Alert severity="error">{error}</Alert>}
                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Login
                </Button>

                <Divider sx={{ my: 3 }}>or</Divider>

                <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    startIcon={<GoogleIcon />}
                    onClick={handleGoogleLogin}
                    sx={{ mb: 2 }}
                >
                    Login with Google
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    startIcon={<FacebookIcon />}
                    onClick={handleFacebookLogin}
                >
                    Login with Facebook
                </Button>
            </Box>
        </Container>
    );
};

export default LoginForm;
