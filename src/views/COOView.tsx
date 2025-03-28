import React from 'react';
import { KpiData, TimeSeriesData, SubsidiaryPerformanceData, GaugeData } from '../data/types';
import KpiCard from '../components/common/KpiCard';
import SimpleLineChart from '../components/charts/SimpleLineChart';
import SimpleGaugeChart from '../components/charts/SimpleGaugeChart';
import SimpleBarChart from '../components/charts/SimpleBarChart';
import DataTable from '../components/tables/DataTable';
import Card from '../components/common/Card';
import { Clock, CheckCircle, BarChart, Truck, Activity } from 'lucide-react';

interface COOViewProps {
  operationalKpis: KpiData[];
  cycleTimeGauges: GaugeData[];
  operationalTrend: TimeSeriesData[];
  costPerUnitData: TimeSeriesData[];
  operationalComparison: SubsidiaryPerformanceData[];
}

const COOView: React.FC<COOViewProps> = ({
  operationalKpis,
  cycleTimeGauges,
  operationalTrend,
  costPerUnitData,
  operationalComparison
}) => {
  const icons = [
    <Truck size={20} />, 
    <CheckCircle size={20} />, 
    <BarChart size={20} />, 
    <Activity size={20} />
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {operationalKpis.map((kpi, index) => (
          <KpiCard key={kpi.title} kpi={kpi} icon={icons[index % icons.length]} />
        ))}
      </div>

      {/* Cycle Time Gauges & Operational Performance Trend*/}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <SimpleGaugeChart
            data={[cycleTimeGauges[0]]}
            title={`${cycleTimeGauges[0].name} (hrs)`}
            minValue={0}
            maxValue={72} // assuming 72 hrs max for cycle time
          />
        </Card>
        <Card>
          <SimpleGaugeChart
            data={[cycleTimeGauges[1]]}
            title={`${cycleTimeGauges[1].name} (hrs)`}
            minValue={0}
            maxValue={24} // assuming 24 hrs max for dock-to-stock
          />
        </Card>
        <Card>
          <SimpleLineChart
            data={operationalTrend}
            lines={[
              { dataKey: 'OTD', color: '#10B981' },
              { dataKey: 'Accuracy', color: '#60A5FA' }
            ]}
            title="Operational Performance Trend"
          />
        </Card>
      </div>

      {/* Cost Per Unit and Subsidiary Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <SimpleBarChart
            data={costPerUnitData}
            bars={[
              { dataKey: 'CostPerUnit', color: '#F87171' }
            ]}
            title="Cost Per Unit Trend"
          />
        </Card>
        <Card className="lg:col-span-2">
          <DataTable
            title="Subsidiary Operational Metrics"
            data={operationalComparison}
            keyExtractor={(item) => item.subsidiaryId}
            columns={[
              { key: 'subsidiaryName', header: 'Subsidiary' },
              { 
                key: 'onTimeDelivery', 
                header: 'OTD (%)', 
                render: (item) => `${item.onTimeDelivery.toFixed(1)}%` 
              },
              { 
                key: 'orderAccuracy', 
                header: 'Accuracy (%)', 
                render: (item) => `${item.orderAccuracy.toFixed(1)}%` 
              },
              { 
                key: 'warehouseUtilization', 
                header: 'Utilization (%)', 
                render: (item) => `${item.warehouseUtilization.toFixed(1)}%` 
              },
              { 
                key: 'costPerUnit', 
                header: 'Cost/Unit', 
                render: (item) => `$${item.costPerUnit.toFixed(2)}` 
              },
            ]}
          />
        </Card>
      </div>

      {/* Additional Operational Metrics */}
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <h4 className="text-md font-semibold mb-4 text-gray-700 dark:text-gray-300">
            Key Operational Indicators
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {operationalComparison.slice(0, 3).map((subsidiary) => (
              <div 
                key={subsidiary.subsidiaryId} 
                className="p-4 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {subsidiary.subsidiaryName}
                </h5>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Perfect Order Rate:</span>
                    <span className="text-xs font-medium">{subsidiary.perfectOrderRate.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Inv. Accuracy:</span>
                    <span className="text-xs font-medium">{subsidiary.inventoryAccuracy.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Return Rate:</span>
                    <span className="text-xs font-medium">{subsidiary.returnProcessingRate.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default COOView;