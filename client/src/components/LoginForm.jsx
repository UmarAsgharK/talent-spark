// src/components/LoginForm.jsx
import React, { useState, useContext } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Container,
    Divider,
    Alert,
    Paper,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const baseUrl = import.meta.env.VITE_API_URL;

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await login(email, password);
            console.log('Logged in user:', data.user);
            // Navigate based on user role
            const role = data.user.role;
            if (role === 'organizer') {
                navigate('/dashboard/organizer');
            } else if (role === 'judge') {
                navigate('/dashboard/judge');
            } else if (role === 'contestant') {
                navigate('/dashboard/contestant');
            } else if (role === 'admin') {
                navigate('/dashboard');
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = `${baseUrl}/api/auth/google`;
    };

    const handleFacebookLogin = () => {
        window.location.href = `${baseUrl}/api/auth/facebook`;
    };

    return (
        <Container maxWidth="sm" sx={{ fontFamily: 'Poppins, sans-serif' }}>
            <Paper
                elevation={4}
                sx={{
                    mt: 4,
                    p: 5,
                    background: '#fff',
                    borderRadius: '16px',
                    boxShadow: '0px 4px 15px rgba(0,0,0,0.1)',
                }}
            >
                <Box component="form" onSubmit={handleLogin}>
                    <Typography
                        variant="h4"
                        align="center"
                        gutterBottom
                        sx={{ fontWeight: 700, mb: 3, color: '#6a11cb' }}
                    >
                        Login
                    </Typography>
                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        sx={{ mb: 2 }}
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
                        sx={{ mb: 3 }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{
                            mt: 1,
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
                        Login
                    </Button>
                    <Divider sx={{ my: 3 }}>or</Divider>
                    <Button
                        variant="outlined"
                        fullWidth
                        startIcon={<GoogleIcon />}
                        onClick={handleGoogleLogin}
                        sx={{
                            mb: 2,
                            textTransform: 'none',
                            fontWeight: 500,
                            borderRadius: '8px',
                            py: 1.2,
                            borderColor: '#ff7eb3',
                            color: '#ff7eb3',
                            '&:hover': {
                                borderColor: '#ff758c',
                                color: '#ff758c',
                            },
                        }}
                    >
                        Login with Google
                    </Button>
                    <Button
                        variant="outlined"
                        fullWidth
                        startIcon={<FacebookIcon />}
                        onClick={handleFacebookLogin}
                        sx={{
                            textTransform: 'none',
                            fontWeight: 500,
                            borderRadius: '8px',
                            py: 1.2,
                            borderColor: '#4267B2',
                            color: '#4267B2',
                            '&:hover': {
                                borderColor: '#385898',
                                color: '#385898',
                            },
                        }}
                    >
                        Login with Facebook
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default LoginForm;
