// import { useEffect, useState } from 'react';
// import { Card, CardContent, Typography, Grid } from '@mui/material';
// import api from '../../../api/axios';

// const FinancialSummary = () => {
//   const [summary, setSummary] = useState({
//     income: 0,
//     expense: 0,
//     savings: 0
//   });

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const res = await api.get('/transactions/stats');
//         setSummary(res.data);
//       } catch (error) {
//         console.log(error.message);
//       }
//     };

//     fetchStats();
//   }, []);

//   const cardStyles = {
//     borderRadius: 3,
//     boxShadow: '0px 2px 6px rgba(0,0,0,0.08)',
//     p: 2
//   };

//   return (
//     <Grid container spacing={2} sx={{ mt: 2 }}>
//       <Grid item xs={12} md={4}>
//         <Card sx={{ ...cardStyles, backgroundColor: '#eff6ff' }}>
//           <CardContent>
//             <Typography variant="subtitle2" sx={{ color: '#3b82f6' }}>
//               Total Income
//             </Typography>
//             <Typography variant="h5" fontWeight="bold">
//               ${summary.income.toLocaleString()}
//             </Typography>
//             <Typography variant="caption">Last 6 months</Typography>
//           </CardContent>
//         </Card>
//       </Grid>
//       <Grid item xs={12} md={4}>
//         <Card sx={{ ...cardStyles, backgroundColor: '#eff6ff' }}>
//           <CardContent>
//             <Typography variant="subtitle2" sx={{ color: '#3b82f6' }}>
//               Total Expenses
//             </Typography>
//             <Typography variant="h5" fontWeight="bold">
//               ${summary.expense.toLocaleString()}
//             </Typography>
//             <Typography variant="caption">Last 6 months</Typography>
//           </CardContent>
//         </Card>
//       </Grid>
//       <Grid item xs={12} md={4}>
//         <Card sx={{ ...cardStyles, backgroundColor: '#eff6ff' }}>
//           <CardContent>
//             <Typography variant="subtitle2" sx={{ color: '#3b82f6' }}>
//               Net Savings
//             </Typography>
//             <Typography variant="h5" fontWeight="bold">
//               ${summary.savings.toLocaleString()}
//             </Typography>
//             <Typography variant="caption">Last 6 months</Typography>
//           </CardContent>
//         </Card>
//       </Grid>
//     </Grid>
//   );
// };

// export default FinancialSummary;

import { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import api from '../../../api/axios';

const FinancialSummary = () => {
  const [summary, setSummary] = useState({ income: 0, expense: 0, savings: 0 });

  useEffect(() => {
    api.get('/transactions/stats')
      .then(res => setSummary(res.data))
      .catch(console.error);
  }, []);


  const base = {
    borderRadius: 2,
    boxShadow: 'none', 
    p: 2
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
      {/* Total Income */}
      <Card sx={{ ...base, backgroundColor: '#eff6ff' }}>
        <CardContent>
          <Typography variant="subtitle1" sx={{ color: '#3b82f6' }}>
            Total Income
          </Typography>
          <Typography variant="h3" fontWeight="bold" sx={{ mt: 0.5 }}>
            ${summary.income.toLocaleString()}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Last 6 months
          </Typography>
        </CardContent>
      </Card>

      {/* Total Expenses */}
      <Card sx={{ ...base, backgroundColor: '#fef2f2' }}>
        <CardContent>
          <Typography variant="subtitle1" sx={{ color: '#ef4444' }}>
            Total Expenses
          </Typography>
          <Typography variant="h3" fontWeight="bold" sx={{ mt: 0.5 }}>
            ${summary.expense.toLocaleString()}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Last 6 months
          </Typography>
        </CardContent>
      </Card>

      {/* Net Savings */}
      <Card sx={{ ...base, backgroundColor: '#ecfdf5' }}>
        <CardContent>
          <Typography variant="subtitle1" sx={{ color: '#10b981' }}>
            Net Savings
          </Typography>
          <Typography variant="h3" fontWeight="bold" sx={{ mt: 0.5 }}>
            ${summary.savings.toLocaleString()}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Last 6 months
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default FinancialSummary;
