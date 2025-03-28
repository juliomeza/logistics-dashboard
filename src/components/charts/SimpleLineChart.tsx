import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TimeSeriesData } from '../../data/types';

interface SimpleLineChartProps {
  data: TimeSeriesData[];
  lines: { dataKey: string; color: string }[]; // Define which keys to plot and their colors
  xAxisKey?: string; // Default to 'period'
  title?: string;
}

const SimpleLineChart: React.FC<SimpleLineChartProps> = ({ data, lines, xAxisKey = 'period', title }) => {
  // Determine if Y-axis should be formatted as percentage
  const containsMarginOrRate = lines.some(line =>
    line.dataKey.toLowerCase().includes('margin') ||
    line.dataKey.toLowerCase().includes('rate') ||
    line.dataKey.toLowerCase().includes('ratio') ||
    line.dataKey.toLowerCase().includes('%') ||
    line.dataKey.toLowerCase().includes('otd') ||
    line.dataKey.toLowerCase().includes('accuracy') ||
    line.dataKey.toLowerCase().includes('utilization')
 );

  const formatYAxis = (tickItem: number) => {
    if (containsMarginOrRate) {
        return `${tickItem}%`;
    }
     if (tickItem >= 1000000) {
        return `$${(tickItem / 1000000).toFixed(1)}M`;
    }
    if (tickItem >= 1000) {
        return `$${(tickItem / 1000).toFixed(0)}k`;
    }
    return `$${tickItem}`;
  };

  return (
    <div className="h-64 md:h-80 w-full">
       {title && <h4 className="text-md font-semibold mb-2 text-gray-700 dark:text-gray-300">{title}</h4>}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" /> {/* Darker grid for contrast */}
          <XAxis dataKey={xAxisKey} tick={{ fontSize: 12, fill: '#9CA3AF' }} /> {/* Gray ticks */}
           <YAxis tickFormatter={formatYAxis} tick={{ fontSize: 12, fill: '#9CA3AF' }} domain={containsMarginOrRate ? [(dataMin: number) => Math.max(0, dataMin - 5), (dataMax: number) => Math.min(100, dataMax + 5)] : undefined}/>
          <Tooltip
            contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '4px' }} // Dark tooltip
            labelStyle={{ color: '#E5E7EB' }} // Light label
            itemStyle={{ color: '#D1D5DB' }} // Light item text
             formatter={(value: number, name: string) => containsMarginOrRate ? [`${value.toFixed(1)}%`, name] : [`$${value.toLocaleString()}`, name]}
          />
          <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}/>
          {lines.map(line => (
            <Line
              key={line.dataKey}
              type="monotone"
              dataKey={line.dataKey}
              stroke={line.color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SimpleLineChart;