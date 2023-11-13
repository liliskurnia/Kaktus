// ===========================|| DASHBOARD - TOTAL GROWTH BAR CHART ||=========================== //
import colors from 'assets/styles/themes.scss';

const chartData = {
  height: 480,
  type: 'bar',
  options: {
    chart: {
      fontFamily: `'Montserrat Alternates', sans-serif`,
      id: 'bar-chart',
      stacked: true,
      toolbar: {
        show: true
      },
      zoom: {
        enabled: true
      }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
          }
        }
      }
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%'
      }
    },
    xaxis: {
      type: 'category',
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yaxis: {
      title: {
        text: 'Total Request',
        style: {
          fontSize: '12px',
          fontWeight: 600,
          color: colors.neutralW400
        }
      }
    },
    legend: {
      show: true,
      fontSize: '14px',
      fontFamily: `'Montserrat Alternates', sans-serif`,
      position: 'bottom',
      offsetX: 20,
      labels: {
        useSeriesColors: false
      },
      markers: {
        width: 16,
        height: 16,
        radius: 5
      },
      itemMargin: {
        horizontal: 15,
        vertical: 8
      }
    },
    fill: {
      type: 'solid',
      colors: [colors.primaryMain, colors.secondaryMain, colors.tertiaryMain]
    },
    dataLabels: {
      enabled: false
    },
    grid: {
      show: true
    }
  },
  series: [
    {
      name: 'On-Demand Requests',
      data: [35, 125, 35, 35, 35, 80, 35, 20, 35, 45, 15, 75]
    }
  ]
};
export default chartData;
