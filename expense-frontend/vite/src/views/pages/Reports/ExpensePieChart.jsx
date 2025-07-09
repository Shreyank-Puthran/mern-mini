import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Card, CardContent, Typography } from '@mui/material';
import api from '../../../api/axios';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const colors = [
  '#4CAF50', // green
  '#2196F3', // blue
  '#FF9800', // orange
  '#9C27B0', // purple
  '#E91E63', // pink
  '#795548', // brown
  '#607D8B' // slate
];

const getCurrentMonth = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
};

const ExpenseByCategory = () => {
  const [categoryData, setCategoryData] = useState({ labels: [], values: [] });
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/transactions/summary?month=${selectedMonth}`);
        const labels = Object.keys(res.data);
        const values = Object.values(res.data);
        setCategoryData({ labels, values });
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, [selectedMonth]);

  const pieData = {
    labels: categoryData.labels,
    datasets: [
      {
        data: categoryData.values,
        backgroundColor: colors,
        borderWidth: 1
      }
    ]
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Expense By Category
        </Typography>
        <div style={{ height: '100%' }}>
          <Pie data={pieData} />
        </div>
        
      </CardContent>
    </Card>
  );
};

export default ExpenseByCategory;
