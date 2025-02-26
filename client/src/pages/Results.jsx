import React, { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';

const Results = () => {
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchResults = async () => {
            const sampleResults = [
                { rank: 1, name: 'Alice Johnson', score: 95 },
                { rank: 2, name: 'Bob Smith', score: 90 },
                { rank: 3, name: 'Charlie Brown', score: 88 },
            ];
            setResults(sampleResults);
        };

        fetchResults();
    }, []);

    return (
        <Container sx={{ py: 8, fontFamily: 'Poppins, sans-serif' }}>
            <Typography
                variant="h4"
                component="h2"
                align="center"
                gutterBottom
                sx={{
                    fontWeight: 800,
                    color: '#6a11cb',
                    mb: 6,
                    letterSpacing: '0.5px',
                }}
            >
                Competition Results
            </Typography>
            <TableContainer
                component={Paper}
                sx={{
                    borderRadius: '16px',
                    boxShadow: '0px 4px 20px rgba(0,0,0,0.15)',
                    overflowX: 'auto',
                    background: 'linear-gradient(135deg, #ffffff, #f8f9fa)',
                }}
            >
                <Table>
                    <TableHead
                        sx={{
                            background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
                        }}
                    >
                        <TableRow>
                            <TableCell
                                align="center"
                                sx={{ color: '#fff', fontWeight: 600, fontSize: '1rem' }}
                            >
                                Rank
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{ color: '#fff', fontWeight: 600, fontSize: '1rem' }}
                            >
                                Contestant
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{ color: '#fff', fontWeight: 600, fontSize: '1rem' }}
                            >
                                Score
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {results.map((row) => (
                            <TableRow
                                key={row.rank}
                                sx={{
                                    '&:hover': { backgroundColor: 'rgba(0,0,0,0.08)' },
                                }}
                            >
                                <TableCell align="center" sx={{ fontWeight: 500, fontSize: '0.95rem' }}>
                                    {row.rank}
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: 500, fontSize: '0.95rem' }}>
                                    {row.name}
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: 500, fontSize: '0.95rem' }}>
                                    {row.score}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default Results;
