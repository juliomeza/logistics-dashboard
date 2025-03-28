import {
    HeartPulse,
    Globe,
    Cpu,
    UtensilsCrossed,
    ShoppingBasket,
  } from 'lucide-react';
  import { Subsidiary, SubsidiaryPerformanceData, TimeSeriesData, KpiData, ClientData, AlertData, CarrierData, GaugeData, RadarData } from './types';
  
  export const subsidiaries: Subsidiary[] = [
    { id: 'rhcl', name: 'Reliable HealthCare Logistics', icon: HeartPulse },
    { id: 'gfs', name: 'Global Freight Solutions', icon: Globe },
    { id: 'tsc', name: 'Tech Supply Chain Partners', icon: Cpu },
    { id: 'fbd', name: 'Food & Beverage Distribution', icon: UtensilsCrossed },
    { id: 'rfn', name: 'Retail Fulfillment Network', icon: ShoppingBasket },
  ];
  
  // Function to generate somewhat realistic random data
  const getRandom = (min: number, max: number, decimals: number = 0): number => {
    return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
  };
  
  const generateTimeSeries = (periods: string[], keys: string[], min: number, max: number, decimals: number = 0): TimeSeriesData[] => {
      return periods.map(period => {
          const data: TimeSeriesData = { period };
          keys.forEach(key => {
              data[key] = getRandom(min, max, decimals);
          });
          return data;
      });
  };
  
  // Generate data for a specific subsidiary and period (example)
  export const getDashboardData = (subsidiaryId: string, period: string): {
    kpis: KpiData[],
    revenueTrend: TimeSeriesData[],
    roicGauge: GaugeData[],
    subsidiaryComparison: SubsidiaryPerformanceData[],
    alerts: AlertData[],
    financialKpis: KpiData[],
    revenueExpenseData: TimeSeriesData[],
    marginTrend: TimeSeriesData[],
    workingCapitalMetrics: KpiData[],
    profitabilityBySubsidiary: SubsidiaryPerformanceData[],
    operationalKpis: KpiData[],
    cycleTimeGauges: GaugeData[],
    operationalTrend: TimeSeriesData[],
    costPerUnitData: TimeSeriesData[],
    operationalComparison: SubsidiaryPerformanceData[],
    subsidiaryMatrix: SubsidiaryPerformanceData[],
    financialComparisonCharts: { [key: string]: TimeSeriesData[] }, // e.g., { revenue: [...], profit: [...] }
    operationalComparisonRadar: RadarData[],
    clientKpis: KpiData[],
    satisfactionBySubsidiary: TimeSeriesData[],
    topClients: ClientData[],
    recentFeedback: ClientData[],
    logisticsKpis: KpiData[],
    warehouseUtilizationData: TimeSeriesData[],
    logisticsCostTrend: TimeSeriesData[],
    carrierPerformance: CarrierData[],
  
  } => {
    // In a real app, you'd fetch data based on subsidiaryId and period
    // Here, we generate random data, potentially varying slightly based on ID/period for demo
    const seed = subsidiaryId.charCodeAt(0) + period.length; // Simple seed
    const periods = period === 'annual' ? ['2021', '2022', '2023']
                  : period === 'quarterly' ? ['Q1', 'Q2', 'Q3', 'Q4']
                  : period === 'monthly' ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                  : ['W1', 'W2', 'W3', 'W4']; // Weekly/Daily approximation
  
  
    // Generate All Mock Data (Adjust ranges and logic as needed)
    const allSubsidiaryData = subsidiaries.map(sub => ({
        subsidiaryId: sub.id,
        subsidiaryName: sub.name,
        revenueGrowth: getRandom(seed % 5 - 2, seed % 10 + 5, 1),
        profitMargin: getRandom(seed % 3 + 2, seed % 8 + 8, 1),
        marketShare: getRandom(10, 30, 1),
        customerSatisfaction: getRandom(75, 95, 0),
        grossProfit: getRandom(500000, 2000000),
        ebitda: getRandom(200000, 800000),
        operatingRatio: getRandom(85, 95, 1),
        cashConversionCycle: getRandom(30, 60, 0),
        onTimeDelivery: getRandom(90, 99, 1),
        orderAccuracy: getRandom(95, 99.5, 1),
        warehouseUtilization: getRandom(70, 90, 1),
        perfectOrderRate: getRandom(85, 97, 1),
        roic: getRandom(8, 18, 1),
        inventoryTurnover: getRandom(5, 12, 1),
        arTurnover: getRandom(6, 10, 1),
        apTurnover: getRandom(4, 8, 1),
        satisfactionScore: getRandom(4, 5, 1),
        nps: getRandom(30, 70, 0),
        retentionRate: getRandom(80, 95, 0),
        newAcquisition: getRandom(50, 200),
        inventoryAccuracy: getRandom(97, 99.8, 1),
        transportCost: getRandom(50000, 150000),
        returnProcessingRate: getRandom(80, 95, 1),
        costPerUnit: getRandom(5, 15, 2),
    }));
  
    const currentSubsidiaryData = allSubsidiaryData.find(d => d.subsidiaryId === subsidiaryId) || allSubsidiaryData[0];
  
    return {
      // CEO View Data
      kpis: [
        { title: 'Revenue Growth', value: `${currentSubsidiaryData.revenueGrowth}%`, change: getRandom(-5, 5, 1) },
        { title: 'Profit Margin', value: `${currentSubsidiaryData.profitMargin}%`, change: getRandom(-2, 2, 1) },
        { title: 'Market Share', value: `${currentSubsidiaryData.marketShare}%`, change: getRandom(-1, 1, 1) },
        { title: 'Customer Satisfaction', value: `${currentSubsidiaryData.customerSatisfaction}%`, change: getRandom(-3, 3, 0) },
      ],
      revenueTrend: generateTimeSeries(periods, ['Revenue', 'Margin'], 100000, 500000, 0),
      roicGauge: [{ name: 'ROIC', value: currentSubsidiaryData.roic, color: '#8884d8' }], // Example color
      subsidiaryComparison: allSubsidiaryData, // For the table
      alerts: [
          { id: 'a1', severity: 'warning', message: `High return rate detected for ${currentSubsidiaryData.subsidiaryName}`, timestamp: new Date() },
          { id: 'a2', severity: 'info', message: 'Q3 planning meeting scheduled for next week.', timestamp: new Date(Date.now() - 86400000)},
          { id: 'a3', severity: 'error', message: 'Critical delay in Frankfurt hub affecting GFS.', timestamp: new Date(Date.now() - 3600000)},
      ],
  
      // CFO View Data
      financialKpis: [
          { title: 'Gross Profit', value: `$${(currentSubsidiaryData.grossProfit / 1000000).toFixed(2)}M`, unit: 'USD' },
          { title: 'EBITDA', value: `$${(currentSubsidiaryData.ebitda / 1000000).toFixed(2)}M`, unit: 'USD' },
          { title: 'Operating Ratio', value: `${currentSubsidiaryData.operatingRatio}%` },
          { title: 'Cash Conversion Cycle', value: `${currentSubsidiaryData.cashConversionCycle} Days` },
      ],
      revenueExpenseData: generateTimeSeries(periods, ['Revenue', 'Expenses'], 100000, 500000),
      marginTrend: generateTimeSeries(periods, ['Gross Margin', 'Net Margin'], 5, 25, 1),
      workingCapitalMetrics: [
          { title: 'Inventory Turnover', value: currentSubsidiaryData.inventoryTurnover.toFixed(1) },
          { title: 'AR Turnover', value: currentSubsidiaryData.arTurnover.toFixed(1) },
          { title: 'AP Turnover', value: currentSubsidiaryData.apTurnover.toFixed(1) },
      ],
      profitabilityBySubsidiary: allSubsidiaryData,
  
      // COO View Data
      operationalKpis: [
          { title: 'On-Time Delivery', value: `${currentSubsidiaryData.onTimeDelivery}%` },
          { title: 'Order Accuracy', value: `${currentSubsidiaryData.orderAccuracy}%` },
          { title: 'Warehouse Utilization', value: `${currentSubsidiaryData.warehouseUtilization}%` },
          { title: 'Perfect Order Rate', value: `${currentSubsidiaryData.perfectOrderRate}%` },
      ],
      cycleTimeGauges: [ // Example - needs more specific data usually
          { name: 'Order Fulfillment', value: getRandom(12, 48), color: '#82ca9d' },
          { name: 'Dock-to-Stock', value: getRandom(2, 8), color: '#ffc658'},
      ],
      operationalTrend: generateTimeSeries(periods, ['OTD', 'Accuracy'], 90, 100, 1),
      costPerUnitData: generateTimeSeries(periods, ['CostPerUnit'], 5, 15, 2),
      operationalComparison: allSubsidiaryData,
  
      // Subsidiaries View Data
      subsidiaryMatrix: allSubsidiaryData,
      financialComparisonCharts: {
          revenue: subsidiaries.map(sub => ({ period: sub.name, Revenue: allSubsidiaryData.find(d => d.subsidiaryId === sub.id)?.grossProfit || 0 })),
          profit: subsidiaries.map(sub => ({ period: sub.name, Margin: allSubsidiaryData.find(d => d.subsidiaryId === sub.id)?.profitMargin || 0 })),
      },
      operationalComparisonRadar: [ // Needs data restructuring for radar chart (metrics as subjects)
          { subject: 'OTD', value: currentSubsidiaryData.onTimeDelivery, fullMark: 100 },
          { subject: 'Accuracy', value: currentSubsidiaryData.orderAccuracy, fullMark: 100 },
          { subject: 'Utilization', value: currentSubsidiaryData.warehouseUtilization, fullMark: 100 },
          { subject: 'Perfect Order', value: currentSubsidiaryData.perfectOrderRate, fullMark: 100 },
          { subject: 'Inv. Accuracy', value: currentSubsidiaryData.inventoryAccuracy, fullMark: 100 },
      ],
  
  
      // Clients View Data
      clientKpis: [
          { title: 'Avg. Satisfaction', value: currentSubsidiaryData.satisfactionScore.toFixed(1) + '/5' },
          { title: 'Net Promoter Score', value: `${currentSubsidiaryData.nps}` },
          { title: 'Retention Rate', value: `${currentSubsidiaryData.retentionRate}%` },
          { title: 'New Clients (YTD)', value: currentSubsidiaryData.newAcquisition },
      ],
      satisfactionBySubsidiary: subsidiaries.map(sub => ({
          period: sub.name, // Use subsidiary name as category
          Satisfaction: allSubsidiaryData.find(d => d.subsidiaryId === sub.id)?.satisfactionScore || 0
      })),
      topClients: Array.from({ length: 10 }, (_, i) => ({
          id: `C${100 + i}`,
          name: `Client ${String.fromCharCode(65 + i)} Corp`,
          revenue: getRandom(50000, 500000),
          satisfactionScore: getRandom(3.5, 5, 1),
          nps: getRandom(20, 80),
          subsidiaryId: subsidiaries[i % subsidiaries.length].id, // Assign clients to subsidiaries
          lastFeedback: i % 3 === 0 ? 'Excellent service, very responsive.' : (i % 3 === 1 ? 'Some delays last quarter, but improving.' : 'Generally satisfied.'),
      })).sort((a,b) => b.revenue - a.revenue),
       recentFeedback: Array.from({ length: 5 }, (_, i) => ({
          id: `C${200 + i}`,
          name: `Client ${String.fromCharCode(75 + i)} Inc.`,
          revenue: getRandom(10000, 100000),
          satisfactionScore: getRandom(3.0, 4.8, 1),
          nps: getRandom(10, 60),
          subsidiaryId: subsidiaries[i % subsidiaries.length].id,
          lastFeedback: ['Fast delivery, impressed.', 'Driver was unprofessional.', 'Packaging needs improvement.', 'Support team resolved issue quickly.', 'Consistent and reliable.'][i],
      })),
  
      // Logistics View Data
      logisticsKpis: [
          { title: 'Warehouse Utilization', value: `${currentSubsidiaryData.warehouseUtilization}%` },
          { title: 'Inventory Accuracy', value: `${currentSubsidiaryData.inventoryAccuracy}%` },
          { title: 'Transport Cost (Avg)', value: `$${(currentSubsidiaryData.transportCost / 1000).toFixed(1)}k`, unit:'Monthly Avg' },
          { title: 'Return Processing Rate', value: `${currentSubsidiaryData.returnProcessingRate}%` },
      ],
      warehouseUtilizationData: generateTimeSeries(periods, ['Utilization'], 65, 95, 1), // More specific data needed in reality
      logisticsCostTrend: generateTimeSeries(periods, ['Transport Cost', 'Warehouse Cost'], 40000, 160000),
      carrierPerformance: Array.from({ length: 5 }, (_, i) => ({
          id: `T${i + 1}`,
          name: `Carrier ${i + 1} Express`,
          onTimePerformance: getRandom(88, 98, 1),
          costPerShipment: getRandom(8, 25, 2),
          damageRate: getRandom(0.1, 2.5, 1),
      })).sort((a,b) => b.onTimePerformance - a.onTimePerformance), // Sort by performance
    };
  };