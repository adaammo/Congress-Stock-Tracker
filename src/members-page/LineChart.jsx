import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    BarElement,       
    PointElement,
    TimeScale,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Chart } from 'react-chartjs-2';
import React from 'react';
import 'chartjs-adapter-date-fns'
ChartJS.register(
    LineElement,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    TimeScale,
    Tooltip,
    Legend,
    Title
);

export default function LineChart({spy, party, trades}) {
    console.log("SPY timestamps:");  
    console.log(party);
    const data = {
        labels: spy.map(point => new Date(point.timestamp * 1000)),
        datasets: [{
        label: 'SPDR S&P 500 ETF Trust (SPY)',
          data: spy.map(p => p.close),
          borderColor: party === 'D' ? 'rgba(200, 224, 254, 1)' : party === 'R' ? 'rgba(255, 200, 210, 1)' : 'gray',
          tension: 0.1,
          pointRadius: 0,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: party === 'D' ? 'rgba(200, 224, 254, 1)' : party === 'R' ? 'rgba(255, 200, 210, 1)' : 'gray',
          type: 'line',
        },
    {
        label: 'Trades',
        data: trades.map(trade => ({
            x: trade.transaction_date,
            y: null // trade values, detememines the bar heights!
        })),
        type: 'bar',
        // Adjust the bar color based on party affiliation alogn with setting bar UI
    }]
      };
      const chartOptions = {
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
            },
            title: {
              display: true,
              color: 'white',
            },
            grid: {
              display: false,
            },
          },
          y: {
            title: {
              display: true,
              text: 'Price',
              color: 'white',
            },
            grid: {
              display: true,
          },
          
        },
    },
        responsive: true,
        interaction: {
            mode: 'nearest',
            intersect: true
          },
          plugins: {
            legend: {
              display:false,
            },
          title: {
            display: true,
            text: 'SPDR S&P 500 ETF Trust (SPY) Price Chart',
            font: {
              size: 16,
              weight: 'bold',
              color: 'white',
            },
            color: 'white',
          },
        },
        animation: {
            duration: 1000,
            easing: 'easeInOutQuad',
        }
    }
    return (
        <div className="line-chart">
            <Chart data={data} options={chartOptions} />
        </div>
    );
}