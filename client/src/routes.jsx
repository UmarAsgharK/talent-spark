// src/AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import DashboardLayout from './components/common/DashboardLayout';
import ContestantDashboard from './pages/dashboard/contestantDashboard.jsx';
import JudgeDashboard from './pages/dashboard/judgeDashboard.jsx';
import OrganizerDashboard from './pages/dashboard/organizerDashboard.jsx';
import DashboardHome from './pages/dashboard/DashboardHome.jsx';
import CompetitionList from './pages/CompetitionList.jsx';
import CompetitionDetail from './pages/CompetitionDetail.jsx';
import PerformanceSubmission from './pages/PerformanceSubmission.jsx';
import MySubmissions from './pages/dashboard/MySubmissions.jsx';
import Results from './pages/Results.jsx';
import CompetitionForm from './components/forms/CompetitionForm.jsx';
import UpdateCompetition from './components/forms/UpdateCompetition.jsx';
import ProtectedRoute from './components/ProtectedRoute';
import RoleProtectedRoute from './components/RoleProtectedRoute';
import OAuthCallback from './components/OAuthCallback';

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/competitions" element={<CompetitionList />} />
        <Route path="/competitions/:id" element={<CompetitionDetail />} />
        <Route
            path="/submit-performance/:competitionId"
            element={
                <ProtectedRoute>
                    <PerformanceSubmission />
                </ProtectedRoute>
            }
        />
        <Route path="/results" element={<Results />} />
        {/* OAuth Callback route */}
        <Route path="/auth/oauth/callback" element={<OAuthCallback />} />
        {/* Dashboard Routes */}
        <Route
            path="/dashboard"
            element={
                <ProtectedRoute>
                    <DashboardLayout />
                </ProtectedRoute>
            }
        >
            <Route index element={<DashboardHome />} />
            <Route path="contestant" element={<ContestantDashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="submissions">
                <Route index element={<MySubmissions />} />
            </Route>
            <Route
                path="judge"
                element={
                    <RoleProtectedRoute allowedRoles={['judge', 'admin']}>
                        <JudgeDashboard />
                    </RoleProtectedRoute>
                }
            />
            <Route
                path="organizer"
                element={
                    <RoleProtectedRoute allowedRoles={['organizer', 'admin']}>
                        <OrganizerDashboard />
                    </RoleProtectedRoute>
                }
            >
                <Route path="competitions">
                    <Route path="new" element={<CompetitionForm />} />
                    <Route path=":id/edit" element={<CompetitionForm />} />
                    <Route path="update/:id" element={<UpdateCompetition />} />
                </Route>
            </Route>
        </Route>
        {/* Optionally add a catch-all NotFound route */}
        {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
);

export default AppRoutes;
