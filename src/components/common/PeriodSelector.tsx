import React from 'react';

type Period = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annual';

interface PeriodSelectorProps {
  selectedPeriod: Period;
  onPeriodChange: (period: Period) => void;
}

const periods: { value: Period; label: string }[] = [
//   { value: 'daily', label: 'Daily' }, // Often too granular for exec dashboards
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'annual', label: 'Annual' },
];

const PeriodSelector: React.FC<PeriodSelectorProps> = ({ selectedPeriod, onPeriodChange }) => {
  return (
    <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 p-1 rounded-md shadow-sm">
       <label htmlFor="period-select" className="text-sm font-medium text-gray-700 dark:text-gray-300 px-2 whitespace-nowrap">Time Period:</label>
      <select
        id="period-select"
        value={selectedPeriod}
        onChange={(e) => onPeriodChange(e.target.value as Period)}
        className="block w-full pl-3 pr-8 py-1 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-offset-gray-800"
      >
        {periods.map((p) => (
          <option key={p.value} value={p.value}>
            {p.label}
          </option>
        ))}
      </select>
       {/* Alternative Button Style */}
      {/* {periods.map((p) => (
        <button
          key={p.value}
          onClick={() => onPeriodChange(p.value)}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            selectedPeriod === p.value
              ? 'bg-indigo-600 text-white'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          {p.label}
        </button>
      ))} */}
    </div>
  );
};

export default PeriodSelector;