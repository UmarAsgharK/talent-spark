import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const StyledCard = ({ title, description, backgroundColor, textColor }) => {
    return (
        <Card
            sx={{
                background: backgroundColor,
                color: textColor,
                borderRadius: '16px',
                boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0px 8px 30px rgba(0,0,0,0.2)',
                },
            }}
        >
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="body2">
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default StyledCard;
