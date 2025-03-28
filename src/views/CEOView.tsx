import React from 'react';
import { KpiData, TimeSeriesData, SubsidiaryPerformanceData, AlertData, GaugeData } from '../data/types';
import KpiCard from '../components/common/KpiCard';
import SimpleLineChart from '../components/charts/SimpleLineChart'; // Assuming you created this
import DataTable from '../components/tables/DataTable';
import Card from '../components/common/Card';
// Import other chart types as needed (e.g., SimpleGaugeChart)
import { DollarSign, Activity, Users, Smile, BarChart, AlertTriangle, Info, XCircle } from 'lucide-react';

interface CEOViewProps {
  kpis: KpiData[];
  revenueTrend: TimeSeriesData[];
  roicGauge: GaugeData[]; // Assuming gauge data format
  subsidiaryComparison: SubsidiaryPerformanceData[];
  alerts: AlertData[];
}

const CEOView: React.FC<CEOViewProps> = ({ kpis, revenueTrend, roicGauge, subsidiaryComparison, alerts }) => {
    const icons = [<DollarSign size={20} />, <Activity size={20} />, <BarChart size={20} />, <Smile size={20}/>]; // Example icons

    const getAlertIcon = (severity: 'info' | 'warning' | 'error') => {
        switch (severity) {
            case 'info': return <Info size={18} className="text-blue-500" />;
            case 'warning': return <AlertTriangle size={18} className="text-yellow-500" />;
            case 'error': return <XCircle size={18} className="text-red-500" />;
        }
    };

    const getAlertBgColor = (severity: 'info' | 'warning' | 'error') => {
        switch (severity) {
            case 'info': return 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700';
            case 'warning': return 'bg-yellow-50 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-700';
            case 'error': return 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-700';
        }
     };


  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => (
          <KpiCard key={kpi.title} kpi={kpi} icon={icons[index % icons.length]}/>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <SimpleLineChart
            data={revenueTrend}
            lines={[
                { dataKey: 'Revenue', color: '#8884d8' },
                { dataKey: 'Margin', color: '#82ca9d' }
            ]}
            title="Revenue & Margin Trend"
          />
        </Card>
        <Card>
           <h4 className="text-md font-semibold mb-2 text-gray-700 dark:text-gray-300">ROIC</h4>
            {/* Placeholder for Gauge Chart - Replace with your actual Gauge component */}
           <div className="flex items-center justify-center h-full min-h-[200px]">
             <div className="text-center">
                <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">{roicGauge[0]?.value}%</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{roicGauge[0]?.name}</div>
                {/* You'd integrate <SimpleGaugeChart data={roicGauge} ... /> here */}
             </div>
           </div>
        </Card>
      </div>

      {/* Subsidiary Table and Alerts */}
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
                <DataTable
                    title="Subsidiary Performance Snapshot"
                    data={subsidiaryComparison}
                    keyExtractor={(item) => item.subsidiaryId}
                    columns={[
                        { key: 'subsidiaryName', header: 'Subsidiary' },
                        { key: 'revenueGrowth', header: 'Rev Growth (%)', render: (item) => `${item.revenueGrowth.toFixed(1)}%` },
                        { key: 'profitMargin', header: 'Margin (%)', render: (item) => `${item.profitMargin.toFixed(1)}%` },
                        { key: 'marketShare', header: 'Market Share (%)', render: (item) => `${item.marketShare.toFixed(1)}%` },
                        { key: 'customerSatisfaction', header: 'Satisfaction (%)', render: (item) => `${item.customerSatisfaction}%` },
                    ]}
                />
          </Card>
          <Card>
             <h4 className="text-md font-semibold mb-3 text-gray-700 dark:text-gray-300">Alerts & Notifications</h4>
             <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {alerts.length > 0 ? alerts.map(alert => (
                     <div key={alert.id} className={`flex items-start p-3 rounded-md border ${getAlertBgColor(alert.severity)}`}>
                        <div className="flex-shrink-0 mr-2 pt-0.5">{getAlertIcon(alert.severity)}</div>
                        <div>
                            <p className="text-sm text-gray-800 dark:text-gray-100">{alert.message}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{alert.timestamp.toLocaleTimeString()} - {alert.timestamp.toLocaleDateString()}</p>
                         </div>
                     </div>
                 )) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">No current alerts.</p>
                 )}
             </div>
          </Card>
        </div>
    </div>
  );
};

export default CEOView;