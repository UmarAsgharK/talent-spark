// src/pages/dashboard/DashboardHome.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const DashboardHome = () => {
    const { user } = useContext(AuthContext);

    if (!user) {
        // You can add a loading indicator if needed.
        return null;
    }

    // Redirect based on the user's role.
    if (user.role === 'organizer') {
        return <Navigate to="/dashboard/organizer" replace />;
    } else if (user.role === 'judge') {
        return <Navigate to="/dashboard/judge" replace />;
    } else if (user.role === 'contestant') {
        return <Navigate to="/dashboard/contestant" replace />;
    } else if (user.role === 'admin') {
        // Admin can be directed to a general dashboard or a specific one.
        return <Navigate to="/dashboard" replace />;
    } else {
        // Fallback: default to contestant dashboard.
        return <Navigate to="/dashboard/contestant" replace />;
    }
};

export default DashboardHome;
