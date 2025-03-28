import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TimeSeriesData } from '../../data/types';

interface SimpleBarChartProps {
  data: TimeSeriesData[];
  bars: { dataKey: string; color: string }[]; // Define which keys to plot and their colors
  xAxisKey?: string; // Default to 'period'
  title?: string;
  isPercentage?: boolean; // Flag to indicate percentage formatting
  stacked?: boolean; // Flag for stacked bar charts
}

const SimpleBarChart: React.FC<SimpleBarChartProps> = ({ 
  data, 
  bars, 
  xAxisKey = 'period', 
  title,
  isPercentage = false,
  stacked = false
}) => {
  const formatYAxis = (tickItem: number) => {
    if (isPercentage) {
      return `${tickItem}%`;
    }
    
    if (tickItem >= 1000000) {
      return `$${(tickItem / 1000000).toFixed(1)}M`;
    }
    if (tickItem >= 1000) {
      return `$${(tickItem / 1000).toFixed(0)}k`;
    }
    return `${tickItem}`;
  };

  return (
    <div className="h-64 md:h-80 w-full">
      {title && <h4 className="text-md font-semibold mb-2 text-gray-700 dark:text-gray-300">{title}</h4>}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
          <XAxis dataKey={xAxisKey} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
          <YAxis 
            tickFormatter={formatYAxis} 
            tick={{ fontSize: 12, fill: '#9CA3AF' }} 
            domain={isPercentage ? [0, 100] : [0, 'auto']}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '4px' }}
            labelStyle={{ color: '#E5E7EB' }}
            itemStyle={{ color: '#D1D5DB' }}
            formatter={(value: number, name: string) => isPercentage ? 
              [`${value.toFixed(1)}%`, name] : 
              [`$${value.toLocaleString()}`, name]
            }
          />
          <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}/>
          {bars.map(bar => (
            <Bar
              key={bar.dataKey}
              dataKey={bar.dataKey}
              fill={bar.color}
              stackId={stacked ? "stack" : undefined}
              radius={stacked ? [0, 0, 0, 0] : [4, 4, 0, 0]} // Rounded corners for non-stacked
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SimpleBarChart;