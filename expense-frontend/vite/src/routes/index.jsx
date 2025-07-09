import { createBrowserRouter } from 'react-router-dom';

// routes
import AuthenticationRoutes from './AuthenticationRoutes';
import MainRoutes from './MainRoutes';
import NotFound from '../views/pages/NotFound';

// ==============================|| ROUTING RENDER ||============================== //

const router = createBrowserRouter(
  [
    AuthenticationRoutes,
    MainRoutes,
    {
      path: '*',
      element: <NotFound /> // fallback route
    }
  ],
  {
    basename: import.meta.env.VITE_APP_BASE_NAME
  }
);

// const router = createBrowserRouter([
//   MainRoutes,
//   AuthenticationRoutes
// ]);

export default router;
