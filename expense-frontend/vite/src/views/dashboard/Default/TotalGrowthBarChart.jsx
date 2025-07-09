import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import api from '../../../api/axios';
// material-ui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// third party
import Chart from 'react-apexcharts';

// project imports
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// chart data
import barChartOptions from './chart-data/total-growth-bar-chart';

const status = [
  { value: 'today', label: 'Weekly' },
  { value: 'month', label: 'Monthly' }
];

const series = [
  {
    name: 'Income',
    data: []
  },
  {
    name: 'Expense',
    data: []
  }
];

export default function TotalGrowthBarChart({ isLoading }) {
  const theme = useTheme();

  const [value, setValue] = useState('month');
  const [chartOptions, setChartOptions] = useState(barChartOptions);

  const { primary } = theme.palette.text;
  const divider = theme.palette.divider;
  const grey500 = theme.palette.grey[500];

  const successDark = theme.palette.success.dark;
  const errorDark = theme.palette.error.dark;

  // const [transactions, setTransactions] = useState([]);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const fetchTranscations = async () => {
      try {
        const response = await api.get('/transactions/grouped-stats');
        const { monthlyStats, weeklyStats } = response.data;
        const stats = value === 'today' ? weeklyStats : monthlyStats;
        const length = value === 'today' ? 52 : 12;
        const income = Array(length).fill(0);
        const expense = Array(length).fill(0);

        stats.forEach((entry) => {
          const index = value === 'today' ? entry._id.week - 1 : entry._id.month - 1;
          if (entry._id.type === 'Income') income[index] = entry.total;
          else if (entry._id.type === 'Expense') expense[index] = entry.total;
        });

        const allValues = [...income, ...expense];
        const maxY = Math.ceil(Math.max(...allValues) / 1500) * 1500 || 1500;

        setSeries([
          { name: 'Income', data: income },
          { name: 'Expense', data: expense }
        ]);

        setChartOptions((prev) => ({
          ...prev,
          chart: {
            ...prev.chart,
            stacked: false
          },
          colors: [successDark, errorDark],
          xaxis: {
            ...prev.xaxis,
            categories:
              value === 'today'
                ? Array.from({ length: 52 }, (_, i) => `W${i + 1}`)
                : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            labels: { style: { colors: primary } }
          },
          yaxis: {
            min: 0,
            max: maxY,
            tickAmount: maxY / 1500,
            forceNiceScale: true,
            labels: { style: { colors: primary } }
          },
          grid: { ...prev.grid, borderColor: divider },
          tooltip: { theme: 'light' },
          legend: {
            ...prev.legend,
            labels: { ...prev.legend?.labels, colors: grey500 }
          }
        }));
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchTranscations();
  }, [theme.palette, value]);

  return (
    <>
      {isLoading ? (
        <SkeletonTotalGrowthBarChart />
      ) : (
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid size={12}>
              <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <Grid>
                  <Grid container direction="column" spacing={1}>
                    <Grid>
                      <Typography variant="h2">Expense Analytics</Typography>
                    </Grid>
                    {/* <Grid>
                      <Typography variant="h3">$2,324.00</Typography>
                    </Grid> */}
                  </Grid>
                </Grid>
                <Grid>
                  <TextField id="standard-select-currency" select value={value} onChange={(e) => setValue(e.target.value)}>
                    {status.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              size={12}
              sx={{
                ...theme.applyStyles('light', {
                  '& .apexcharts-series:nth-of-type(4) path:hover': {
                    filter: `brightness(0.95)`,
                    transition: 'all 0.3s ease'
                  }
                }),
                '& .apexcharts-menu': {
                  bgcolor: 'background.paper'
                },
                '.apexcharts-theme-light .apexcharts-menu-item:hover': {
                  bgcolor: 'grey.200'
                },
                '& .apexcharts-theme-light .apexcharts-menu-icon:hover svg, .apexcharts-theme-light .apexcharts-reset-icon:hover svg, .apexcharts-theme-light .apexcharts-selection-icon:not(.apexcharts-selected):hover svg, .apexcharts-theme-light .apexcharts-zoom-icon:not(.apexcharts-selected):hover svg, .apexcharts-theme-light .apexcharts-zoomin-icon:hover svg, .apexcharts-theme-light .apexcharts-zoomout-icon:hover svg':
                  {
                    fill: theme.palette.grey[400]
                  }
              }}
            >
              <Chart options={chartOptions} series={series} type="bar" height={480} />
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
}

TotalGrowthBarChart.propTypes = { isLoading: PropTypes.bool };
