import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  Box
} from '@mui/material';

import AnimateButton from 'ui-component/extended/AnimateButton';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import api from '../../../api/axios'; // ✅ Update this path if needed

export default function AuthLogin() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [checked, setChecked] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  // ✅ Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post('/auth/login', { email, password });
      const { user, token } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ ...user, token }));

      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed:', err?.response?.data || err.message);
      alert('Invalid email or password');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
        <InputLabel htmlFor="outlined-adornment-email-login">Email</InputLabel>
        <OutlinedInput
          id="outlined-adornment-email-login"
          type="email"
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
        />
      </FormControl>

      <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
        <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password-login"
          type={showPassword ? 'text' : 'password'}
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                size="large"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>

      <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Grid>
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
                name="checked"
                color="primary"
              />
            }
            label="Keep me logged in"
          />
        </Grid>
        {/* <Grid>
          <Typography
            variant="subtitle1"
            component={Link}
            to="/forgot-password"
            color="secondary"
            sx={{ textDecoration: 'none' }}
          >
            Forgot Password?
          </Typography>
        </Grid> */}
      </Grid>

      <Box sx={{ mt: 2 }}>
        <AnimateButton>
          <Button color="secondary" fullWidth size="large" type="submit" variant="contained">
            Sign In
          </Button>
        </AnimateButton>
      </Box>
    </form>
  );
}
