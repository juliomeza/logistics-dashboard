import React from 'react';
import { KpiData, TimeSeriesData, ClientData } from '../data/types';
import KpiCard from '../components/common/KpiCard';
import SimpleBarChart from '../components/charts/SimpleBarChart';
import DataTable from '../components/tables/DataTable';
import Card from '../components/common/Card';
import { Smile, Users, ArrowUpCircle, Star } from 'lucide-react';

interface ClientsViewProps {
  clientKpis: KpiData[];
  satisfactionBySubsidiary: TimeSeriesData[];
  topClients: ClientData[];
  recentFeedback: ClientData[];
}

const ClientsView: React.FC<ClientsViewProps> = ({
  clientKpis,
  satisfactionBySubsidiary,
  topClients,
  recentFeedback
}) => {
  const icons = [
    <Star size={20} />, 
    <ArrowUpCircle size={20} />, 
    <Users size={20} />, 
    <Smile size={20} />
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {clientKpis.map((kpi, index) => (
          <KpiCard key={kpi.title} kpi={kpi} icon={icons[index % icons.length]} />
        ))}
      </div>

      {/* Satisfaction by Subsidiary and Top Clients */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <SimpleBarChart
            data={satisfactionBySubsidiary}
            bars={[{ dataKey: 'Satisfaction', color: '#10B981' }]}
            title="Client Satisfaction by Subsidiary"
          />
        </Card>
        <Card>
          <DataTable
            title="Top Clients by Revenue"
            data={topClients.slice(0, 5)}
            keyExtractor={(item) => item.id}
            columns={[
              { key: 'name', header: 'Client Name' },
              { 
                key: 'revenue', 
                header: 'Revenue', 
                render: (item) => `$${(item.revenue / 1000).toFixed(1)}k` 
              },
              { 
                key: 'satisfactionScore', 
                header: 'CSAT', 
                render: (item) => `${item.satisfactionScore.toFixed(1)}/5` 
              },
              { 
                key: 'nps', 
                header: 'NPS', 
                render: (item) => `${item.nps}` 
              },
            ]}
          />
        </Card>
      </div>

      {/* Recent Client Feedback */}
      <Card>
        <h4 className="text-md font-semibold mb-4 text-gray-700 dark:text-gray-300">
          Recent Client Feedback
        </h4>
        <div className="space-y-4">
          {recentFeedback.map((client) => (
            <div 
              key={client.id} 
              className="p-4 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex justify-between items-start mb-2">
                <h5 className="font-medium text-gray-800 dark:text-gray-200">
                  {client.name}
                </h5>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span 
                      key={i} 
                      className={`text-sm ${i < Math.floor(client.satisfactionScore) 
                        ? 'text-yellow-500' 
                        : 'text-gray-300 dark:text-gray-600'}`}
                    >
                      
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                "{client.lastFeedback}"
              </p>
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>NPS: {client.nps}</span>
                <span>Revenue: ${(client.revenue / 1000).toFixed(1)}k</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Full Client List */}
      <Card>
        <DataTable
          title="All Clients"
          data={topClients}
          keyExtractor={(item) => item.id}
          columns={[
            { key: 'name', header: 'Client Name' },
            { 
              key: 'revenue', 
              header: 'Revenue', 
              render: (item) => `$${(item.revenue / 1000).toFixed(1)}k` 
            },
            { 
              key: 'satisfactionScore', 
              header: 'CSAT', 
              render: (item) => `${item.satisfactionScore.toFixed(1)}/5` 
            },
            { 
              key: 'nps', 
              header: 'NPS', 
              render: (item) => `${item.nps}` 
            },
            { 
              key: 'subsidiaryId', 
              header: 'Subsidiary', 
              render: (item) => item.subsidiaryId.toUpperCase()
            },
          ]}
        />
      </Card>
    </div>
  );
};

export default ClientsView;