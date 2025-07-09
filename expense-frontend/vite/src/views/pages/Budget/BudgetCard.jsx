import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useState } from 'react';
import api from '../../../api/axios';

const categories = ['Food & Drinks', 'Shopping', 'Transportation', 'Entertainment', 'Bills & Utilities'];
const types = ['Essential', 'Discretionary'];

const AddBudgetModal = ({ open, onClose, onSuccess }) => {
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [limit, setLimit] = useState('');
  const [month, setMonth] = useState(new Date());

  const handleSubmit = async () => {
    if (!type || !category || !limit || !month) {
      return alert('Type, Category, Limit, and Month are required');
    }

    try {
      await api.post('/budgets', {
        type,
        category,
        limit,
        month: month.toISOString().slice(0, 7)
      });

      setCategory('');
      setLimit('');
      setType('');
      setMonth(new Date());
      onSuccess?.();
      onClose();
      alert('Budget Set!');
    } catch (error) {
      console.error(error);
      alert('Failed to create budget');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Budget</DialogTitle>
      <DialogContent sx={{ pt: 1 }}>
        {/* First row */}
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
            },
          }}
        >
          <TextField
            select
            fullWidth
            label="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            {types.map((t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            fullWidth
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            type="number"
            label="Limit"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
          />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              views={['year', 'month']}
              label="Month"
              value={month}
              onChange={(newValue) => setMonth(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" sx={{ backgroundColor: '#8e6cd3' }} onClick={handleSubmit}>
          Add Budget
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddBudgetModal;
