import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './DashboardChart.css';

const ReviewChart = ({ title, count, subtitle, reviewData, reviewDates }) => {
    const data = {
        labels: reviewDates,  // X-axis labels from props
        datasets: [
            {
                label: 'New review over time',
                data: reviewData,  // Y-axis data points from props
                borderColor: '#ffffff',
                borderWidth: 2,
                pointBackgroundColor: '#ffffff',
                backgroundColor: 'transparent',
                fill: false,  // No fill under the line
                tension: 0.3,  // Smooth curve for the line
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: false,  // Hides the legend
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: '#ffffff',  // Y-axis labels color
                    font: {
                        size: 14,
                    },
                    stepSize: 1,  // Control tick intervals
                },
                grid: {
                    color: '#6e6d7a',  // Y-axis grid line color
                },
            },
            x: {
                ticks: {
                    color: '#ffffff',  // X-axis labels color
                    font: {
                        size: 12,
                    },
                },
                grid: {
                    display: false,  // Hide the X-axis grid lines
                },
            },
        },
    };

    return (
        <div className="review-chart-container">
            <h3 className="chart-title">{title}</h3>
            <p className="chart-count">{count}</p>
            <p className="chart-subtitle">{subtitle}</p>
            <Line data={data} options={options} />
        </div>
    );
};

export default ReviewChart;
