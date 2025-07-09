import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box, Grid, Typography, FormControl, InputLabel, OutlinedInput,
  InputAdornment, IconButton, Checkbox, FormControlLabel, Button
} from '@mui/material';

import AnimateButton from 'ui-component/extended/AnimateButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import api from '../../../api/axios'; // ✅ import your axios instance

export default function AuthRegister() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleRegister = async (e) => {
    e.preventDefault(); 

    try {
      const response = await api.post('/auth/register', { name, email, password });
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      navigate('/dashboard'); // ✅ or wherever you want to redirect
    } catch (err) {
      console.error('Registration failed:', err.response?.data || err.message);
      // optionally: show error to user
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="name">Full Name</InputLabel>
        <OutlinedInput
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Full Name"
          required
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="email">Email Address</InputLabel>
        <OutlinedInput
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email Address"
          required
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="password">Password</InputLabel>
        <OutlinedInput
          id="password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          required
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      {/* <FormControlLabel
        control={<Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} />}
        label={
          <Typography variant="body2">
            Agree to <Link to="#">Terms & Conditions</Link>
          </Typography>
        }
        sx={{ mt: 2 }}
      /> */}

      <Box sx={{ mt: 2 }}>
        <AnimateButton>
          <Button fullWidth type="submit" variant="contained" color="secondary">
            Sign up
          </Button>
        </AnimateButton>
      </Box>
    </form>
  );
}
