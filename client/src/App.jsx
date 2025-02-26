// src/App.jsx
import React from 'react';
import { Container, GlobalStyles, Box } from '@mui/material';
import AppRoutes from './routes';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

function App() {
  return (
    <>
      <GlobalStyles
        styles={{
          body: {
            margin: 0,
            padding: 0,
            backgroundColor: '#444',
            backgroundImage: 'url("https://www.transparenttextures.com/patterns/axiom-pattern.png")',
            backgroundRepeat: 'repeat',
            minHeight: '100vh',
          },
          '#root': {
            minHeight: '100vh',
          },
        }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Header />
        {/* Main content area */}
        <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
          <Container>
            <AppRoutes />
          </Container>
        </Box>
        <Footer />
      </Box>
    </>
  );
}

export default App;
