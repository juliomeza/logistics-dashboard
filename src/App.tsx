import React, { useState, useMemo } from 'react';
import { Home, DollarSign, Settings, Building, Users, Truck, ChevronDown, ChevronUp, Calendar } from 'lucide-react'; // Icons for view tabs
import DashboardLayout from './components/layout/DashboardLayout';
import ViewContainer from './components/layout/ViewContainer';
import { subsidiaries as staticSubsidiaries } from './data/mockData';
import { getDashboardData } from './data/mockData';
import CEOView from './views/CEOView';
import CFOView from './views/CFOView';
import COOView from './views/COOView';
import SubsidiariesView from './views/SubsidiariesView';
import ClientsView from './views/ClientsView';
import LogisticsView from './views/LogisticsView';

type Period = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annual';
type View = 'ceo' | 'cfo' | 'coo' | 'subsidiaries' | 'clients' | 'logistics';

interface ViewConfig {
    id: View;
    label: string;
    icon: React.ElementType;
}

const views: ViewConfig[] = [
    { id: 'ceo', label: 'CEO Overview', icon: Home },
    { id: 'cfo', label: 'Financials', icon: DollarSign },
    { id: 'coo', label: 'Operations', icon: Settings },
    { id: 'subsidiaries', label: 'Subsidiaries', icon: Building },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'logistics', label: 'Logistics', icon: Truck },
];

function App() {
  const [selectedSubsidiaryId, setSelectedSubsidiaryId] = useState<string>(staticSubsidiaries[0].id);
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('monthly');
  const [currentView, setCurrentView] = useState<View>('ceo');
  const [isViewDropdownOpen, setIsViewDropdownOpen] = useState(false);
  const [isPeriodDropdownOpen, setIsPeriodDropdownOpen] = useState(false);
  
  const toggleViewDropdown = () => {
    setIsViewDropdownOpen(!isViewDropdownOpen);
  };
  
  const togglePeriodDropdown = () => {
    setIsPeriodDropdownOpen(!isPeriodDropdownOpen);
  };
  
  // Time period options
  const periods = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'annual', label: 'Annual' },
  ];

  // Memoize data fetching/generation to avoid re-calculating on every render
  const dashboardData = useMemo(() => {
    console.log(`Fetching data for: ${selectedSubsidiaryId}, Period: ${selectedPeriod}`);
    // In a real app, this would be an async fetch
    return getDashboardData(selectedSubsidiaryId, selectedPeriod);
  }, [selectedSubsidiaryId, selectedPeriod]);

  const renderView = () => {
    let viewContent;
    
    switch (currentView) {
      case 'ceo':
        viewContent = <CEOView
                    kpis={dashboardData.kpis}
                    revenueTrend={dashboardData.revenueTrend}
                    marginTrendCEO={dashboardData.marginTrendCEO}
                    roicGauge={dashboardData.roicGauge}
                    subsidiaryComparison={dashboardData.subsidiaryComparison}
                    alerts={dashboardData.alerts}
                 />;
        break;
      case 'cfo':
        viewContent = <CFOView
                    financialKpis={dashboardData.financialKpis}
                    revenueExpenseData={dashboardData.revenueExpenseData}
                    marginTrend={dashboardData.marginTrend}
                    workingCapitalMetrics={dashboardData.workingCapitalMetrics}
                    profitabilityBySubsidiary={dashboardData.profitabilityBySubsidiary}
                />;
        break;
      case 'coo':
        viewContent = <COOView
                    operationalKpis={dashboardData.operationalKpis}
                    cycleTimeGauges={dashboardData.cycleTimeGauges}
                    operationalTrend={dashboardData.operationalTrend}
                    costPerUnitData={dashboardData.costPerUnitData}
                    operationalComparison={dashboardData.operationalComparison}
                />;
        break;
      case 'subsidiaries':
        viewContent = <SubsidiariesView
                        subsidiaryMatrix={dashboardData.subsidiaryMatrix}
                        subsidiaryKpis={dashboardData.subsidiaryKpis}
                        financialComparisonCharts={dashboardData.financialComparisonCharts}
                        operationalComparisonRadar={dashboardData.operationalComparisonRadar}
                   />;
        break;
      case 'clients':
        viewContent = <ClientsView
                        clientKpis={dashboardData.clientKpis}
                        satisfactionBySubsidiary={dashboardData.satisfactionBySubsidiary}
                        topClients={dashboardData.topClients}
                        recentFeedback={dashboardData.recentFeedback}
                    />;
        break;
      case 'logistics':
        viewContent = <LogisticsView
                        logisticsKpis={dashboardData.logisticsKpis}
                        warehouseUtilizationData={dashboardData.warehouseUtilizationData}
                        logisticsCostTrend={dashboardData.logisticsCostTrend}
                        carrierPerformance={dashboardData.carrierPerformance}
                    />;
        break;
      default:
        viewContent = <div>Select a view</div>;
    }

    // Envolver el contenido de la vista en un contenedor estándar
    return (
      <ViewContainer>
        {viewContent}
      </ViewContainer>
    );
  };

  const currentViewConfig = views.find(v => v.id === currentView) || views[0];
  
  // Mobile view selector dropdown and period selector
  const MobileSelectors = () => {
    const selectedSubsidiary = staticSubsidiaries.find(s => s.id === selectedSubsidiaryId);
    
    return (
    <>
      {/* View Menu */}
      <div className="md:hidden fixed top-4 right-4 z-40 w-48">
        <button
          onClick={toggleViewDropdown}
          className="w-full flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-800 rounded-md shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center overflow-hidden">
            {currentViewConfig && (
              <>
                <currentViewConfig.icon size={18} className="mr-2 flex-shrink-0 text-indigo-500 dark:text-indigo-400" />
                <span className="font-medium text-gray-800 dark:text-gray-200 truncate">
                  {currentViewConfig.label}
                </span>
              </>
            )}
          </div>
          {isViewDropdownOpen ? <ChevronUp size={18} className="flex-shrink-0 ml-1" /> : <ChevronDown size={18} className="flex-shrink-0 ml-1" />}
        </button>

        {isViewDropdownOpen && (
          <div className="mt-2 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 overflow-hidden z-50 absolute right-0 w-full">
            <div className="py-1 max-h-60 overflow-y-auto">
              {views.map((view) => {
                const Icon = view.icon;
                const isSelected = view.id === currentView;
                return (
                  <button
                    key={view.id}
                    onClick={() => {
                      setCurrentView(view.id);
                      setIsViewDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm flex items-center ${
                      isSelected
                        ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon size={16} className="mr-2" />
                    {view.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
      
      {/* Custom Period Selector - positioned below the view menu */}
      <div className="md:hidden fixed top-16 right-4 z-30 w-48">
        <button
          onClick={togglePeriodDropdown}
          className="w-full flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-800 rounded-md shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center overflow-hidden">
            <Calendar size={18} className="mr-2 flex-shrink-0 text-indigo-500 dark:text-indigo-400" />
            <span className="font-medium text-gray-800 dark:text-gray-200 truncate">
              {periods.find(p => p.value === selectedPeriod)?.label}
            </span>
          </div>
          {isPeriodDropdownOpen ? <ChevronUp size={18} className="flex-shrink-0 ml-1" /> : <ChevronDown size={18} className="flex-shrink-0 ml-1" />}
        </button>

        {isPeriodDropdownOpen && (
          <div className="mt-2 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 overflow-hidden z-30 absolute right-0 w-full">
            <div className="py-1 max-h-60 overflow-y-auto">
              {periods.map((period) => {
                const isSelected = period.value === selectedPeriod;
                return (
                  <button
                    key={period.value}
                    onClick={() => {
                      setSelectedPeriod(period.value as Period);
                      setIsPeriodDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm flex items-center ${
                      isSelected
                        ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Calendar size={16} className="mr-2" />
                    {period.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
      
      {/* Selection Info - shows below the company selector */}
      <div className="md:hidden fixed top-16 left-4 z-20 w-48 bg-white dark:bg-gray-800 px-3 py-2 rounded-md shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col">
          <div className="flex items-center">
            <Building size={12} className="text-gray-500 dark:text-gray-400 mr-1.5" />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">
              {selectedSubsidiary?.name}
            </span>
          </div>
          
          <div className="flex items-center mt-1.5">
            <currentViewConfig.icon size={12} className="text-gray-500 dark:text-gray-400 mr-1.5" />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">
              {currentViewConfig?.label}
            </span>
          </div>
          
          <div className="flex items-center mt-1.5">
            <Calendar size={12} className="text-gray-500 dark:text-gray-400 mr-1.5" />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">
              {periods.find(p => p.value === selectedPeriod)?.label}
            </span>
          </div>
        </div>
      </div>
    </>
    );
  };

  return (
      <DashboardLayout
        subsidiaries={staticSubsidiaries}
        selectedSubsidiaryId={selectedSubsidiaryId}
        onSelectSubsidiary={setSelectedSubsidiaryId}
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
        currentViewTitle={currentViewConfig.label}
      >
        {/* Mobile Selectors (View + Period) */}
        <MobileSelectors />
        
        {/* Desktop View Navigation Tabs */}
        <div className="mb-6 border-b border-gray-200 dark:border-gray-700 w-full max-w-[1200px] mx-auto hidden md:block">
            <nav className="-mb-px flex space-x-4 overflow-x-auto" aria-label="Tabs">
            {views.map((view) => {
                 const Icon = view.icon;
                 const isCurrent = currentView === view.id;
                 return (
                    <button
                        key={view.id}
                        onClick={() => setCurrentView(view.id)}
                        className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm flex items-center focus:outline-none transition-colors ${
                        isCurrent
                            ? 'border-indigo-500 text-indigo-600 dark:border-indigo-400 dark:text-indigo-300'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-600'
                        }`}
                        aria-current={isCurrent ? 'page' : undefined}
                    >
                        <Icon size={16} className="mr-2"/>
                        {view.label}
                    </button>
                 );
             })}
            </nav>
        </div>

        {/* Render the selected view */}
        {renderView()}
      </DashboardLayout>
  );
}

export default App;