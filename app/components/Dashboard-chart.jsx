import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';  // Required for Chart.js 3 and above
import './DashboardChart.css';  // Custom CSS for styling

const ReviewChart = () => {
    const data = {
        labels: ['16/05/24', '18/05/24', '20/05/24', '22/05/24'],  // X-axis labels
        datasets: [
            {
                label: 'New review over time',
                data: [0, 5, 5, 0],  // Y-axis data points
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
            <h3 className="chart-title">Total Review</h3>
            <p className="chart-count">5,000</p>
            <p className="chart-subtitle">New review over time</p>
            <Line data={data} options={options} />
        </div>
    );
};

export default ReviewChart;
