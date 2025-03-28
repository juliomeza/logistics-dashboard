import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { KpiData } from '../../data/types';
import Card from './Card';

interface KpiCardProps {
  kpi: KpiData;
  icon?: React.ReactNode; // Allow passing Lucide icon component
}

const KpiCard: React.FC<KpiCardProps> = ({ kpi, icon }) => {
  const hasChange = kpi.change !== undefined && kpi.change !== null;
  const isPositive = hasChange && kpi.change >= 0;

  return (
    <Card className="flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{kpi.title}</h3>
        {icon && <span className="text-gray-400 dark:text-gray-500">{icon}</span>}
      </div>
      <p className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">{kpi.value}{kpi.unit && kpi.unit !== '%' && kpi.unit !== 'Days' ? '' : kpi.unit}</p>
      {hasChange && (
        <div className={`flex items-center text-xs mt-1 ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
          {isPositive ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
          <span>{Math.abs(kpi.change)}% {kpi.description || 'vs last period'}</span>
        </div>
      )}
       {!hasChange && kpi.description && (
         <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{kpi.description}</p>
       )}
       {!hasChange && kpi.unit && (kpi.unit === '%' || kpi.unit === 'Days') && <div className="h-4 mt-1"></div>} {/* Placeholder for alignment */}
    </Card>
  );
};

export default KpiCard;