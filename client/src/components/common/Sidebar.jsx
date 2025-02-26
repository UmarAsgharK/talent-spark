// src/components/common/Sidebar.jsx
import React, { useContext } from 'react';
import { Box, List, ListItem, ListItemButton, ListItemText, Typography, Divider } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import SettingsIcon from '@mui/icons-material/Settings';
import { AuthContext } from '../../contexts/AuthContext';

const Sidebar = () => {
    const location = useLocation();
    const { user } = useContext(AuthContext);

    // Determine the dashboard item based on the user's role.
    let dashboardItem = null;
    if (user) {
        if (user.role === 'contestant') {
            dashboardItem = {
                text: 'Contestant Dashboard',
                to: '/dashboard',
                icon: <DashboardIcon sx={{ mr: 1, fontSize: '1.2rem' }} />,
            };
        } else if (user.role === 'judge') {
            dashboardItem = {
                text: 'Judge Dashboard',
                to: '/dashboard/judge',
                icon: <DashboardIcon sx={{ mr: 1, fontSize: '1.2rem' }} />,
            };
        } else if (user.role === 'organizer') {
            dashboardItem = {
                text: 'Organizer Dashboard',
                to: '/dashboard/organizer',
                icon: <DashboardIcon sx={{ mr: 1, fontSize: '1.2rem' }} />,
            };
        } else if (user.role === 'admin') {
            dashboardItem = {
                text: 'Admin Dashboard',
                to: '/dashboard',
                icon: <DashboardIcon sx={{ mr: 1, fontSize: '1.2rem' }} />,
            };
        }
    }

    // Common menu items: Competitions, Profile, Settings.
    const commonMenuItems = [
        { text: 'Competitions', to: '/competitions', icon: <EventIcon sx={{ mr: 1, fontSize: '1.2rem' }} /> },
        { text: 'Profile', to: '/dashboard/profile', icon: <PersonIcon sx={{ mr: 1, fontSize: '1.2rem' }} /> },
        { text: 'Settings', to: '/dashboard/settings', icon: <SettingsIcon sx={{ mr: 1, fontSize: '1.2rem' }} /> },
    ];

    // Build final menu list.
    const menuItems = dashboardItem ? [dashboardItem, ...commonMenuItems] : commonMenuItems;

    return (
        <Box
            sx={{
                width: 280,
                background: 'linear-gradient(180deg, #6a11cb 0%, #2575fc 100%)',
                minHeight: '100vh',
                color: '#fff',
                p: 2,
                boxShadow: '2px 0 8px rgba(0,0,0,0.15)',
            }}
        >
            {/* Sidebar Header */}
            <Box sx={{ mb: 3, textAlign: 'center' }}>
                <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: '1px' }}>
                    TalentSpark
                </Typography>
                <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.5)', mt: 1 }} />
            </Box>
            {/* Sidebar Menu Items */}
            <List>
                {menuItems.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton
                            component={Link}
                            to={item.to}
                            sx={{
                                borderRadius: '8px',
                                transition: 'background 0.3s',
                                backgroundColor: location.pathname === item.to ? 'rgba(255,255,255,0.25)' : 'transparent',
                                '&:hover': {
                                    backgroundColor: 'rgba(255,255,255,0.35)',
                                },
                                color: '#fff',
                                mb: 1,
                                py: 1,
                            }}
                        >
                            {item.icon}
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default Sidebar;
