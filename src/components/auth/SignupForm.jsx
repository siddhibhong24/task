import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Link as MuiLink,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'; 

const SignupForm = () => {
  const navigate = useNavigate(); 
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      address: '',
      role: 'user',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Full Name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
      address: Yup.string().required('Address is required'),
      role: Yup.string().required('Role is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/register', values);
        alert('Registered successfully!');
        resetForm();
        navigate('/login'); 
      } catch (error) {
        const errMsg = error.response?.data?.message || 'Registration failed';
        alert(errMsg);
      }
    },
  });

  return (
    <Box
      sx={{
        maxWidth: 450,
        margin: '60px auto',
        padding: 4,
        borderRadius: 2,
        boxShadow: 4,
        backgroundColor: '#fff',
      }}
    >
      <Typography variant="h4" mb={2} textAlign="center">
        Sign Up
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Full Name"
          placeholder="Enter your full name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email Address"
          placeholder="Enter your email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          margin="normal"
          type="password"
          label="Password"
          placeholder="Enter a strong password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Address"
          placeholder="Enter your address"
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={formik.touched.address && formik.errors.address}
        />
        <TextField
          fullWidth
          margin="normal"
          select
          label="Role"
          name="role"
          value={formik.values.role}
          onChange={formik.handleChange}
          error={formik.touched.role && Boolean(formik.errors.role)}
          helperText={formik.touched.role && formik.errors.role}
        >
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="store_owner">Store Owner</MenuItem>
        </TextField>

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
          Sign Up
        </Button>
      </form>

      <Typography mt={2} textAlign="center">
        Already have an account?{' '}
        <MuiLink component={Link} to="/login">
          Login here
        </MuiLink>
      </Typography>
    </Box>
  );
};

export default SignupForm;
