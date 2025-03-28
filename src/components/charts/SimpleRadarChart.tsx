import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { RadarData } from '../../data/types';

interface SimpleRadarChartProps {
  data: RadarData[];
  title?: string;
  color?: string;
}

const SimpleRadarChart: React.FC<SimpleRadarChartProps> = ({ 
  data, 
  title, 
  color = '#6366F1' // Default indigo color
}) => {
  
  return (
    <div className="h-64 md:h-80 w-full">
      {title && <h4 className="text-md font-semibold mb-2 text-gray-700 dark:text-gray-300">{title}</h4>}
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#4B5563" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#9CA3AF', fontSize: 12 }}
          />
          <PolarRadiusAxis 
            angle={30} 
            domain={[0, 100]} 
            tick={{ fill: '#9CA3AF', fontSize: 10 }}
            tickFormatter={(value) => `${value}%`}
          />
          <Radar
            name="Performance"
            dataKey="value"
            stroke={color}
            fill={color}
            fillOpacity={0.6}
          />
          <Tooltip 
            formatter={(value: number) => [`${value.toFixed(1)}%`, 'Performance']}
            contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '4px' }}
            labelStyle={{ color: '#E5E7EB' }}
            itemStyle={{ color: '#D1D5DB' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SimpleRadarChart;