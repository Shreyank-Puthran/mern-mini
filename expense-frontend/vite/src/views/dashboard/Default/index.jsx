import { useEffect, useState } from 'react';

// material-ui
import { Grid, MenuItem, TextField } from '@mui/material';
import { Card, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';
import api from '../../../api/axios';

// Icons
import FastfoodIcon from '@mui/icons-material/Fastfood';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import MovieIcon from '@mui/icons-material/Movie';
import ReceiptIcon from '@mui/icons-material/Receipt';
import WorkIcon from '@mui/icons-material/Work';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';

// project imports
import SavingsCard from './SavingsCard';
import TotalBalance from './TotalBalance';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import IncomeCard from './IncomeCard';
import ExpenseCard from './ExpenseCard';
import BudgetCard from './Buget';
import AddTransactionCard from './AddTransaction';
import { gridSpacing } from 'store/constant';

const categoryIcons = {
  'Food & Drinks': <FastfoodIcon fontSize="small" sx={{ mr: 1, color: '#6b7280' }} />,
  Shopping: <ShoppingBagIcon fontSize="small" sx={{ mr: 1, color: '#6b7280' }} />,
  Transportation: <DirectionsCarIcon fontSize="small" sx={{ mr: 1, color: '#6b7280' }} />,
  Entertainment: <MovieIcon fontSize="small" sx={{ mr: 1, color: '#6b7280' }} />,
  'Bills & Utilities': <ReceiptIcon fontSize="small" sx={{ mr: 1, color: '#6b7280' }} />,
  Work: <WorkIcon fontSize="small" sx={{ mr: 1, color: '#6b7280' }} />,
  Freelance: <BusinessCenterIcon fontSize="small" sx={{ mr: 1, color: '#6b7280' }} />
};

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

  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const res = await api.get('/transactions');
      const currentMonth = new Date().toISOString().slice(0, 7);

      const filtered = res.data.filter((txn) => {
        const txnMonth = new Date(txn.date).toISOString().slice(0, 7);
        return txnMonth === currentMonth;
      });

      setTransactions(filtered);
    } catch (error) {
      console.log(error.message);
    }
  };

  const monthName = monthNames[selectedMonth - 1];

  useEffect(() => {
    setLoading(false);
    fetchTransactions();
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
          <Grid size={{ xs: 12 }}>
            <BudgetCard selectedMonth={formattedMonth} />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <AddTransactionCard />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Card sx={{ p: 3, borderRadius: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  justifyContent: 'space-between',
                  alignItems: { xs: 'flex-start', sm: 'center' },
                  mb: 2,
                  gap: 2
                }}
              >
                <Typography variant="h1" fontWeight="bold">
                  Recent Transactions
                </Typography>

                <TransactionModal open={openModal} onClose={() => setOpenModal(false)} onTransactionAdded={fetchTransactions} />
              </Box>

              {/* Table */}
              <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Vendor</TableCell>
                      <TableCell align="right">Amount</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {transactions.map((txn) => (
                      <TableRow key={txn._id}>
                        <TableCell>
                          {new Date(txn.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: '2-digit',
                            year: 'numeric'
                          })}
                        </TableCell>
                        <TableCell>{txn.note || '-'}</TableCell>
                        <TableCell>
                          {' '}
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {categoryIcons[txn.category]}
                            {txn.category}
                          </Box>
                        </TableCell>
                        <TableCell>{txn.payee || '-'}</TableCell>
                        <TableCell align="right">
                          <Typography fontWeight="bold" color={txn.type === 'Expense' ? '#d84f61' : '#59a85e'}>
                            {`${txn.type === 'Expense' ? '-' : '+'}$${txn.amount.toFixed(2)}`}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
