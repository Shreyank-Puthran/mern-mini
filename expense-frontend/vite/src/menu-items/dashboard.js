// assets
import {
  IconDashboard,
  IconReport,
  IconTransactionDollar,
  IconPigMoney
} from '@tabler/icons-react';

// constant
const icons = {
  IconDashboard,
  IconReport,
  IconTransactionDollar,
  IconPigMoney
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'reports',
      title: 'Reports',
      type: 'item',
      url: '/reports',
      icon: icons.IconReport,
      breadcrumbs: false
    },
    {
      id: 'transactions',
      title: 'Transactions',
      type: 'item',
      url: '/transactions',
      icon: icons.IconTransactionDollar,
      breadcrumbs: false
    },
    {
      id: 'budget',
      title: 'Budget',
      type: 'item',
      url: '/budget',
      icon: icons.IconPigMoney,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
