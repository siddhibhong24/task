import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  TextField,
  Rating,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Container,
} from '@mui/material';
import Navbar from '../components/navbar';

const UserDashboard = () => {
  const dummyStores = [
    {
      id: 2,
      name: 'Patil Supermarket',
      address: 'Shivaji Nagar, Nagpur, Maharashtra',
      image: 'https://gdb.voanews.com/c5640868-6a17-43b2-8cce-78555d7bedd2_w408_r1_s.jpg',
      overallRating: 3.8,
      userRating: null,
    },
    {
      id: 3,
      name: 'Deshmukh Veggies',
      address: 'Gandhi Chowk, Nashik, Maharashtra',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWI3ZJIdznwYhrzk56yOVXczH6_laCeer4nw&s',
      overallRating: 4.5,
      userRating: null,
    },
    {
      id: 4,
      name: 'More Grocery',
      address: 'Main Bazar, Kolhapur, Maharashtra',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1GYrriy2joHoRhppBuETbGtdPZvYqy5KYGA&s',
      overallRating: 4.0,
      userRating: null,
    },
    {
      id: 1,
      name: 'Shree Electronics',
      address: 'MG Road, Pune, Maharashtra',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRva7XMJUhLRrRAiwMsX1MHL7X03ndlNiHRWA&s',
      overallRating: 4.2,
      userRating: null,
    },
    {
      id: 5,
      name: 'Apna Bazar',
      address: 'Dadar West, Mumbai, Maharashtra',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsrt2TJvTPRWFJUzp7saEtrz0ng7Ofcd--uw&s',
      overallRating: 4.1,
      userRating: null,
    },
    {
      id: 6,
      name: 'Khandelwal Textiles',
      address: 'Laxmi Road, Pune, Maharashtra',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeBKwVG9zggcr3MWT7L18qZIo8SWPdGbzIww&s',
      overallRating: 3.9,
      userRating: null,
    },
  ];

  const [stores, setStores] = useState(dummyStores);
  const [searchTerm, setSearchTerm] = useState('');

  const handleRatingChange = (storeId, newRating) => {
    setStores((prevStores) =>
      prevStores.map((store) =>
        store.id === storeId ? { ...store, userRating: newRating } : store
      )
    );
  };

  const filteredStores = stores.filter(
    (store) =>
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Box sx={{ mt: 4 }}>
        <Navbar />
      </Box>

      <Container sx={{ py: 5 }}>
        <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
          Store Rating System
        </Typography>

        <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
          Browse and rate local Maharashtra stores.
        </Typography>

        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <TextField
            label="Search by name or address"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: '50%' }}
          />
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {filteredStores.map((store) => (
            <Grid item xs={12} sm={6} md={4} key={store.id}>
              <Card
                elevation={4}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                  minWidth: '300px',
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={store.image}
                  alt={store.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight="bold">
                    {store.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {store.address}
                  </Typography>
                  <Box mt={2}>
                    <Typography variant="body2" fontWeight={500}>
                      Overall Rating: {store.overallRating} ⭐
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Your Rating:
                    </Typography>
                    <Rating
                      value={store.userRating || 0}
                      onChange={(_, newValue) =>
                        handleRatingChange(store.id, newValue)
                      }
                      precision={1}
                    />
                  </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', px: 2, pb: 2 }}>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() =>
                      alert(`Rating submitted: ${store.userRating || 'None'} ⭐`)
                    }
                    disabled={!store.userRating}
                  >
                    {store.userRating ? 'Update Rating' : 'Submit Rating'}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        
      </Container>
      <Box component="footer" sx={{ py: 2, textAlign: 'center', borderTop: '1px solid #ccc' }}>
                  <Typography variant="body2" color="textSecondary">
                    © 2025 Store Rating System | Made with by Siddhi
                  </Typography>
                </Box>
    </>
  );
};

export default UserDashboard;
