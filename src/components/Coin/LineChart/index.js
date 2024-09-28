import React from "react";
import { Line } from "react-chartjs-2";

function LineChart({ chartData, multiAxis, timeRange }) {
  const options = {
    plugins: {
      legend: {
        display: multiAxis ? true : false, // Show legend if multiAxis is true
      },
    },
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false, // Show tooltip for nearest point on hover
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date', // X-axis title
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
          callback: function (value, index, values) {
            const date = new Date(this.getLabelForValue(value));
            const days = chartData.labels.length;

            // Conditional display of labels based on time range (7, 30, or 180 days)
            if (timeRange === 7) {
              return `${date.getMonth() + 1}/${date.getDate()}`;
            }
            if (timeRange === 30) {
              if (index % 3 === 0 || index === values.length - 1) {
                return `${date.getMonth() + 1}/${date.getDate()}`;
              }
            }
            if (timeRange === 180) {
              if (index % 7 === 0 || index === values.length - 1) {
                return `${date.getMonth() + 1}/${date.getDate()}`;
              }
            }
            return `${date.getMonth() + 1}/${date.getDate()}`;
          },
        },
      },
      crypto1: {
        type: "linear", // Y-axis for Coin 1
        position: "left",
        title: {
          display: true,
          text: 'Price (USD)', // Label for Y-axis
        },
      },
      crypto2: multiAxis
        ? {
            type: "linear", // Y-axis for Coin 2
            position: "right",
            title: {
              display: true,
              text: 'Price (USD)',
            },
          }
        : undefined, // Only display second axis if multiAxis is true
    },
    elements: {
      line: {
        tension: 0.4, // Adds the curve to lines
      },
    },
  };

  return <Line data={chartData} options={options} />;
}

export default LineChart;
