import React from 'react';
import { KpiData, TimeSeriesData, CarrierData } from '../data/types';
import KpiCard from '../components/common/KpiCard';
import SimpleLineChart from '../components/charts/SimpleLineChart';
import SimpleBarChart from '../components/charts/SimpleBarChart';
import DataTable from '../components/tables/DataTable';
import Card from '../components/common/Card';
import { Warehouse, TruckIcon, DollarSign, RotateCcw } from 'lucide-react';

interface LogisticsViewProps {
  logisticsKpis: KpiData[];
  warehouseUtilizationData: TimeSeriesData[];
  logisticsCostTrend: TimeSeriesData[];
  carrierPerformance: CarrierData[];
}

const LogisticsView: React.FC<LogisticsViewProps> = ({
  logisticsKpis,
  warehouseUtilizationData,
  logisticsCostTrend,
  carrierPerformance
}) => {
  const icons = [
    <Warehouse size={20} />, 
    <RotateCcw size={20} />, 
    <DollarSign size={20} />, 
    <TruckIcon size={20} />
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {logisticsKpis.map((kpi, index) => (
          <KpiCard key={kpi.title} kpi={kpi} icon={icons[index % icons.length]} />
        ))}
      </div>

      {/* Warehouse Utilization and Logistics Cost Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <SimpleLineChart
            data={warehouseUtilizationData}
            lines={[{ dataKey: 'Utilization', color: '#6366F1' }]}
            title="Warehouse Utilization Trend"
          />
        </Card>
        <Card>
          <SimpleBarChart
            data={logisticsCostTrend}
            bars={[
              { dataKey: 'Transport Cost', color: '#F87171' },
              { dataKey: 'Warehouse Cost', color: '#60A5FA' }
            ]}
            title="Logistics Cost Breakdown"
          />
        </Card>
      </div>

      {/* Carrier Performance Metrics */}
      <Card>
        <DataTable
          title="Carrier Performance"
          data={carrierPerformance}
          keyExtractor={(item) => item.id}
          columns={[
            { key: 'name', header: 'Carrier Name' },
            { 
              key: 'onTimePerformance', 
              header: 'On-Time (%)', 
              render: (item) => `${item.onTimePerformance.toFixed(1)}%`,
              className: 'text-green-600 dark:text-green-400 font-medium'
            },
            { 
              key: 'costPerShipment', 
              header: 'Cost/Shipment', 
              render: (item) => `$${item.costPerShipment.toFixed(2)}` 
            },
            { 
              key: 'damageRate', 
              header: 'Damage Rate (%)', 
              render: (item) => `${item.damageRate.toFixed(1)}%`,
              className: 'text-red-600 dark:text-red-400'
            },
          ]}
        />
      </Card>

      {/* Additional Logistics Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <h4 className="text-md font-semibold mb-4 text-gray-700 dark:text-gray-300">
            Logistics Performance Insights
          </h4>
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700">
              <h5 className="text-sm font-medium text-green-700 dark:text-green-300 mb-1">Top Performing Area</h5>
              <p className="text-xs text-green-600 dark:text-green-400">
                Warehouse inventory accuracy is above target at 98.7%, reducing stock discrepancies.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700">
              <h5 className="text-sm font-medium text-yellow-700 dark:text-yellow-300 mb-1">Area for Improvement</h5>
              <p className="text-xs text-yellow-600 dark:text-yellow-400">
                Return processing rate is below target. Consider allocating additional resources.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700">
              <h5 className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">Cost Saving Opportunity</h5>
              <p className="text-xs text-blue-600 dark:text-blue-400">
                Consolidating shipments could reduce transport costs by an estimated 12%.
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="lg:col-span-2">
          <h4 className="text-md font-semibold mb-4 text-gray-700 dark:text-gray-300">
            Warehouse Distribution
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                North America
              </h5>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Total Facilities:</span>
                  <span className="text-xs font-medium">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Avg. Utilization:</span>
                  <span className="text-xs font-medium">87%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Avg. Order Cycle:</span>
                  <span className="text-xs font-medium">1.8 days</span>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Europe
              </h5>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Total Facilities:</span>
                  <span className="text-xs font-medium">6</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Avg. Utilization:</span>
                  <span className="text-xs font-medium">81%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Avg. Order Cycle:</span>
                  <span className="text-xs font-medium">2.1 days</span>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Asia Pacific
              </h5>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Total Facilities:</span>
                  <span className="text-xs font-medium">5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Avg. Utilization:</span>
                  <span className="text-xs font-medium">92%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Avg. Order Cycle:</span>
                  <span className="text-xs font-medium">2.3 days</span>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Latin America
              </h5>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Total Facilities:</span>
                  <span className="text-xs font-medium">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Avg. Utilization:</span>
                  <span className="text-xs font-medium">78%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Avg. Order Cycle:</span>
                  <span className="text-xs font-medium">2.7 days</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LogisticsView;