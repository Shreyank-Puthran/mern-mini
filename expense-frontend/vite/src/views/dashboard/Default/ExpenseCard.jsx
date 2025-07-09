import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import api from '../../../api/axios.js';
// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';

// assets
// import EarningIcon from 'assets/images/icons/earning.svg';
import expense from 'assets/images/icons/expense.svg';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export default function ExpenseCard({ isLoading, selectedMonth, monthName }) {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [totalExpense, setTotalExpense] = useState(0);

  const fetchExpense = async () => {
    try {
      const response = await api.get('/transactions/grouped-stats');
      const { monthlyStats } = response.data;

      const expenseStats = monthlyStats.filter((entry) => entry._id.type === 'Expense' && entry._id.month === selectedMonth);

      const total = expenseStats.reduce((sum, entry) => sum + entry.total, 0);

      setTotalExpense(total);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchExpense();
  }, [selectedMonth]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {isLoading ? (
        <SkeletonEarningCard />
      ) : (
        <MainCard
          border={false}
          content={false}
          sx={{
            bgcolor: 'error.dark',
            color: '#fff',
            overflow: 'hidden',
            position: 'relative',
            '&:after': {
              content: '""',
              position: 'absolute',
              width: 210,
              height: 210,
              background: theme.palette.error.main,
              borderRadius: '50%',
              top: { xs: -85 },
              right: { xs: -95 }
            },
            '&:before': {
              content: '""',
              position: 'absolute',
              width: 210,
              height: 210,
              background: theme.palette.error.main,
              borderRadius: '50%',
              top: { xs: -125 },
              right: { xs: -15 },
              opacity: 0.5
            }
          }}
        >
          <Box sx={{ p: 2.25 }}>
            <Grid container direction="column">
              <Grid>
                <Grid container sx={{ justifyContent: 'space-between' }}>
                  <Grid>
                    <Avatar
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.largeAvatar,
                        bgcolor: 'error.main',
                        mt: 1
                      }}
                    >
                      <CardMedia sx={{ width: 24, height: 24 }} component="img" src={expense} alt="Notification" />
                    </Avatar>
                  </Grid>
                </Grid>
              </Grid>
              <Grid>
                <Grid container sx={{ alignItems: 'center' }}>
                  <Grid>
                    <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                      ${totalExpense.toFixed(2)}
                    </Typography>
                  </Grid>
                  <Grid>
                    <Avatar
                      sx={{
                        cursor: 'pointer',
                        ...theme.typography.smallAvatar,
                        bgcolor: 'error.light',
                        color: 'error.dark'
                      }}
                    >
                      <ArrowDownwardIcon fontSize="inherit" sx={{ transform: 'rotate3d(1, 1, 1, 45deg)' }} />
                    </Avatar>
                  </Grid>
                </Grid>
              </Grid>
              <Grid sx={{ mb: 1.25 }}>
                <Typography
                  sx={{
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: 'error.light'
                  }}
                >
                  Total Expense for {monthName}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </MainCard>
      )}
    </>
  );
}

ExpenseCard.propTypes = {
  isLoading: PropTypes.bool,
  selectedMonth: PropTypes.number,
  monthName: PropTypes.string
};
