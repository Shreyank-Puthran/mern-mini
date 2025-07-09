import { Link as RouterLink } from 'react-router-dom';

// material-ui
import Link from '@mui/material/Link';

// project imports
import { DASHBOARD_PATH } from 'config';
import { Typography } from '@mui/material';
import Logo from 'ui-component/Logo';

// ==============================|| MAIN LOGO ||============================== //

export default function LogoSection() {
  return (
    <Link
      component={RouterLink}
      to={DASHBOARD_PATH}
      aria-label="theme-logo"
      sx={{ color: 'secondary.dark', fontWeight: 800, fontSize: '1.5rem', '--Link-underlineColor': '#ffffff' }}
    >
      {/* <Logo /> */}
      Expense Tracker
    </Link>
  );
}
