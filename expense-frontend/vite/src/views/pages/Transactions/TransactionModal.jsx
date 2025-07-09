import api from '../../../api/axios';
import { useState } from 'react';

// MUI Layout
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  Box
} from '@mui/material';

// MUI X Date Picker
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const categories = ['Work', 'Freelance', 'Food & Drinks', 'Shopping', 'Transportation', 'Entertainment', 'Bills & Utilities'];

export default function TransactionModal({ open, onClose, onTransactionAdded }) {
  const [type, setType] = useState('Expense');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [payee, setPayee] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date());

  const handleSubmit = async () => {
    if (!type || !category || !amount) return alert('Type, Category, and Amount are required');

    try {
      await api.post('/transactions', {
        type,
        category,
        amount: +amount,
        payee,
        note,
        date
      });
      
      onTransactionAdded();
      onClose();

      setCategory('');
      setAmount('');
      setPayee('');
      setNote('');
      setDate(new Date());

      onTransactionAdded?.();
      onClose();
    } catch {
      alert('Failed to add transaction');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle fontWeight={600}>Add New Transaction</DialogTitle>

      <DialogContent sx={{ pt: 1 }}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{
            display: 'grid',
            gap: 2,
            mt: 1,
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2,1fr)',
              md: 'repeat(4,1fr)'
            }
          }}
        >
          <FormControl fullWidth>
            <InputLabel>Transaction Type</InputLabel>
            <Select value={type} label="Transaction Type" onChange={(e) => setType(e.target.value)}>
              <MenuItem value="Income">Income</MenuItem>
              <MenuItem value="Expense">Expense</MenuItem>
            </Select>
          </FormControl>

          <TextField select fullWidth label="Category" value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>

          <TextField fullWidth type="number" label="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date"
              value={date}
              onChange={(newVal) => setDate(newVal)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
        </Box>

        {/* Second row */}
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            mt: 2,
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2,1fr)'
            }
          }}
        >
          {type === 'Expense' && <TextField fullWidth label="Merchant / Payee" value={payee} onChange={(e) => setPayee(e.target.value)} />}

          <TextField fullWidth label="Notes" value={note} onChange={(e) => setNote(e.target.value)} />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" sx={{ backgroundColor: '#8e6cd3' }} onClick={handleSubmit}>
          + Add Transaction
        </Button>
      </DialogActions>
    </Dialog>
  );
}
