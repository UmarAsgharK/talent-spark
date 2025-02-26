// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const baseUrl = import.meta.env.VITE_API_URL;

    // Helper: fetch current user info from backend (requires an endpoint like /api/users/me)
    const fetchCurrentUser = async () => {
        try {
            const response = await axios.get(`${baseUrl}/api/users/me`, {
                withCredentials: true,
            });
            setUser(response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
        } catch (error) {
            console.error('Failed to fetch current user:', error);
            setUser(null);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        }
    };

    // On mount, try to load user info from localStorage and optionally refresh it from backend
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            // Uncomment the next line to always refresh the user info from the backend:
            // fetchCurrentUser();
        }
    }, [baseUrl]);

    const login = async (email, password) => {
        try {
            const response = await axios.post(
                `${baseUrl}/api/auth/login`,
                { email, password },
                { withCredentials: true }
            );
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            // Call logout endpoint if available (ensures cookies are cleared on the server too)
            await axios.post(`${baseUrl}/api/auth/logout`, {}, { withCredentials: true });
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, fetchCurrentUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
