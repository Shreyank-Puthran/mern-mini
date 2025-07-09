import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function NotAuthorized() {
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
        401
      </Typography>
      <Typography variant="body1" sx={{ maxWidth: 400, mb: 3 }}>
        You aren't authorized to see this page yet.
      </Typography>
      <Button component={Link} to="/pages/login" variant="contained" color="primary">
        Login Page.
      </Button>
    </Box>
  );
}
