// src/components/PerformanceSubmission.jsx
import React, { useState, useContext } from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    Paper,
    Alert,
    Box,
} from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const PerformanceSubmission = () => {
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const { competitionId } = useParams();
    const baseUrl = import.meta.env.VITE_API_URL;
    const { user } = useContext(AuthContext); // Get current user from AuthContext

    // If user is not logged in, you might want to redirect
    if (!user) {
        return (
            <Container maxWidth="sm" sx={{ py: 8, fontFamily: 'Poppins, sans-serif' }}>
                <Alert severity="error">You must be logged in to submit a performance.</Alert>
            </Container>
        );
    }

    // Use the authenticated user's ID
    const contestant = user._id;

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Please select a performance file to upload.');
            return;
        }
        try {
            const formData = new FormData();
            formData.append('competition', competitionId);
            formData.append('contestant', contestant); // Use the actual user id
            formData.append('description', description);
            // Append file under the key "mediaUrl" to match the controller
            formData.append('mediaUrl', file);

            const response = await axios.post(`${baseUrl}/api/submissions`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true, // Ensure cookies are sent
            });
            setSuccess(response.data.message || 'Submission successful!');
            setError('');
            setTimeout(() => navigate('/dashboard/submissions'), 2000);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Submission failed. Please try again.');
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
                    background: '#fff',
                    boxShadow: '0px 4px 15px rgba(0,0,0,0.1)',
                }}
            >
                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                    sx={{ fontWeight: 700, mb: 3, color: '#6a11cb' }}
                >
                    Submit Your Performance
                </Typography>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
                <Box component="form" onSubmit={handleSubmit}>
                    <Typography variant="subtitle1" sx={{ mb: 2 }}>
                        Competition ID: {competitionId}
                    </Typography>
                    <TextField
                        label="Description"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        multiline
                        rows={3}
                        sx={{ mb: 3 }}
                    />
                    <Button
                        variant="contained"
                        component="label"
                        sx={{
                            mt: 1,
                            textTransform: 'none',
                            fontWeight: 500,
                            borderRadius: '8px',
                            py: 1.2,
                            background: 'linear-gradient(90deg, #ff416c 0%, #ff4b2b 100%)',
                            boxShadow: '0px 4px 12px rgba(0,0,0,0.3)',
                            '&:hover': {
                                background: 'linear-gradient(90deg, #ff4b2b 0%, #ff416c 100%)',
                            },
                        }}
                    >
                        Choose File
                        <input type="file" hidden onChange={handleFileChange} />
                    </Button>
                    {file && (
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            Selected file: {file.name}
                        </Typography>
                    )}
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
                        Submit Performance
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default PerformanceSubmission;
