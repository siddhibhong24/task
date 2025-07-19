import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Divider,
  Container,
} from '@mui/material';
import Navbar from '../components/navbar';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const StoreOwnerDashboard = () => {
  const [ref, inView] = useInView({ triggerOnce: true });

  // Dummy ratings (Maharashtra users)
  const dummyRatings = [
    {
      id: 1,
      name: 'Rohit Pawar',
      email: 'rohit.pawar@example.com',
      location: 'Pune, Maharashtra, India',
      rating: 4.5,
    },
    {
      id: 2,
      name: 'Sneha Patil',
      email: 'sneha.patil@example.com',
      location: 'Nagpur, Maharashtra, India',
      rating: 4.0,
    },
    {
      id: 3,
      name: 'Amit Deshmukh',
      email: 'amit.deshmukh@example.com',
      location: 'Nashik, Maharashtra, India',
      rating: 5.0,
    },
    {
      id: 4,
      name: 'Pooja More',
      email: 'pooja.more@example.com',
      location: 'Kolhapur, Maharashtra, India',
      rating: 3.5,
    },
  ];

  const averageRating =
    dummyRatings.reduce((sum, user) => sum + user.rating, 0) /
    dummyRatings.length;

  return (
    <>
      <Box sx={{ mt: 3 }}> {/* Top margin above navbar */}
        <Navbar />
      </Box>

      <Container maxWidth="lg" sx={{ py: 5 }}>
        {/* Centered Title */}
        <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
          Store Rating System
        </Typography>

        {/* Descriptive content */}
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
          Welcome to your store management panel. Here you can track user feedback, view store ratings, and monitor performance in one glance.
        </Typography>

        {/* Summary Cards */}
        <Grid container spacing={4} justifyContent="center" ref={ref}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={4} sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
              <Typography variant="h6" gutterBottom fontWeight="500">
                Total Ratings
              </Typography>
              <Typography variant="h4" color="primary">
                {inView && <CountUp end={dummyRatings.length} duration={1.5} />}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={4} sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
              <Typography variant="h6" gutterBottom fontWeight="500">
                Average Rating
              </Typography>
              <Typography variant="h4" color="secondary">
                {inView && <CountUp end={averageRating} decimals={1} duration={1.5} />}
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Ratings Table */}
        <Box mt={8}>
          <Typography variant="h5" gutterBottom>
            ⭐ Users Who Rated Your Store
          </Typography>

          <Paper elevation={3} sx={{ mt: 2, borderRadius: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Email</strong></TableCell>
                  <TableCell><strong>Location</strong></TableCell>
                  <TableCell><strong>Rating</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dummyRatings.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.location}</TableCell>
                    <TableCell>{user.rating} ⭐</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
          <Box component="footer" sx={{ py: 2, textAlign: 'center', borderTop: '1px solid #ccc' }}>
            <Typography variant="body2" color="textSecondary">
              © 2025 Store Rating System | Made with by Siddhi
            </Typography>
          </Box>
        </Box>
        
      </Container>
    </>
  );
};

export default StoreOwnerDashboard;
