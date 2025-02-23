// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

function App() {
  return (
    <Router>
      <Container sx={{ marginTop: 4 }}>
        <Routes>
          <Route path="/" element={<div>Welcome to TalentSpark</div>} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="*" element={<div>404: Page Not Found</div>} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
