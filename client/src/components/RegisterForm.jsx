import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Container,
    Alert,
    Paper,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const baseUrl = import.meta.env.VITE_API_URL;

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            const response = await axios.post(`${baseUrl}/api/auth/register`, {
                name,
                email,
                password,
            });
            setSuccess(response.data.message || 'Registration successful!');
            setError('');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
            setSuccess('');
        }
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
                <Box component="form" onSubmit={handleRegister}>
                    <Typography
                        variant="h4"
                        align="center"
                        gutterBottom
                        sx={{ fontWeight: 700, mb: 3, color: '#6a11cb' }}
                    >
                        Register
                    </Typography>
                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                    {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
                    <TextField
                        label="Name"
                        type="text"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        sx={{ mb: 2 }}
                    />
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
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Confirm Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                        Register
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default RegisterForm;
