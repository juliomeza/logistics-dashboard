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
  // No more mobile menu state since we removed the hamburger menu
  const selectedSubsidiary = subsidiaries.find(s => s.id === selectedSubsidiaryId);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar - desktop only now */}
      <Sidebar
        subsidiaries={subsidiaries}
        selectedSubsidiaryId={selectedSubsidiaryId}
        onSelectSubsidiary={onSelectSubsidiary}
      />
      
      {/* Main Content - Adjusted for sidebar presence on desktop */}
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto w-full max-w-[1400px] mx-auto">
          {/* Header Section - Only visible on desktop */}
          <div className="hidden md:flex md:flex-row justify-between items-center mb-6 gap-4 mt-0">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">{currentViewTitle}</h2>
              {selectedSubsidiary && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Displaying data for: <span className="font-medium">{selectedSubsidiary.name}</span>
                </p>
              )}
            </div>
            <div>
              <PeriodSelector selectedPeriod={selectedPeriod} onPeriodChange={onPeriodChange} />
            </div>
          </div>

          {/* Main Content Area */}
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;