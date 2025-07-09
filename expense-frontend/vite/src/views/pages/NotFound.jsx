// src/views/pages/NotFound.jsx
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function NotFound() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        bgcolor: '#f9fafb',
        p: 3
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />
      <Typography variant="h2" color="error" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Oops! Page not found.
      </Typography>
      <Typography variant="body1" sx={{ maxWidth: 400, mb: 3 }}>
        The page you're looking for might have been removed, had its name changed, or is temporarily unavailable.
      </Typography>
      <Button component={Link} to="/dashboard" variant="contained" color="primary">
        Go to Dashboard
      </Button>
    </Box>
  );
}
