import React from 'react';
import { Building2 } from 'lucide-react'; // Default/Placeholder icon
import { Subsidiary } from '../../data/types';

interface SidebarProps {
  subsidiaries: Subsidiary[];
  selectedSubsidiaryId: string;
  onSelectSubsidiary: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ subsidiaries, selectedSubsidiaryId, onSelectSubsidiary }) => {
  return (
    <div className="w-64 bg-white dark:bg-gray-800 shadow-lg p-4 flex flex-col space-y-2 h-screen sticky top-0">
        {/* Optional Logo Area */}
      <div className="mb-6 text-center">
        <h1 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">Logistics HQ</h1>
        <p className="text-xs text-gray-500 dark:text-gray-400">Executive Dashboard</p>
      </div>

      <h2 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-2 mb-1">Subsidiaries</h2>
      {subsidiaries.map((sub) => {
        const Icon = sub.icon || Building2; // Use provided icon or default
        const isSelected = sub.id === selectedSubsidiaryId;
        return (
          <button
            key={sub.id}
            onClick={() => onSelectSubsidiary(sub.id)}
            className={`w-full flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-150 ${
              isSelected
                ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Icon size={18} className={`mr-3 flex-shrink-0 ${isSelected ? 'text-indigo-500 dark:text-indigo-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400'}`} />
            <span className="truncate text-left flex-grow">{sub.name}</span>
          </button>
        );
      })}

       {/* Add other navigation links here if needed */}
    </div>
  );
};

export default Sidebar;