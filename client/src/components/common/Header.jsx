// src/components/common/Header.jsx
import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const Header = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <AppBar
            position="static"
            sx={{
                background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
                boxShadow: '0px 2px 10px rgba(0,0,0,0.2)',
            }}
        >
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
                    TalentSpark
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button color="inherit" component={Link} to="/" sx={{ textTransform: 'none' }}>
                        Home
                    </Button>
                    {user ? (
                        <>
                            <Button color="inherit" component={Link} to="/dashboard" sx={{ textTransform: 'none' }}>
                                Dashboard
                            </Button>
                            <Button color="inherit" onClick={handleLogout} sx={{ textTransform: 'none' }}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" component={Link} to="/login" sx={{ textTransform: 'none' }}>
                                Login
                            </Button>
                            <Button color="inherit" component={Link} to="/register" sx={{ textTransform: 'none' }}>
                                Register
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
