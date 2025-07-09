import api from '../../../api/axios';
import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, LinearProgress, Box } from '@mui/material';


const getProgressColor = (amount, limit) => {
  const percent = amount / limit;
  if (percent > 1) return 'error';
  if (percent > 0.85) return 'warning';
  return 'success';
};

const BudgetItem = ({ label, amount, limit }) => {
  const color = getProgressColor(amount, limit);
  const percent = Math.min((amount / limit) * 100, 100);

  return (
    <Box mb={2}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="body2">{label}</Typography>
        <Typography variant="body2">
          ${amount} / ${limit}
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={percent}
        color={color}
        sx={{
          height: 8,
          borderRadius: 5,
          mt: 0.5,
        }}
      />
    </Box>
  );
};

const BudgetCard = ({ selectedMonth }) => {
  const [budgetData, setBudgetData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [budgetRes, spentRes] = await Promise.all([
          api.get('/budgets'),
          api.get(`/transactions/summary?month=${selectedMonth}`),
        ]);

        const spentByCategory = spentRes.data;

        const mergedData = budgetRes.data
          .filter(b => b.month === selectedMonth) // optional if you're filtering per month
          .map(b => ({
            label: b.category,
            amount: spentByCategory[b.category] || 0,
            limit: b.limit,
          }));

        setBudgetData(mergedData);
      } catch (error) {
        console.error('Error fetching budget data:', error);
      }
    };

    fetchData();
  }, [selectedMonth]);

  return (
    <Card>
      <CardContent>
        <Typography variant="h2" gutterBottom>
          Budget Overview
        </Typography>
        {budgetData.length === 0 ? (
          <Typography variant="body2">No budgets found for this month.</Typography>
        ) : (
          budgetData.map((item, index) => (
            <BudgetItem key={index} {...item} />
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default BudgetCard;
