import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, LinearProgress, Grid, Box, Stack, ToggleButton, ToggleButtonGroup, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import api from '../../../api/axios';
import AddBudgetModal from './BudgetCard';

const BudgetOverview = () => {
  const [budgets, setBudgets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState('All');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const budgetRes = await api.get('/budgets');
      const txnRes = await api.get('/transactions');
      setBudgets(budgetRes.data);
      setTransactions(txnRes.data);
    };
    fetchData();
  }, []);

  const handleFilterChange = (event, newFilter) => {
    if (newFilter !== null) setFilter(newFilter);
  };

  // const filteredBudgets = budgets.filter((budget) => (filter === 'All' ? true : budget.type === filter));
  const currentMonth = new Date().toISOString().slice(0, 7);

  const filteredBudgets = budgets.filter((budget) => budget.month === currentMonth && (filter === 'All' ? true : budget.type === filter));

  const budgetSummary = filteredBudgets.map((budget) => {
    const spent = transactions
      .filter((t) => {
        const txnMonth = new Date(t.date).toISOString().slice(0, 7); // format: "2025-07"
        return t.category === budget.category && t.type === 'Expense' && txnMonth === budget.month;
      })
      .reduce((sum, t) => sum + t.amount, 0);

    const percent = Math.min((spent / budget.limit) * 100, 100);
    const remaining = budget.limit - spent;

    return { ...budget, spent, percent, remaining };
  });

  return (
    <Grid>
      <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h1" fontWeight={600} gutterBottom>
          Budgets
        </Typography>
        <Button sx={{ backgroundColor: 'black', color: 'white' }} onClick={() => setOpen(true)}>
          <AddIcon sx={{ mr: 2 }} />
          New Budget
        </Button>
        <AddBudgetModal open={open} onClose={() => setOpen(false)} />
      </Grid>
      <Card sx={{ mt: 3, mb: 5 }}>
        <CardContent>
          <Typography variant="h2" fontWeight={600} gutterBottom>
            Monthly Budget Overview
          </Typography>

          <ToggleButtonGroup value={filter} exclusive onChange={handleFilterChange} sx={{ mb: 3 }}>
            <ToggleButton value="All">All Categories</ToggleButton>
            <ToggleButton value="Essential">Essential</ToggleButton>
            <ToggleButton value="Discretionary">Discretionary</ToggleButton>
          </ToggleButtonGroup>

          <Grid container direction="column" spacing={3}>
            {budgetSummary.map((budget) => (
              <Grid item key={budget._id}>
                <Typography fontWeight={600}>{budget.category}</Typography>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2">{budget.percent.toFixed(0)}% spent</Typography>
                  <Typography variant="body2">
                    ${budget.spent.toFixed(2)} / ${budget.limit.toFixed(2)}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={budget.percent}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    mt: 1,
                    backgroundColor: '#f0f0f0',
                    '& .MuiLinearProgress-bar': { backgroundColor: '#000' }
                  }}
                />
                <Typography variant="body2" color="text.secondary" mt={0.5}>
                  ${budget.remaining.toFixed(2)} remaining
                </Typography>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
      {/* Budget Summary */}
      <Box
        sx={{
          mt: 4,
          border: '1px solid #e5e7eb',
          borderRadius: 2,
          p: 3,
          backgroundColor: '#fff'
        }}
      >
        <Typography variant="h1" fontWeight={600} gutterBottom>
          Budget Summary
        </Typography>

        <Grid container spacing={2}>
          {/* Total Budget */}
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                backgroundColor: '#f3f4f6',
                borderRadius: 1,
                py: 2,
                px: 3,
                textAlign: 'center'
              }}
            >
              <Typography variant="h4" color="text.secondary">
                Total Budget
              </Typography>
              <Typography variant="h2" fontWeight="bold" sx={{ mt: 0.5 }}>
                ${budgetSummary.reduce((sum, b) => sum + b.limit, 0).toFixed(2)}
              </Typography>
            </Box>
          </Grid>

          {/* Total Spent */}
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                backgroundColor: '#f3f4f6',
                borderRadius: 1,
                py: 2,
                px: 3,
                textAlign: 'center'
              }}
            >
              <Typography variant="h4" color="text.secondary">
                Total Spent
              </Typography>
              <Typography variant="h2" fontWeight="bold" color="#d84f61" sx={{ mt: 0.5 }}>
                ${budgetSummary.reduce((sum, b) => sum + b.spent, 0).toFixed(2)}
              </Typography>
            </Box>
          </Grid>

          {/* Total Remaining */}
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                backgroundColor: '#f3f4f6',
                borderRadius: 1,
                py: 2,
                px: 3,
                textAlign: 'center'
              }}
            >
              <Typography variant="h4" color="text.secondary">
                Total Remaining
              </Typography>
              <Typography variant="h2" fontWeight="bold" color="#59a85e" sx={{ mt: 0.5 }}>
                ${budgetSummary.reduce((sum, b) => sum + b.remaining, 0).toFixed(2)}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default BudgetOverview;
