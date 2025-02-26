// src/components/common/DashboardLayout.jsx
import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import CompetitionWidget from './CompetitionWidget';

const DashboardLayout = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                minHeight: '100vh',
                background: 'linear-gradient(90deg, #f7f9fc 0%, #e0e6ed 100%)',
                fontFamily: 'Poppins, sans-serif',
            }}
        >
            <Sidebar />
            <Box
                sx={{
                    flexGrow: 1,
                    p: 3,
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0px 2px 10px rgba(0,0,0,0.1)',
                    m: 2,
                    minHeight: 'calc(100vh - 40px)',
                }}
            >
                {/* Main dashboard content */}
                <Outlet />

                {/* Competition Widget at the bottom (example) */}
                {/* <CompetitionWidget /> */}
            </Box>
        </Box>
    );
};

export default DashboardLayout;
