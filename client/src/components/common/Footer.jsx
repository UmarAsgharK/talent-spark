// src/components/common/Footer.jsx
import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box
            sx={{
                backgroundColor: '#222',
                color: '#ccc',
                py: 2,
                mt: 4,
                borderTop: '1px solid #444',
            }}
        >
            <Container maxWidth="lg">
                <Typography variant="body2" align="center">
                    © {new Date().getFullYear()} TalentSpark. All rights reserved.
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;
