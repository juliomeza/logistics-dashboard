import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { GaugeData } from '../../data/types';

interface SimpleGaugeChartProps {
  data: GaugeData[];
  minValue?: number;
  maxValue?: number;
  title?: string;
}

const SimpleGaugeChart: React.FC<SimpleGaugeChartProps> = ({ 
  data, 
  minValue = 0, 
  maxValue = 100,
  title
}) => {
  // Create the background arc
  const backgroundData = [{ value: maxValue - minValue }];

  // Create the foreground arc for the actual value
  const currentValue = data[0]?.value || 0;
  const normalizedValue = Math.min(Math.max(currentValue, minValue), maxValue) - minValue;
  const remainingValue = (maxValue - minValue) - normalizedValue;
  const gaugeData = [
    { name: data[0]?.name || 'Value', value: normalizedValue },
    { name: 'Remaining', value: remainingValue }
  ];

  // Colors
  const backgroundFill = '#1F2937'; // Dark gray background
  const valueFill = data[0]?.color || '#6366F1'; // Use color from data or default indigo

  return (
    <div className="h-64 w-full flex flex-col items-center justify-center">
      {title && <h4 className="text-md font-semibold mb-2 text-gray-700 dark:text-gray-300">{title}</h4>}
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          {/* Background Arc */}
          <Pie
            data={backgroundData}
            cx="50%"
            cy="50%"
            startAngle={180}
            endAngle={0}
            innerRadius="60%"
            outerRadius="80%"
            paddingAngle={0}
            dataKey="value"
            isAnimationActive={false}
          >
            <Cell fill={backgroundFill} />
          </Pie>
          
          {/* Value Arc */}
          <Pie
            data={gaugeData}
            cx="50%"
            cy="50%"
            startAngle={180}
            endAngle={0}
            innerRadius="60%"
            outerRadius="80%"
            paddingAngle={0}
            dataKey="value"
          >
            <Cell fill={valueFill} />
            <Cell fill="transparent" />
          </Pie>
          
          <Tooltip 
            formatter={(value: number) => [`${(value / (maxValue - minValue) * 100).toFixed(1)}%`, 'Value']}
            contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '4px' }}
            labelStyle={{ color: '#E5E7EB' }}
            itemStyle={{ color: '#D1D5DB' }}
          />
        </PieChart>
      </ResponsiveContainer>
      
      <div className="text-center -mt-12">
        <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
          {currentValue.toFixed(1)}{data[0]?.name?.includes('%') ? '%' : ''}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {data[0]?.name}
        </div>
      </div>
    </div>
  );
};

export default SimpleGaugeChart;