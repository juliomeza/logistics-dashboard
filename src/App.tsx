import React, { useState, useMemo } from 'react';
import { Home, DollarSign, Settings, Building, Users, Truck } from 'lucide-react'; // Icons for view tabs
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

  return (
      <DashboardLayout
        subsidiaries={staticSubsidiaries}
        selectedSubsidiaryId={selectedSubsidiaryId}
        onSelectSubsidiary={setSelectedSubsidiaryId}
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
        currentViewTitle={currentViewConfig.label}
      >
        {/* View Navigation Tabs */}
        <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
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