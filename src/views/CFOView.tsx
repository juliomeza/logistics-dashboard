import React from 'react';
import { KpiData, TimeSeriesData, SubsidiaryPerformanceData } from '../data/types';
import KpiCard from '../components/common/KpiCard';
import SimpleLineChart from '../components/charts/SimpleLineChart';
import SimpleBarChart from '../components/charts/SimpleBarChart';
import DataTable from '../components/tables/DataTable';
import Card from '../components/common/Card';
import { KpiCardGrid, TwoColumnGrid, ThreeColumnGrid } from '../components/layout/StandardGrids';
import { DollarSign, TrendingUp, CalendarClock, BarChart3 } from 'lucide-react';

interface CFOViewProps {
  financialKpis: KpiData[];
  revenueExpenseData: TimeSeriesData[];
  marginTrend: TimeSeriesData[];
  workingCapitalMetrics: KpiData[];
  profitabilityBySubsidiary: SubsidiaryPerformanceData[];
}

const CFOView: React.FC<CFOViewProps> = ({
  financialKpis,
  revenueExpenseData,
  marginTrend,
  workingCapitalMetrics,
  profitabilityBySubsidiary
}) => {
  const icons = [
    <DollarSign size={20} />, 
    <TrendingUp size={20} />, 
    <BarChart3 size={20} />, 
    <CalendarClock size={20} />
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <KpiCardGrid>
        {financialKpis.map((kpi, index) => (
          <KpiCard key={kpi.title} kpi={kpi} icon={icons[index % icons.length]} />
        ))}
      </KpiCardGrid>

      {/* Revenue vs Expenses and Margin Charts */}
      <TwoColumnGrid>
        <Card>
          <SimpleBarChart
            data={revenueExpenseData}
            bars={[
              { dataKey: 'Revenue', color: '#8884d8' },
              { dataKey: 'Expenses', color: '#F87171' }
            ]}
            title="Revenue vs Expenses"
          />
        </Card>
        <Card>
          <SimpleLineChart
            data={marginTrend}
            lines={[
              { dataKey: 'Gross Margin', color: '#10B981' },
              { dataKey: 'Net Margin', color: '#60A5FA' }
            ]}
            title="Margin Trends"
          />
        </Card>
      </TwoColumnGrid>

      {/* Working Capital and Subsidiary Profitability */}
      <ThreeColumnGrid>
        <Card>
          <h4 className="text-md font-semibold mb-4 text-gray-700 dark:text-gray-300">
            Working Capital Metrics
          </h4>
          <div className="space-y-4">
            {workingCapitalMetrics.map((metric) => (
              <div key={metric.title} className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {metric.title}
                </span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  {metric.value}
                </span>
              </div>
            ))}
          </div>
        </Card>
        <Card className="lg:col-span-2">
          <DataTable
            title="Subsidiary Profitability Analysis"
            data={profitabilityBySubsidiary}
            keyExtractor={(item) => item.subsidiaryId}
            columns={[
              { key: 'subsidiaryName', header: 'Subsidiary' },
              { 
                key: 'grossProfit', 
                header: 'Gross Profit', 
                render: (item) => `$${(item.grossProfit / 1000).toFixed(1)}k` 
              },
              { 
                key: 'profitMargin', 
                header: 'Margin (%)', 
                render: (item) => `${item.profitMargin.toFixed(1)}%` 
              },
              { 
                key: 'operatingRatio', 
                header: 'Op. Ratio (%)', 
                render: (item) => `${item.operatingRatio.toFixed(1)}%` 
              },
              { 
                key: 'roic', 
                header: 'ROIC (%)', 
                render: (item) => `${item.roic.toFixed(1)}%` 
              },
            ]}
          />
        </Card>
      </ThreeColumnGrid>
    </div>
  );
};

export default CFOView;