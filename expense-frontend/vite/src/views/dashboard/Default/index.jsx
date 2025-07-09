import { useEffect, useState } from 'react';

// material-ui
import { Grid, MenuItem, TextField } from '@mui/material';

// project imports
import SavingsCard from './SavingsCard';
import TotalBalance from './TotalBalance';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import IncomeCard from './IncomeCard';
import ExpenseCard from './ExpenseCard';
import BudgetCard from './Buget';
import AddTransactionCard from './AddTransaction';
import { gridSpacing } from 'store/constant';

// ==============================|| DEFAULT DASHBOARD ||============================== //

export default function Dashboard() {
  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' }
  ];

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const currentYear = new Date().getFullYear();
  const formattedMonth = `${currentYear}-${String(selectedMonth).padStart(2, '0')}`;

  const [isLoading, setLoading] = useState(true);

  const monthName = monthNames[selectedMonth - 1];

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid size={12}>
        <Grid xs={12} sx={{ mb: 2 }} item spacing={2} alignItems="center">
          <TextField
            select
            label="Select Month"
            value={selectedMonth}
            sx={{ minWidth: 200 }}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
          >
            {months.map((month) => (
              <MenuItem key={month.value} value={month.value}>
                {month.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid container spacing={gridSpacing}>
          <Grid size={{ lg: 3, md: 6, sm: 6, xs: 12 }}>
            <TotalBalance isLoading={isLoading} selectedMonth={selectedMonth} monthName={monthName} />
          </Grid>
          <Grid size={{ lg: 3, md: 6, sm: 6, xs: 12 }}>
            <IncomeCard isLoading={isLoading} selectedMonth={selectedMonth} monthName={monthName} />
          </Grid>
          <Grid size={{ lg: 3, md: 6, sm: 6, xs: 12 }}>
            <ExpenseCard isLoading={isLoading} selectedMonth={selectedMonth} monthName={monthName} />
          </Grid>
          <Grid size={{ lg: 3, md: 6, sm: 6, xs: 12 }}>
            <SavingsCard isLoading={isLoading} selectedMonth={selectedMonth} monthName={monthName} />
          </Grid>
        </Grid>
      </Grid>
      <Grid size={12}>
        <Grid container spacing={gridSpacing}>
          <Grid size={{ xs: 12 }}>
            <TotalGrowthBarChart isLoading={isLoading} selectedMonth={selectedMonth} />
          </Grid>
          <Grid size={{ xs: 12}}>
            <BudgetCard selectedMonth={formattedMonth} />
          </Grid>
          <Grid size={{ xs: 12}}>
            <AddTransactionCard />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
