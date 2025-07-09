// ==============================|| DASHBOARD - TOTAL GROWTH BAR CHART ||============================== //

const chartOptions = {
  chart: {
    type: 'bar',
    height: 480,
    stacked: false,
    toolbar: { show: true },
    zoom: { enabled: true }
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '50%'
    }
  },
  dataLabels: { enabled: false },
  xaxis: {
    type: 'category',
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  // yaxis: {
  //   min: 0,
  //   max: 6000,
  //   tickAmount: 4,
  //   labels: {
  //     formatter: (value) => `${value}`, // Optional: `$${value}` for currency
  //     style: {
  //       colors: '#888',
  //       fontSize: '12px'
  //     }
  //   },
  //   forceNiceScale: true // 🟢 Important: Forces clean intervals
  // },
  fill: { type: 'solid' },
  legend: {
    show: true,
    fontFamily: 'Roboto, sans-serif',
    position: 'bottom',
    offsetX: 20,
    labels: {
      useSeriesColors: false
    },
    markers: {
      size: 8,
      shape: 'square'
    },
    itemMargin: {
      horizontal: 15,
      vertical: 8
    }
  },
  grid: { show: true }
};

export default chartOptions;
