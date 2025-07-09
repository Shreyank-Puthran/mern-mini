import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Legend, Tooltip } from 'chart.js';
import { Card, CardContent, Typography } from '@mui/material';
import api from '../../../api/axios';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Legend, Tooltip);

const IncomeVsExpenseChart = () => {
  const [months, setMonths] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/transactions/grouped-stats');
        const monthlyStats = res.data.monthlyStats;

        const incomeMap = {};
        const expenseMap = {};

        monthlyStats.forEach((entry) => {
          const monthKey = `${entry._id.year}-${String(entry._id.month).padStart(2, '0')}`;
          if (entry._id.type === 'Income') {
            incomeMap[monthKey] = entry.total;
          } else if (entry._id.type === 'Expense') {
            expenseMap[monthKey] = entry.total;
          }
        });

        // combined sorted list of months
        const allMonths = Array.from(new Set([...Object.keys(incomeMap), ...Object.keys(expenseMap)])).sort();

        setMonths(allMonths);
        setIncomeData(allMonths.map((month) => incomeMap[month] || 0));
        setExpenseData(allMonths.map((month) => expenseMap[month] || 0));
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: months.map((m) =>
      new Date(`${m}-01`).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
      })
    ),
    datasets: [
      {
        label: 'Income',
        data: incomeData,
        borderColor: '#4caf50',
        backgroundColor: '#4caf50',
        tension: 0.3
      },
      {
        label: 'Expenses',
        data: expenseData,
        borderColor: '#f44336',
        backgroundColor: '#f44336',
        tension: 0.3
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // allow the chart to fill its container
    scales: {
      y: { beginAtZero: true }
    },
    plugins: {
      legend: { position: 'top' }
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Income VS Expenses Trend
        </Typography>
        <div
          style={{
            flex: 1,
            position: 'relative', // Chart.js needs this
            width: '100%',
            minHeight: 200 // or whatever minimum you like on mobile
          }}
        >
          <Line data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
};

export default IncomeVsExpenseChart;
