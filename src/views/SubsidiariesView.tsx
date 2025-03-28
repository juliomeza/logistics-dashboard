import React from 'react';
import { SubsidiaryPerformanceData, TimeSeriesData, RadarData } from '../data/types';
import SimpleBarChart from '../components/charts/SimpleBarChart';
import SimpleRadarChart from '../components/charts/SimpleRadarChart';
import DataTable from '../components/tables/DataTable';
import Card from '../components/common/Card';

interface SubsidiariesViewProps {
  subsidiaryMatrix: SubsidiaryPerformanceData[];
  financialComparisonCharts: { [key: string]: TimeSeriesData[] };
  operationalComparisonRadar: RadarData[];
}

const SubsidiariesView: React.FC<SubsidiariesViewProps> = ({
  subsidiaryMatrix,
  financialComparisonCharts,
  operationalComparisonRadar
}) => {
  // Sort subsidiaries by revenue growth for ranking
  const sortedSubsidiaries = [...subsidiaryMatrix].sort((a, b) => b.revenueGrowth - a.revenueGrowth);

  return (
    <div className="space-y-6">
      {/* Subsidiary Financial Comparison Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <SimpleBarChart
            data={financialComparisonCharts.revenue}
            bars={[{ dataKey: 'Revenue', color: '#8884d8' }]}
            title="Revenue Comparison by Subsidiary"
          />
        </Card>
        <Card>
          <SimpleBarChart
            data={financialComparisonCharts.profit}
            bars={[{ dataKey: 'Margin', color: '#82ca9d' }]}
            title="Profit Margin Comparison"
            isPercentage={true}
          />
        </Card>
      </div>

      {/* Operational Radar Chart and Subsidiary Rankings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <SimpleRadarChart
            data={operationalComparisonRadar}
            title="Operational Performance Radar"
            color="#6366F1"
          />
        </Card>
        <Card className="lg:col-span-2">
          <h4 className="text-md font-semibold mb-4 text-gray-700 dark:text-gray-300">
            Subsidiary Rankings
          </h4>
          <div className="space-y-4">
            {sortedSubsidiaries.map((sub, index) => (
              <div 
                key={sub.subsidiaryId} 
                className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center"
              >
                <div className="flex-shrink-0 mr-4 flex items-center justify-center w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-full">
                  <span className="text-indigo-600 dark:text-indigo-300 font-medium">
                    {index + 1}
                  </span>
                </div>
                <div className="flex-grow">
                  <h5 className="font-medium text-gray-800 dark:text-gray-200">
                    {sub.subsidiaryName}
                  </h5>
                  <div className="grid grid-cols-3 mt-2 gap-2">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Revenue Growth</p>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {sub.revenueGrowth.toFixed(1)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Profit Margin</p>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {sub.profitMargin.toFixed(1)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">ROIC</p>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {sub.roic.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Complete Subsidiary Comparison Table */}
      <Card>
        <DataTable
          title="Comprehensive Subsidiary Comparison"
          data={subsidiaryMatrix}
          keyExtractor={(item) => item.subsidiaryId}
          columns={[
            { key: 'subsidiaryName', header: 'Subsidiary' },
            { 
              key: 'revenueGrowth', 
              header: 'Rev Growth', 
              render: (item) => `${item.revenueGrowth.toFixed(1)}%` 
            },
            { 
              key: 'profitMargin', 
              header: 'Margin', 
              render: (item) => `${item.profitMargin.toFixed(1)}%` 
            },
            { 
              key: 'marketShare', 
              header: 'Market Share', 
              render: (item) => `${item.marketShare.toFixed(1)}%` 
            },
            { 
              key: 'onTimeDelivery', 
              header: 'OTD', 
              render: (item) => `${item.onTimeDelivery.toFixed(1)}%` 
            },
            { 
              key: 'customerSatisfaction', 
              header: 'CSAT', 
              render: (item) => `${item.customerSatisfaction}%` 
            },
          ]}
        />
      </Card>
    </div>
  );
};

export default SubsidiariesView;