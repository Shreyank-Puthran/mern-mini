import { useEffect, useState } from 'react';
import { Card, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import api from '../../../api/axios';

import FastfoodIcon from '@mui/icons-material/Fastfood';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import MovieIcon from '@mui/icons-material/Movie';
import ReceiptIcon from '@mui/icons-material/Receipt';
import WorkIcon from '@mui/icons-material/Work';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';

import TransactionModal from './TransactionModal';

const categoryIcons = {
  'Food & Drinks': <FastfoodIcon fontSize="small" sx={{ mr: 1, color: '#6b7280' }} />,
  Shopping: <ShoppingBagIcon fontSize="small" sx={{ mr: 1, color: '#6b7280' }} />,
  Transportation: <DirectionsCarIcon fontSize="small" sx={{ mr: 1, color: '#6b7280' }} />,
  Entertainment: <MovieIcon fontSize="small" sx={{ mr: 1, color: '#6b7280' }} />,
  'Bills & Utilities': <ReceiptIcon fontSize="small" sx={{ mr: 1, color: '#6b7280' }} />,
  Work: <WorkIcon fontSize="small" sx={{ mr: 1, color: '#6b7280' }} />,
  Freelance: <BusinessCenterIcon fontSize="small" sx={{ mr: 1, color: '#6b7280' }} />
};

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [openModal, setOpenModal] = useState(false);

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

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <Card sx={{ p: 3, borderRadius: 2 }}>
      {/* Header: Title + Add Button */}
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

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenModal(true)}
          sx={{
            backgroundColor: '#000000',
            color: '#fff',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#111827'
            }
          }}
        >
          Add New Transaction
        </Button>

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
  );
};

export default RecentTransactions;
