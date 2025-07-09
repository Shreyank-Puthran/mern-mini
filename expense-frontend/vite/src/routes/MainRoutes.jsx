import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// protection
import ProtectedRoute from '../views/pages/ProtectedRoute';

const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const BudgetPage = Loadable(lazy(() => import('views/pages/Budget/BudgetComponent')));
const TransactionPage = Loadable(lazy(() => import('views/pages/Transactions/TransactionComponent.jsx')));
const ReportsPage = Loadable(lazy(() => import('views/pages/Reports/ReportsComponent.jsx')));


// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: (
    <ProtectedRoute>
      <MainLayout />
    </ProtectedRoute>
  ),
  // element: <LoginPage />,
  children: [
    // {
    //   path: '/',
    //   element: <LoginPage />
    // },
    {
      path: 'dashboard',
      element: <DashboardDefault />
    },
    {
      path: 'budget',
      element: <BudgetPage />
    },
    {
      path: 'transactions',
      element: <TransactionPage />
    },
    {
      path: 'reports',
      element: <ReportsPage />
    },
  ]
};

export default MainRoutes;
