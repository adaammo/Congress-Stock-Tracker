import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import React, { useMemo } from 'react';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function CongressionalTradesChart({trades }) {
  const quarterlyTrades = useMemo(() => {
      if (!trades || !Array.isArray(trades)) return [];
      
      console.log('Processing trades:', trades.length, 'total trades');
      
      const tradesByQuarter = {};
      
      trades.forEach((trade, index) => {
          if (!trade.stock_id || trade.stock_id === 'NA' || trade.stock_id === 'N/A' || trade.stock_id === '') {
              console.log(`Skipping trade ${index} - invalid stock_id:`, trade.stock_id);
              return;
          }
          
          let date;
          if (trade.transaction_date) {
              date = new Date(trade.transaction_date);
          } else if (trade.date) {
              date = new Date(trade.date);
          } else {
              console.warn(`Trade ${index} missing transaction_date:`, trade);
              return; 
          }
          
          if (isNaN(date.getTime())) {
              console.warn(`Invalid date in trade ${index}:`, trade.transaction_date || trade.date);
              return; 
          }
          
          const year = date.getFullYear();
          const quarter = Math.floor(date.getMonth() / 3) + 1;
          const quarterKey = `Q${quarter} ${year}`;
          
          if (year < 2017 || year > 2025) {
              console.warn(`Trade with unusual year ${year}:`, trade);
          }
          
          if (!tradesByQuarter[quarterKey]) {
              tradesByQuarter[quarterKey] = {
                  quarter: quarterKey,
                  year: year,
                  quarterNum: quarter,
                  buys: 0,
                  sells: 0,
                  date: new Date(year, (quarter - 1) * 3, 1)
              };
          }
          
          // Handle different trade type formats (case insensitive and flexible)
          const tradeType = (trade.trade_type || trade.type || '').toLowerCase().trim();
          
          // Check for buys - handle "purchase" and "Purchase"
          const isBuy = tradeType === 'purchase' || tradeType === 'buy';
          
          // Check for sells - handle all variations
          const isSell = tradeType === 'sale_full' || 
                        tradeType === 'sale_partial' || 
                        tradeType === 'sell' ||
                        tradeType === 'sale (full)' ||
                        tradeType === 'sale (partial)' ||
                        tradeType.includes('sale');
          
          if (isBuy) {
              tradesByQuarter[quarterKey].buys += 1;
          } else if (isSell) {
              tradesByQuarter[quarterKey].sells += 1;
          } else {
              console.warn(`Unknown trade type "${trade.trade_type || trade.type}" in trade:`, trade);
          }
      });
      
      // Convert to array and sort by date
      const result = Object.values(tradesByQuarter).sort((a, b) => a.date - b.date);
      console.log('Processed quarterly trades:', result);
      
      return result;
  }, [trades]);

  const data = {
      labels: quarterlyTrades.map(trade => trade.quarter),
      datasets: [
          {
              label: 'Buys',
              data: quarterlyTrades.map(trade => trade.buys),
              backgroundColor: 'rgba(34, 197, 94, 0.85)',
              borderColor: 'rgba(34, 197, 94, 1)',
              borderWidth: 3,
              borderRadius: 8,
              borderSkipped: false,
          },
          {
              label: 'Sells',
              data: quarterlyTrades.map(trade => trade.sells),
              backgroundColor: 'rgba(239, 68, 68, 0.85)',
              borderColor: 'rgba(239, 68, 68, 1)',
              borderWidth: 3,
              borderRadius: 8,
              borderSkipped: false,
          }
      ]
  };

  const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
          mode: 'index',
          intersect: false,
      },
      scales: {
          x: {
              title: {
                  display: true,
                  text: 'Quarter',
                  color: 'white',
                  font: {
                      weight: 'bold',
                      size: 14
                  }
              },
              ticks: {
                  color: 'white',
                  font: {
                      weight: '500',
                      size: 12
                  },
                  maxRotation: 45,
                  minRotation: 45,
              },
              grid: {
                  display: false,
              },
              backgroundColor: 'transparent',
          },
          y: {
              beginAtZero: true,
              title: {
                  display: true,
                  text: 'Number of Trades',
                  color: 'white',
                  font: {
                      weight: 'bold',
                      size: 14
                  }
              },
              ticks: {
                  color: 'white',
                  font: {
                      weight: '500',
                      size: 12
                  },
                  stepSize: 1,
              },
              grid: {
                  display: true,
                  color: 'rgba(255, 255, 255, 0.1)',
                  lineWidth: 1,
              },
          },
      },
      plugins: {
          tooltip: {
              enabled: true,
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              titleColor: 'white',
              bodyColor: 'white',
              borderColor: 'rgba(255, 255, 255, 0.3)',
              borderWidth: 2,
              cornerRadius: 12,
              displayColors: true,
              padding: 12,
              titleFont: {
                  size: 14,
                  weight: 'bold'
              },
              bodyFont: {
                  size: 13,
                  weight: '500'
              },
              callbacks: {
                  title: function(context) {
                      return context[0].label;
                  },
                  label: function(context) {
                      const datasetLabel = context.dataset.label;
                      const value = context.parsed.y || 0;
                      return `${datasetLabel}: ${value} trade${value !== 1 ? 's' : ''}`;
                  },
                  afterBody: function(context) {
                      const quarterIndex = context[0].dataIndex;
                      const quarterData = quarterlyTrades[quarterIndex];
                      
                      if (!quarterData) return [];
                      
                      const total = quarterData.buys + quarterData.sells;
                      const buyPercentage = total > 0 ? Math.round((quarterData.buys / total) * 100) : 0;
                      const sellPercentage = total > 0 ? Math.round((quarterData.sells / total) * 100) : 0;
                      
                      return [
                          '',
                          `Total Trades: ${total}`,
                          `Distribution: ${buyPercentage}% Buys, ${sellPercentage}% Sells`
                      ];
                  }
              }
          },
          legend: {
              display: true,
              position: 'top',
              labels: {
                  color: 'white',
                  usePointStyle: true,
                  pointStyle: 'rect',
                  padding: 25,
                  font: {
                      weight: 'bold',
                      size: 14
                  }
              }
          },
          title: {
              display: true,
              text: 'Congressional Stock Trading Activity by Quarter',
              font: {
                  size: 20,
                  weight: 'bold',
              },
              color: 'white',
              padding: 25,
          },
      },
      animation: {
          duration: 1200,
          easing: 'easeInOutCubic',
      },
      layout: {
          padding: {
              top: 10,
              bottom: 10,
              left: 10,
              right: 10
          }
      }
  };

  return (
      <div className="congressional-trades-chart" style={{ height: '500px', padding: '20px' }}>
          <Bar data={data} options={chartOptions} />
      </div>
  );
}