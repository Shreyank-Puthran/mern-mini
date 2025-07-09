import api from '../../../api/axios';
import { useState } from 'react';

// Layout & containers
import { Card, CardContent, Box } from '@mui/material';

// Text & form inputs
import { Typography, TextField, MenuItem, Button, InputLabel, Select, FormControl } from '@mui/material';

// Date picker (MUI X)
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const categories = ['Work', 'Freelance', 'Food & Drinks', 'Shopping', 'Transportation', 'Entertainment', 'Bills & Utilities'];

export default function AddTransactionCard() {
  const [type, setType] = useState('Expense');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [payee, setPayee] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date());

  const handleSubmit = async () => {
    if (!type || !category || !amount) {
      return alert('Type, Category, and Amount are required');
    }
    try {
      await api.post('/transactions', { type, category, amount: +amount, payee, note, date });
      setCategory('');
      setAmount('');
      setPayee('');
      setNote('');
      setDate(new Date());
      alert('Transaction added!');
    } catch {
      alert('Failed to add transaction');
    }
  };

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Add New Transaction
        </Typography>

        {/* First row */}
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{
            display: 'grid',
            gap: 2,
            mt: 2,
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

        {/* Second row*/}
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

        {/* Submit button */}
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" onClick={handleSubmit} sx={{ backgroundColor: '#8e6cd3' }}>
            + Add Transaction
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
