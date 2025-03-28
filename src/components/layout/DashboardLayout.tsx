import React from 'react';
import Sidebar from './Sidebar';
import { Subsidiary } from '../../data/types';
import PeriodSelector from '../common/PeriodSelector';

type Period = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annual';

interface DashboardLayoutProps {
  children: React.ReactNode;
  subsidiaries: Subsidiary[];
  selectedSubsidiaryId: string;
  onSelectSubsidiary: (id: string) => void;
  selectedPeriod: Period;
  onPeriodChange: (period: Period) => void;
  currentViewTitle: string; // Title for the current view
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  subsidiaries,
  selectedSubsidiaryId,
  onSelectSubsidiary,
  selectedPeriod,
  onPeriodChange,
  currentViewTitle
}) => {

  const selectedSubsidiary = subsidiaries.find(s => s.id === selectedSubsidiaryId);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar
        subsidiaries={subsidiaries}
        selectedSubsidiaryId={selectedSubsidiaryId}
        onSelectSubsidiary={onSelectSubsidiary}
      />
      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
         {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
           <div>
               <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">{currentViewTitle}</h2>
               {selectedSubsidiary && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Displaying data for: <span className="font-medium">{selectedSubsidiary.name}</span>
                  </p>
               )}
            </div>
          <PeriodSelector selectedPeriod={selectedPeriod} onPeriodChange={onPeriodChange} />
        </div>

        {/* Main Content Area */}
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;