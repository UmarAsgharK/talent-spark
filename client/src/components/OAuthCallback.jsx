// src/components/OAuthCallback.jsx
import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import { CircularProgress, Box } from '@mui/material';

const OAuthCallback = () => {
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const baseUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Call your endpoint to fetch the current user info (using cookies)
                const response = await axios.get(`${baseUrl}/api/users/me`, { withCredentials: true });
                const user = response.data;
                // Save the user to localStorage and update AuthContext
                localStorage.setItem('user', JSON.stringify(user));
                setUser(user);
                // Navigate based on role
                if (user.role === 'organizer') {
                    navigate('/dashboard/organizer');
                } else if (user.role === 'judge') {
                    navigate('/dashboard/judge');
                } else if (user.role === 'contestant') {
                    navigate('/dashboard/contestant');
                } else if (user.role === 'admin') {
                    navigate('/dashboard');
                } else {
                    navigate('/dashboard');
                }
            } catch (err) {
                console.error(err);
                navigate('/login'); // fallback to login on error
            }
        };
        fetchUser();
    }, [navigate, setUser, baseUrl]);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
        </Box>
    );
};

export default OAuthCallback;
