import React, { useState } from 'react';
import Navbar from '../components/navbar'; 
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Modal,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const dummyUsers = [
  { name: 'Suresh Patil', email: 'suresh.patil@pune.com', address: 'Shivaji Nagar, Pune', role: 'admin' },
  { name: 'Meera Joshi', email: 'meera.joshi@nagpur.com', address: 'Dharampeth, Nagpur', role: 'normal' },
  { name: 'Rajesh Shinde', email: 'rajesh.shinde@kolhapur.com', address: 'Tarabai Road, Kolhapur', role: 'store_owner' },
  { name: 'Asha Deshmukh', email: 'asha.deshmukh@nashik.com', address: 'Gangapur Road, Nashik', role: 'normal' },
  { name: 'Amol Jadhav', email: 'amol.jadhav@thane.com', address: 'Ghodbunder Road, Thane', role: 'admin' },
  { name: 'Sneha Kale', email: 'sneha.kale@solapur.com', address: 'Mangalwar Peth, Solapur', role: 'store_owner' },
  { name: 'Vikas Pawar', email: 'vikas.pawar@aurangabad.com', address: 'CIDCO, Aurangabad', role: 'normal' },
  { name: 'Prachi Bhosale', email: 'prachi.bhosale@satara.com', address: 'Rajwada, Satara', role: 'admin' },
  { name: 'Nilesh Gaikwad', email: 'nilesh.gaikwad@nanded.com', address: 'Vazirabad, Nanded', role: 'store_owner' },
  { name: 'Shraddha More', email: 'shraddha.more@nagpur.com', address: 'Sitabuldi, Nagpur', role: 'normal' },
];


const dummyStores = [
  { name: 'Pune Supermart', email: 'contact@punesupermart.com', address: 'JM Road, Pune', rating: 4.5 },
  { name: 'Nagpur Electronics', email: 'support@nagpurelectronics.com', address: 'Itwari Market, Nagpur', rating: 4.0 },
  { name: 'Kolhapur Kirana', email: 'sales@kolhapurkirana.com', address: 'Shahu Market, Kolhapur', rating: 3.7 },
  { name: 'Nashik Fresh', email: 'info@nashikfresh.com', address: 'Canada Corner, Nashik', rating: 4.3 },
  { name: 'Thane Mega Store', email: 'contact@thanestore.com', address: 'Viviana Mall, Thane', rating: 4.1 },
  { name: 'Solapur Daily Needs', email: 'help@solapurdaily.com', address: 'Hotgi Road, Solapur', rating: 3.9 },
  { name: 'Aurangabad Bazar', email: 'aurangabad@bazar.com', address: 'Prozone Mall, Aurangabad', rating: 4.2 },
  { name: 'Satara Spices', email: 'info@sataraspices.com', address: 'Main Market, Satara', rating: 3.8 },
  { name: 'Nanded Mart', email: 'nanded@mart.com', address: 'Shivaji Chowk, Nanded', rating: 4.0 },
  { name: 'Nagpur Grocery Hub', email: 'grocery@nagpurhub.com', address: 'Dharampeth Extension, Nagpur', rating: 4.4 },
];


export default function AdminDashboard() {
  const [openUserModal, setOpenUserModal] = useState(false);
  const [openStoreModal, setOpenStoreModal] = useState(false);
  const [users, setUsers] = useState(dummyUsers);
  const [stores] = useState(dummyStores);
  const [filterText, setFilterText] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [ref, inView] = useInView({
  triggerOnce: true,
  threshold: 0.3,
});
  const formikUser = useFormik({
    initialValues: { name: '', email: '', password: '', address: '', role: '' },
    validationSchema: Yup.object({
      name: Yup.string().min(3).max(60).required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(8).max(16).required(),
      address: Yup.string().max(400).required(),
      role: Yup.string().oneOf(['admin', 'normal', 'store_owner']).required(),
    }),
    onSubmit: (values) => {
      setUsers([...users, values]);
      setOpenUserModal(false);
      formikUser.resetForm();
    },
  });

  return (
    <Box p={4} fontFamily="'Segoe UI', sans-serif"  minHeight="100vh">
      <Navbar /> 
        <Typography variant="h3" fontWeight="bold" textAlign="center" mb={3}>
        Store Rating System
      </Typography>
      <Typography variant="subtitle1" textAlign="center" mb={10} color="textSecondary">
        Manage users, stores, and performance ratings from a single interface.
      </Typography>

      {/* Summary Cards */}
      <Grid container justifyContent="center" spacing={4} mb={10} ref={ref}>
        <Grid item xs={12} sm={6} md={3}>
  <Paper elevation={4} sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
    <Typography variant="h6" gutterBottom fontWeight="500">Total Users</Typography>
    <Typography variant="h4" color="primary">
      {inView ? <CountUp end={users.length} duration={1} /> : users.length}
    </Typography>
  </Paper>
</Grid>

        <Grid item xs={12} sm={6} md={3}>
    <Paper elevation={4} sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
      <Typography variant="h6" gutterBottom fontWeight="500">Total Stores</Typography>
      <Typography variant="h4" color="secondary">
        {inView ? <CountUp end={stores.length} duration={1} /> : stores.length}
      </Typography>
    </Paper>
  </Grid>
         <Grid item xs={12} sm={6} md={3}>
    <Paper elevation={4} sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
      <Typography variant="h6" gutterBottom fontWeight="500">Total Ratings</Typography>
      <Typography variant="h4" color="success.main">
        {inView ? <CountUp end={24} duration={1} /> : 24}
      </Typography>
    </Paper>
  </Grid>
      </Grid>

      {/* Action Buttons */}
      <Box mb={15} mt={2} textAlign="center">
        <Button variant="contained" color="primary" onClick={() => setOpenUserModal(true)} sx={{ mr: 2 }}>
          + Add User
        </Button>
        <Button variant="contained" color="secondary" onClick={() => setOpenStoreModal(true)}>
          + Add Store
        </Button>
      </Box>

      {/* Filters */}
      <Box display="flex" gap={2} mb={4} mt={2} alignItems="center">
        <TextField
          label="Search by name/email/address"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          sx={{ minWidth: 300 }}
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Filter </InputLabel>
          <Select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="normal">User</MenuItem>
            <MenuItem value="store_owner">Store Owner</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Users Table */}
      <Typography variant="h5" mt={10} mb={3}>User Management</Typography>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#a6d3fbff' }}>
            <TableCell>No</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users
            .filter(u => [u.name, u.email, u.address].some(val => val.toLowerCase().includes(filterText.toLowerCase())))
            .filter(u => !roleFilter || u.role === roleFilter)
            .map((u, i) => (
              <TableRow key={i}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.address}</TableCell>
                <TableCell>{u.role}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {/* Stores Table */}
      <Typography variant="h5" mt={6} mb={3}>Stores Overview</Typography>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#e0b2f8ff' }}>
            <TableCell>No</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stores
            .filter(s => [s.name, s.email, s.address].some(val => val.toLowerCase().includes(filterText.toLowerCase())))
            .map((s, i) => (
              <TableRow key={i}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{s.name}</TableCell>
                <TableCell>{s.email}</TableCell>
                <TableCell>{s.address}</TableCell>
                <TableCell>{s.rating}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {/* Add User Modal */}
      <Modal open={openUserModal} onClose={() => setOpenUserModal(false)}>
        <Box sx={{ p: 4, backgroundColor: 'white', maxWidth: 400, m: '100px auto', borderRadius: 2 }}>
          <Typography variant="h6" mb={2}>Register New User</Typography>
          <form onSubmit={formikUser.handleSubmit}>
            <TextField fullWidth label="Name" name="name" value={formikUser.values.name} onChange={formikUser.handleChange} error={formikUser.touched.name && Boolean(formikUser.errors.name)} helperText={formikUser.touched.name && formikUser.errors.name} margin="normal" />
            <TextField fullWidth label="Email" name="email" value={formikUser.values.email} onChange={formikUser.handleChange} error={formikUser.touched.email && Boolean(formikUser.errors.email)} helperText={formikUser.touched.email && formikUser.errors.email} margin="normal" />
            <TextField fullWidth label="Password" name="password" type="password" value={formikUser.values.password} onChange={formikUser.handleChange} error={formikUser.touched.password && Boolean(formikUser.errors.password)} helperText={formikUser.touched.password && formikUser.errors.password} margin="normal" />
            <TextField fullWidth label="Address" name="address" value={formikUser.values.address} onChange={formikUser.handleChange} error={formikUser.touched.address && Boolean(formikUser.errors.address)} helperText={formikUser.touched.address && formikUser.errors.address} margin="normal" />
            <FormControl fullWidth margin="normal">
              <InputLabel>Role</InputLabel>
              <Select name="role" value={formikUser.values.role} onChange={formikUser.handleChange}>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="normal">Normal</MenuItem>
                <MenuItem value="store_owner">Store Owner</MenuItem>
              </Select>
            </FormControl>
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Submit</Button>
          </form>
        </Box>
      </Modal>

      {/* Add Store Modal */}
      <Modal open={openStoreModal} onClose={() => setOpenStoreModal(false)}>
        <Box sx={{ p: 4, backgroundColor: 'white', maxWidth: 400, m: '100px auto', borderRadius: 2 }}>
          <Typography variant="h6" mb={2}>Add New Store</Typography>
          <TextField fullWidth label="Name" margin="normal" />
          <TextField fullWidth label="Email" margin="normal" />
          <TextField fullWidth label="Address" margin="normal" />
          <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={() => setOpenStoreModal(false)}>Submit</Button>
        </Box>
      </Modal>
      <Box component="footer" sx={{ py: 2, textAlign: 'center', borderTop: '1px solid #ccc' }}>
  <Typography variant="body2" color="textSecondary">
    © 2025 Store Rating System | Made with by Siddhi
  </Typography>
</Box>

    </Box>
    
  );
}
