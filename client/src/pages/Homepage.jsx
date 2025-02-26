import React from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Grid,
    Card,
    CardContent,
    CardActions,
} from '@mui/material';
import { Link } from 'react-router-dom';
import heroImage from "../assets/noiseporn-JNuKyKXLh8U-unsplash.jpg";
import StyledCard from '../components/ui/StyledCard';
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import StarIcon from "@mui/icons-material/Star";
import GroupsIcon from "@mui/icons-material/Groups";

const HomePage = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                fontFamily: 'Poppins, sans-serif',
            }}
        >
            {/* Hero Section */}
            <Box
                sx={{
                    position: 'relative',
                    backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.45) 100%), url(${heroImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: { xs: '60vh', md: '80vh' },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Container sx={{ textAlign: 'center' }}>
                    <Typography
                        variant="h2"
                        component="h1"
                        gutterBottom
                        sx={{
                            fontWeight: 900,
                            color: '#fff',
                            textShadow: '2px 2px 10px rgba(0,0,0,0.9)',
                            mb: 2,
                            letterSpacing: '1px',
                        }}
                    >
                        Unleash Your Talent!
                    </Typography>
                    <Typography
                        variant="h5"
                        component="p"
                        gutterBottom
                        sx={{
                            fontWeight: 300,
                            color: '#f0f0f0',
                            textShadow: '1px 1px 8px rgba(0,0,0,0.8)',
                            mb: 4,
                        }}
                    >
                        Join the ultimate talent competition. Showcase your skills and shine on the big stage.
                    </Typography>
                    {/* Buttons: First row with two side-by-side, second row full-width */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 2,
                            width: { xs: '90%', sm: '500px' },
                            mx: 'auto',
                        }}
                    >
                        <Box sx={{ display: 'flex', width: '100%', gap: 2 }}>
                            <Button
                                component={Link}
                                to="/register"
                                variant="contained"
                                sx={{
                                    flex: 1,
                                    px: 4,
                                    py: 1.5,
                                    fontSize: '1.1rem',
                                    background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
                                    boxShadow: '0px 4px 12px rgba(0,0,0,0.4)',
                                    '&:hover': {
                                        background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
                                    },
                                }}
                            >
                                Register Now
                            </Button>
                            <Button
                                component={Link}
                                to="/login"
                                variant="contained"
                                sx={{
                                    flex: 1,
                                    px: 4,
                                    py: 1.5,
                                    fontSize: '1.1rem',
                                    background: 'linear-gradient(90deg, #ff416c 0%, #ff4b2b 100%)',
                                    boxShadow: '0px 4px 12px rgba(0,0,0,0.4)',
                                    '&:hover': {
                                        background: 'linear-gradient(90deg, #ff416c 0%, #ff4b2b 100%)',
                                    },
                                }}
                            >
                                Login
                            </Button>
                        </Box>
                        <Button
                            component={Link}
                            to="/competitions"
                            variant="contained"
                            fullWidth
                            sx={{
                                px: 4,
                                py: 1.5,
                                fontSize: '1.1rem',
                                background: 'linear-gradient(90deg, #00c6ff 0%, #0072ff 100%)',
                                boxShadow: '0px 4px 12px rgba(0,0,0,0.4)',
                                '&:hover': {
                                    background: 'linear-gradient(90deg, #00c6ff 0%, #0072ff 100%)',
                                },
                            }}
                        >
                            View All Competitions
                        </Button>
                    </Box>
                </Container>
            </Box>

            {/* How It Works Section */}
            <Container
                sx={{
                    py: 10,
                    background: 'linear-gradient(135deg, #1c1f26, #3e4551)',
                    color: '#fff',
                }}
            >
                <Typography
                    variant="h4"
                    component="h2"
                    align="center"
                    gutterBottom
                    sx={{ fontWeight: 800, mb: 4, letterSpacing: '0.5px' }}
                >
                    How It Works
                </Typography>
                <Grid container spacing={6}>
                    <Grid item xs={12} sm={4}>
                        <StyledCard
                            title="Step 1: Register"
                            description="Sign up and create your profile to get started."
                            backgroundColor="linear-gradient(135deg, #343a40 0%, #495057 100%)"
                            textColor="#fff"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <StyledCard
                            title="Step 2: Showcase Your Talent"
                            description="Upload your performance and tell us what makes you unique."
                            backgroundColor="linear-gradient(135deg, #6c757d 0%, #adb5bd 100%)"
                            textColor="#fff"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <StyledCard
                            title="Step 3: Get Judged"
                            description="Our panel of experts will review and score your performance."
                            backgroundColor="linear-gradient(135deg, #495057 0%, #343a40 100%)"
                            textColor="#fff"
                        />
                    </Grid>
                </Grid>
            </Container>

            {/* Benefits Section */}
            <Box
                sx={{
                    background: 'linear-gradient(135deg, #2b5876, #4e4376)',
                    py: 10,
                }}
            >
                <Container>
                    <Typography
                        variant="h4"
                        component="h2"
                        align="center"
                        gutterBottom
                        sx={{ fontWeight: 800, mb: 4, color: '#fff', letterSpacing: '0.5px' }}
                    >
                        Why Participate?
                    </Typography>
                    <Grid container spacing={6} justifyContent="center">
                        <Grid item xs={12} sm={4}>
                            <Card
                                sx={{
                                    background: 'linear-gradient(135deg, #1f1c2c 0%, #928dab 100%)',
                                    textAlign: 'center',
                                    p: 3,
                                    borderRadius: '16px',
                                    boxShadow: '0px 4px 12px rgba(0,0,0,0.3)',
                                }}
                            >
                                <CardContent>
                                    <EmojiEventsIcon sx={{ fontSize: 50, color: '#ff6f61' }} />
                                    <Typography variant="h6" sx={{ fontWeight: 700, mt: 2, color: '#fff' }}>
                                        Showcase Your Skills
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: '#ddd' }}>
                                        Gain exposure and take your talent to the next level.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Card
                                sx={{
                                    background: 'linear-gradient(135deg, #2d3436 0%, #636e72 100%)',
                                    textAlign: 'center',
                                    p: 3,
                                    borderRadius: '16px',
                                    boxShadow: '0px 4px 12px rgba(0,0,0,0.3)',
                                }}
                            >
                                <CardContent>
                                    <StarIcon sx={{ fontSize: 50, color: '#fdcb6e' }} />
                                    <Typography variant="h6" sx={{ fontWeight: 700, mt: 2, color: '#fff' }}>
                                        Win Exciting Prizes
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: '#ddd' }}>
                                        Compete for awards, recognition, and amazing opportunities.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Card
                                sx={{
                                    background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
                                    textAlign: 'center',
                                    p: 3,
                                    borderRadius: '16px',
                                    boxShadow: '0px 4px 12px rgba(0,0,0,0.3)',
                                }}
                            >
                                <CardContent>
                                    <GroupsIcon sx={{ fontSize: 50, color: '#00cec9' }} />
                                    <Typography variant="h6" sx={{ fontWeight: 700, mt: 2, color: '#fff' }}>
                                        Connect with Experts
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: '#ddd' }}>
                                        Get valuable feedback from industry professionals.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
};

export default HomePage;
