import {
  Box,
  Button,
  TextField,
  Typography,
  Link as MuiLink,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'; 

const LoginForm = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/login', values);
        const { token, user } = response.data; 
        const { role } = user; 

        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        setUser({ token, role });

        if (role === 'admin') navigate('/admin');
        else if (role === 'store_owner') navigate('/store');
        else navigate('/user');
      } catch (error) {
        const message =
          error.response?.data?.message || 'Login failed. Please try again.';
        setErrors({ email: message });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: '60px auto',
        padding: 4,
        borderRadius: 2,
        boxShadow: 4,
        backgroundColor: '#fff',
      }}
    >
      <Typography variant="h4" mb={2} textAlign="center">
        Login
      </Typography>
      <form onSubmit={formik.handleSubmit}>
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
          placeholder="Enter your password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 3 }}
          disabled={formik.isSubmitting}
        >
          Login
        </Button>
      </form>

      <Typography mt={2} textAlign="center">
        Don’t have an account?{' '}
        <MuiLink component={Link} to="/signup">
          Sign up here
        </MuiLink>
      </Typography>
    </Box>
  );
};

export default LoginForm;
