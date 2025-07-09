import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import ExpenseByCategory from './ExpensePieChart';
import IncomeVsExpenseChart from './IncomeVsExpenseChart';
import FinancialSummary from './FinancialSummary';

export default function Reports() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h1" fontWeight="bold" gutterBottom>
        Reports
      </Typography>

      {/* Top charts */}
<Box
  sx={{
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' }, // column on mobile, row on md+
    gap: 3
  }}
>
  <Card
    sx={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 3
    }}
  >
    <CardContent sx={{ flex: 1 }}>
      <ExpenseByCategory />
    </CardContent>
  </Card>

  <Card
    sx={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 3
    }}
  >
    <CardContent sx={{ flex: 1 }}>
      <IncomeVsExpenseChart />
    </CardContent>
  </Card>
</Box>


      {/* Bottom summary */}
      <Grid item xs={12}>
        <Card sx={{ borderRadius: 3, backgroundColor: '#fff', mt: 3 }}>
          <CardContent>
            <FinancialSummary />
          </CardContent>
        </Card>
      </Grid>
    </Box>
  );
}
