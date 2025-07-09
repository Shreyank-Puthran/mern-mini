import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import NotFound from '../views/pages/NotFound';
import NotAuthorized from '../views/pages/NotAuthorized';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
// material-ui
import Alert from '@mui/material/Alert';

// ==============================|| ELEMENT ERROR - COMMON ||============================== //

export default function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <NotFound />;
    }

    if (error.status === 401) {
      return <NotAuthorized />;
    }
  }

  return (
    <Button component={Link} to="/pages/login" variant="contained" color="primary">
      Login Page
    </Button>
  );
}
